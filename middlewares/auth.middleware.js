import { ApiExeption } from "../exeptions/api.exeption.js";
import { tokenService } from "../services/token.service.js";

export const authMiddleware = (req, res, next) => {
    try {
        const headerAuthorization = req.headers.authorization;
        if (!headerAuthorization) {
            throw ApiExeption.UnauthorizedError();
        }
        const accessToken = headerAuthorization.split(' ')[1];

        if(!accessToken) {
            throw ApiExeption.UnauthorizedError();
        }

        if(!tokenService.validateAccessToken(accessToken)) {
            throw ApiExeption.UnauthorizedError();
        }
        next();
    } catch (e) {
        next(e);
    }
};