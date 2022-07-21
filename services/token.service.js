import { Token } from './../models/token.model.js';
import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;

class TokenService {

    generateToken(payload) {
        const accessToken = sign(payload, process.env.ACCESS_SECRET_KEY, { expiresIn: '15m'});
        const refreshToken = sign(payload, process.env.REFRESH_SECRET_KEY, { expiresIn: '30d'});
        return {
            refreshToken,
            accessToken,
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({user: userId});

        if(tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        return await Token.create({user: userId, refreshToken});
    }  

    async removeToken(refreshToken) {
        return await Token.deleteOne({refreshToken});
    }

    async findToken(refreshToken) {
        return await Token.findOne({refreshToken})
    }

    async validateRefreshToken(refreshToken) {
        try {
            return verify(refreshToken, process.env.REFRESH_SECRET_KEY);
        } catch (e) {
            return null;
        }
    }

    async validateAccessToken(accessToken) {
        try {
            return verify(accessToken, process.env.ACCESS_SECRET_KEY);
        } catch (e) {
            return null;
        }
    }
}

export const tokenService = new TokenService();