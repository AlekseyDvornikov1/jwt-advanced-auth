import { User } from './../models/user.modal.js';
import { v4 } from 'uuid';
import { hash, compare } from 'bcrypt';
import { mailService } from './../services/mail.service.js';
import { UserDto } from './../dtos/user.dto.js';
import { tokenService } from './../services/token.service.js';
import { ApiExeption } from './../exeptions/api.exeption.js';
import { validationResult } from 'express-validator';

class AuthController {

    async registration(req, res, next) {
        try {
            let {email, password} = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              next(ApiExeption.BadRequest('Ошибка валидации', errors.array()));
            }
            let candidate = await User.findOne({ email });
            if(candidate) {
                throw ApiExeption.BadRequest('User with email ' + candidate.email + ' already registered');
            }
            const hashPassword = await hash(password, 7);
            const activationLink =  v4();
            const user = await User.create({email, password: hashPassword, activationLink});

            await mailService.sendActivationMail(email, process.env.API_LINK + '/user/activate/' +  activationLink);

            const userDto = new UserDto(user);
            const {refreshToken, accessToken } = tokenService.generateToken({...userDto});
            await tokenService.saveToken(userDto.id, refreshToken);
            
            res.cookie('refreshToken', refreshToken, {httpOnly: true, maxAge: 30*24*60*60});

            res.json({
                refreshToken,
                accessToken,
                user: {...userDto}
            });
        } catch (e) {
            next(e);
        }
    };

    async login(req, res, next) {
        try {
            const {email, password} = req.body;

            let user = await User.findOne({email});
    
            if(!user) {
                throw ApiExeption.BadRequest('Wrong credentials');
            }
    
            if(!compare(password, user.password)) {
                throw ApiExeption.BadRequest('Wrong credentials');
            }
    
            const userDto = new UserDto(user);
            const {refreshToken, accessToken } = tokenService.generateToken({...userDto});
            await tokenService.saveToken(userDto.id, refreshToken);
            
            res.cookie('refreshToken', refreshToken, {httpOnly: true, maxAge: 30*24*60*60});
    
            res.json({
                refreshToken,
                accessToken,
                user: {...userDto}
            });
        } catch (e) {
            next(e);
        }

        
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const result = await tokenService.removeToken(refreshToken);
            res.clearCookie('refreshToken');
            res.json(result);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;

            if(!refreshToken) {
                throw new ApiExeption.UnauthorizedError();
            }

            const userData = tokenService.validateRefreshToken(refreshToken);

            if(!userData) {
                throw new ApiExeption.UnauthorizedError();
            }

            const tokenFromDb = tokenService.findToken(refreshToken);

            if(!tokenFromDb) {
                throw  ApiExeption.UnauthorizedError();
            }

            const user = await User.findOne({id: userData.id});
            const userDto = new UserDto(user);
            const {newRefreshToken, accessToken } = tokenService.generateToken({...userDto});
            await tokenService.saveToken(userDto.id, newRefreshToken);
            
            res.cookie('refreshToken', newRefreshToken, {httpOnly: true, maxAge: 30*24*60*60});
    
            res.json({
                newRefreshToken,
                accessToken,
                user: {...userDto}
            });
        } catch {
            return next(ApiExeption.UnauthorizedError());
        }
    }

}

export const authController = new AuthController();