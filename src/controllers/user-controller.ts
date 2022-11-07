const userService = require('../service/user-service');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');
import mongoose from "mongoose"

class UserController {
    async registration(req: any, res: any, next: any) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const { name, surname, email, password, isAdmin } = req.body;
            const userData = await userService.registration(name, surname, email, password, isAdmin);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req: any, res: any, next: any) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async forgotPassword(req: any, res: any, next: any) {
        try {
            const { email } = req.body;
            const userData = await userService.forgotPassword(email);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async reset(req: any, res: any, next: any) {
        try {
            const resetLink = req.params.link;
            const id = req.params.id;
            console.log(id)
            await userService.reset(resetLink);
            return res.redirect(`${process.env.CLIENT_URL}/setNewPassword/${id}`);
        } catch (e) {
            next(e);
        }
    }

    async setNewPassword(req: any, res: any, next: any) {
        try {
            const { password } = req.body;
            const id = new mongoose.Types.ObjectId(req.params.id);
            console.log(id)
            const userData = await userService.setNewPassword(password, id);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async changeInfo(req: any, res: any, next: any) {
        try {
            const { email, name, surname } = req.body
            const userData = await userService.changeInfo(email, name, surname);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async changePassword(req: any, res: any, next: any) {
        try {
            const { password } = req.body;
            const id = new mongoose.Types.ObjectId(req.params.id);
            const userData = await userService.changePassword(password, id);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req: any, res: any, next: any) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async activate(req: any, res: any, next: any) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req: any, res: any, next: any) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async getUsers(req: any, res: any, next: any) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }
}


module.exports = new UserController();