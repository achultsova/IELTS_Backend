"use strict";
var ApiErrorr = require('../exceptions/api-error');
var tokenService = require('../service/token-service');
module.exports = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiErrorr.UnauthorizedError());
        }
        var accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiErrorr.UnauthorizedError());
        }
        var userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiErrorr.UnauthorizedError());
        }
        req.user = userData;
        next();
    }
    catch (e) {
        return next(ApiErrorr.UnauthorizedError());
    }
};
