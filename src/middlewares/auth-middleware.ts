export {};
const ApiErrorr = require('../exceptions/api-error');
const tokenService = require('../service/token-service');


module.exports = function (req: any, res: any, next: any) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiErrorr.UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiErrorr.UnauthorizedError());
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiErrorr.UnauthorizedError());
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(ApiErrorr.UnauthorizedError());
    }
};