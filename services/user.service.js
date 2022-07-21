import { ApiExeption } from './../exeptions/api.exeption.js';
class UserService {

    async activaterUser(user) {
        if (!user) {
            throw ApiExeption.BadRequest('Link does not exist');
        }

        user.isActivated = true;

        await user.save();
    }
}

export const userService = new UserService();