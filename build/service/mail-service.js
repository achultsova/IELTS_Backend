"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var nodemailer = require('nodemailer');
var MailService = /** @class */ (function () {
    function MailService() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });
    }
    MailService.prototype.sendActivationMail = function (to, link) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transporter.sendMail({
                            from: process.env.SMTP_USER,
                            to: to,
                            subject: 'Thanks for registering',
                            text: '',
                            html: "\n                <!DOCTYPE html>\n                <html lang=\"en\">\n                <head>\n                    <meta charset=\"UTF-8\">\n                    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n                    <link href=\"https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@300&display=swap\" rel=\"stylesheet\">\n                    <title>Registering</title>\n                </head>\n              <body>\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" bgcolor=\"#F2F5F5\">\n                    <tr>\n                        <td align=\"center\" >\n                            <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\" bgcolor=\"#393E59\" style=\"padding-left: 40px; margin-top: 60px\">\n                                <tr>\n                                    <td>\n                                        <h3 style=\"font-size: 36px; font-family: IBM Plex Serif; font-weight: 300; color: #fff\">Thanks for registering!</h3>\n                                    </td>\n                                </tr>\n                               </table>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td align=\"center\">\n                            <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\" bgcolor=\"#fff\" style=\"padding-left: 40px; padding-bottom: 46px; padding-top: 40px; margin-bottom: 60px; margin-top: 20px; font-family: Arial, Helvetica, sans-serif;\">\n                                <tr>\n                                    <td>\n                                        <p>\n                                            Thanks for creating an account.<br>\n                                            Please confirm your email and sign in with your credentials.\n                                        </p>\n                                    </td>\n                                </tr>\n                                <tr>\n                                    <td>\n                                        <a href=".concat(link, " style=\"text-decoration: none; color: #000;\">Confirm your email \u2192</a>\n                                    </td>\n                                </tr>\n                            </table>\n                        </td>\n                    </tr>\n                  </table>\n                </body>\n            </html>\n                ")
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MailService.prototype.sendForgotPasswordMail = function (to, link) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transporter.sendMail({
                            from: process.env.SMTP_USER,
                            to: to,
                            subject: 'Forgot password',
                            text: '',
                            html: "\n                <!DOCTYPE html>\n                <html lang=\"en\">\n                <head>\n                    <meta charset=\"UTF-8\">\n                    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n                    <link href=\"https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@300&display=swap\" rel=\"stylesheet\">\n                    <title>Registering</title>\n                </head>\n              <body>\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" bgcolor=\"#F2F5F5\">\n                    <tr>\n                        <td align=\"center\" >\n                            <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\" bgcolor=\"#393E59\" style=\"padding-left: 40px; margin-top: 60px\">\n                                <tr>\n                                    <td>\n                                        <h3 style=\"font-size: 36px; font-family: IBM Plex Serif; font-weight: 300; color: #fff\">Recover the password</h3>\n                                    </td>\n                                </tr>\n                               </table> \n                        </td>\n                    </tr>\n                    <tr>\n                        <td align=\"center\">\n                            <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\" bgcolor=\"#fff\" style=\"padding-left: 40px; padding-bottom: 46px; padding-top: 40px; margin-bottom: 60px; margin-top: 20px; font-family: Arial, Helvetica, sans-serif;\">\n                                <tr>\n                                    <td>\n                                        <p>\n                                        Hello,<br>\n                                        We've just received a password reset request. Please click the link below<br>\n                                        to reset your password. If you did NOT request a new password, ignore<br>\n                                        this email and your password will remain unchanged. \n                                        </p>\n                                    </td>\n                                </tr>\n                                <tr>\n                                    <td>\n                                        <a href=".concat(link, " style=\"text-decoration: none; color: #000;\">Reset password \u2192</a>\n                                    </td>\n                                </tr>\n                            </table>\n                        </td>\n                    </tr>\n                  </table>\n                </body>\n            </html>\n                ")
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return MailService;
}());
module.exports = new MailService();
