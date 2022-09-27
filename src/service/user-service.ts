const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenServic = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiErr = require('../exceptions/api-error');

class UserService {
    async registration(email: string, password: string) {
        const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4(); // v34fa-asfasf-142saf-sa-asf

        const user = await UserModel.create({email, password: hashPassword, activationLink})
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDto = new UserDto(user); // id, email, isActivated
        const tokens = tokenServic.generateTokens({...userDto});
        await tokenServic.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async activate(activationLink: string) {
        const user = await UserModel.findOne({activationLink})
        if (!user) {
            throw ApiErr.BadRequest('Неккоректная ссылка активации')
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email: string, password: string) {
        const user = await UserModel.findOne({email})
        if (!user) {
            throw ApiErr.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiErr.BadRequest('Неверный пароль');
        }
        const userDto = new UserDto(user);
        const tokens = tokenServic.generateTokens({...userDto});

        await tokenServic.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async logout(refreshToken: string) {
        const token = await tokenServic.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw ApiErr.UnauthorizedError();
        }
        const userData = tokenServic.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenServic.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiErr.UnauthorizedError();
        }
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenServic.generateTokens({...userDto});

        await tokenServic.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async getAllUsers() {
        const users = await UserModel.find();
        return users;
    }
}

module.exports = new UserService();