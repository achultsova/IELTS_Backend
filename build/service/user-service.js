"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var UserModel = require('../models/user-model');
var bcrypt = require('bcrypt');
var uuid = require('uuid');
var mailService = require('./mail-service');
var tokenService = require('./token-service');
var UserDto = require('../dtos/user-dto');
var ApiError = require('../exceptions/api-error');
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.prototype.registration = function (name, surname, email, password, isAdmin) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var candidate, hashPassword, activationLink, user, userDto, tokens;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserModel.findOne({ email: email })];
                    case 1:
                        candidate = _a.sent();
                        if (candidate) {
                            throw ApiError.BadRequest("\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0441 \u043F\u043E\u0447\u0442\u043E\u0432\u044B\u043C \u0430\u0434\u0440\u0435\u0441\u043E\u043C ".concat(email, " \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442"));
                        }
                        return [4 /*yield*/, bcrypt.hash(password, 3)];
                    case 2:
                        hashPassword = _a.sent();
                        activationLink = uuid.v4();
                        return [4 /*yield*/, UserModel.create({ name: name, surname: surname, email: email, password: hashPassword, activationLink: activationLink, isAdmin: isAdmin })];
                    case 3:
                        user = _a.sent();
                        return [4 /*yield*/, mailService.sendActivationMail(email, "".concat(process.env.API_URL, "/api/activate/").concat(activationLink))];
                    case 4:
                        _a.sent();
                        userDto = new UserDto(user);
                        tokens = tokenService.generateTokens(tslib_1.__assign({}, userDto));
                        return [4 /*yield*/, tokenService.saveToken(userDto.id, tokens.refreshToken)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, tslib_1.__assign(tslib_1.__assign({}, tokens), { user: userDto })];
                }
            });
        });
    };
    UserService.prototype.activate = function (activationLink) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var user;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserModel.findOne({ activationLink: activationLink })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw ApiError.BadRequest('Неккоректная ссылка активации');
                        }
                        user.isActivated = true;
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.login = function (email, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var user, isPassEquals, userDto, tokens;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserModel.findOne({ email: email })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw ApiError.BadRequest('Пользователь с таким email не найден');
                        }
                        return [4 /*yield*/, bcrypt.compare(password, user.password)];
                    case 2:
                        isPassEquals = _a.sent();
                        if (!isPassEquals) {
                            throw ApiError.BadRequest('Неверный пароль');
                        }
                        userDto = new UserDto(user);
                        tokens = tokenService.generateTokens(tslib_1.__assign({}, userDto));
                        return [4 /*yield*/, tokenService.saveToken(userDto.id, tokens.refreshToken)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, tslib_1.__assign(tslib_1.__assign({}, tokens), { user: userDto })];
                }
            });
        });
    };
    UserService.prototype.forgotPassword = function (email) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var user, resetLink, id, userDto, tokens;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserModel.findOne({ email: email })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw ApiError.BadRequest('Пользователь с таким email не найден');
                        }
                        resetLink = uuid.v4();
                        user.resetLink = resetLink;
                        id = user._id;
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, mailService.sendForgotPasswordMail(email, "".concat(process.env.API_URL, "/api/reset/").concat(resetLink, "/").concat(id))];
                    case 3:
                        _a.sent();
                        userDto = new UserDto(user);
                        tokens = tokenService.generateTokens(tslib_1.__assign({}, userDto));
                        return [4 /*yield*/, tokenService.saveToken(userDto.id, tokens.refreshToken)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, tslib_1.__assign(tslib_1.__assign({}, tokens), { user: userDto })];
                }
            });
        });
    };
    UserService.prototype.reset = function (resetLink) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var user;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserModel.findOne({ resetLink: resetLink })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw ApiError.BadRequest('Неккоректная ссылка смены пароля');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.setNewPassword = function (password, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var user, isPassEquals, hashPassword, userDto, tokens;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserModel.findOne({ _id: id })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw ApiError.BadRequest('Пользователь с таким id не найден');
                        }
                        console.log(password, user.password);
                        return [4 /*yield*/, bcrypt.compare(password, user.password)];
                    case 2:
                        isPassEquals = _a.sent();
                        if (isPassEquals) {
                            throw ApiError.BadRequest('Пароль не должен быть как предыдущий');
                        }
                        return [4 /*yield*/, bcrypt.hash(password, 3)];
                    case 3:
                        hashPassword = _a.sent();
                        user.password = hashPassword;
                        return [4 /*yield*/, user.save()];
                    case 4:
                        _a.sent();
                        userDto = new UserDto(user);
                        tokens = tokenService.generateTokens(tslib_1.__assign({}, userDto));
                        return [4 /*yield*/, tokenService.saveToken(userDto.id, tokens.refreshToken)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, tslib_1.__assign(tslib_1.__assign({}, tokens), { user: userDto })];
                }
            });
        });
    };
    UserService.prototype.changeInfo = function (email, name, surname) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var user, userDto;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserModel.findOne({ email: email })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw ApiError.BadRequest('Пользователь с таким email не найден');
                        }
                        user.name = name;
                        user.surname = surname;
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        userDto = new UserDto(user);
                        return [2 /*return*/, { user: userDto }];
                }
            });
        });
    };
    UserService.prototype.logout = function (refreshToken) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var token;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tokenService.removeToken(refreshToken)];
                    case 1:
                        token = _a.sent();
                        return [2 /*return*/, token];
                }
            });
        });
    };
    UserService.prototype.refresh = function (refreshToken) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var userData, tokenFromDb, user, userDto, tokens;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!refreshToken) {
                            throw ApiError.UnauthorizedError();
                        }
                        userData = tokenService.validateRefreshToken(refreshToken);
                        return [4 /*yield*/, tokenService.findToken(refreshToken)];
                    case 1:
                        tokenFromDb = _a.sent();
                        if (!userData || !tokenFromDb) {
                            throw ApiError.UnauthorizedError();
                        }
                        return [4 /*yield*/, UserModel.findById(userData.id)];
                    case 2:
                        user = _a.sent();
                        userDto = new UserDto(user);
                        tokens = tokenService.generateTokens(tslib_1.__assign({}, userDto));
                        return [4 /*yield*/, tokenService.saveToken(userDto.id, tokens.refreshToken)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, tslib_1.__assign(tslib_1.__assign({}, tokens), { user: userDto })];
                }
            });
        });
    };
    UserService.prototype.getAllUsers = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var users;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserModel.find()];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users];
                }
            });
        });
    };
    return UserService;
}());
module.exports = new UserService();
