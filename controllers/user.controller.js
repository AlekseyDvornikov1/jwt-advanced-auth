import { User } from './../models/user.modal.js';
import { ApiExeption } from './../exeptions/api.exeption.js';
import { tokenService } from '../services/token.service.js';
import { userService } from '../services/user.service.js';

class UserController {

    async getUsers(req, res, next) {
        try {
            let users = await User.find();
            res.json(users);
        } catch (e) {
            next(e);
        }
    };

    async getUser(req, res, next) {
        try {
            let user = await User.findById(req.params.id);
            res.json(user);
        } catch (e) {
            next(e);
        }
    };

    async createUser(req, res, next) {
        try {
            let user = await User.create(req.body);
            res.json(user);
        } catch (e) {
            next(e);
        }

    };

    async updateUser(req, res, next) {
        try {
            let user = await User.updateOne(req.body);
            res.json(user);
        } catch (e) {
            next(e);
        }

    };

    async deleteUser(req, res, next) {
        try {
            let result = await User.deleteOne({ id: req.params.id});
            res.json(result);
        } catch (e) {
            next(e);
        }

    };

    async activate(req, res, next) {
        try {
            let user = await User.findOne({ activationLink: req.params.link });

            userService.activaterUser(user)
    
            res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e);
        }

    };

}

export const userController = new UserController();