"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var userService = require('../service/user-service');
var validationResult = require('express-validator').validationResult;
var ApiError = require('../exceptions/api-error');
var mongoose_1 = tslib_1.__importDefault(require("mongoose"));
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.registration = function (req, res, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var errors, _a, name, surname, email, password, isAdmin, userData, e_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        errors = validationResult(req);
                        if (!errors.isEmpty()) {
                            return [2 /*return*/, next(ApiError.BadRequest('Ошибка при валидации', errors.array()))];
                        }
                        _a = req.body, name = _a.name, surname = _a.surname, email = _a.email, password = _a.password, isAdmin = _a.isAdmin;
                        return [4 /*yield*/, userService.registration(name, surname, email, password, isAdmin)];
                    case 1:
                        userData = _b.sent();
                        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
                        return [2 /*return*/, res.json(userData)];
                    case 2:
                        e_1 = _b.sent();
                        next(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.login = function (req, res, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, email, password, userData, e_2;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, userService.login(email, password)];
                    case 1:
                        userData = _b.sent();
                        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
                        return [2 /*return*/, res.json(userData)];
                    case 2:
                        e_2 = _b.sent();
                        next(e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.forgotPassword = function (req, res, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var email, userData, e_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        email = req.body.email;
                        return [4 /*yield*/, userService.forgotPassword(email)];
                    case 1:
                        userData = _a.sent();
                        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
                        return [2 /*return*/, res.json(userData)];
                    case 2:
                        e_3 = _a.sent();
                        next(e_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.reset = function (req, res, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var resetLink, id, e_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        resetLink = req.params.link;
                        id = req.params.id;
                        console.log(id);
                        return [4 /*yield*/, userService.reset(resetLink)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, res.redirect("".concat(process.env.CLIENT_URL, "/setNewPassword/").concat(id))];
                    case 2:
                        e_4 = _a.sent();
                        next(e_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.setNewPassword = function (req, res, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var password, id, userData, e_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        password = req.body.password;
                        id = new mongoose_1.default.Types.ObjectId(req.params.id);
                        console.log(id);
                        return [4 /*yield*/, userService.setNewPassword(password, id)];
                    case 1:
                        userData = _a.sent();
                        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
                        return [2 /*return*/, res.json(userData)];
                    case 2:
                        e_5 = _a.sent();
                        next(e_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.changeInfo = function (req, res, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, email, name, surname, userData, e_6;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, email = _a.email, name = _a.name, surname = _a.surname;
                        return [4 /*yield*/, userService.changeInfo(email, name, surname)];
                    case 1:
                        userData = _b.sent();
                        return [2 /*return*/, res.json(userData)];
                    case 2:
                        e_6 = _b.sent();
                        next(e_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.logout = function (req, res, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var refreshToken, token, e_7;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        refreshToken = req.cookies.refreshToken;
                        return [4 /*yield*/, userService.logout(refreshToken)];
                    case 1:
                        token = _a.sent();
                        res.clearCookie('refreshToken');
                        return [2 /*return*/, res.json(token)];
                    case 2:
                        e_7 = _a.sent();
                        next(e_7);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.activate = function (req, res, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var activationLink, e_8;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        activationLink = req.params.link;
                        return [4 /*yield*/, userService.activate(activationLink)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, res.redirect(process.env.CLIENT_URL)];
                    case 2:
                        e_8 = _a.sent();
                        next(e_8);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.refresh = function (req, res, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var refreshToken, userData, e_9;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        refreshToken = req.cookies.refreshToken;
                        return [4 /*yield*/, userService.refresh(refreshToken)];
                    case 1:
                        userData = _a.sent();
                        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
                        return [2 /*return*/, res.json(userData)];
                    case 2:
                        e_9 = _a.sent();
                        next(e_9);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getUsers = function (req, res, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var users, e_10;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userService.getAllUsers()];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, res.json(users)];
                    case 2:
                        e_10 = _a.sent();
                        next(e_10);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
module.exports = new UserController();
