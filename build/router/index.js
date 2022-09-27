"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var body = require('express-validator').body;
var authMiddleware = require('../middlewares/auth-middleware');
var userController = require('../controllers/user-controller');
router.post('/signup', body('email').isEmail(), body('password').isLength({ min: 3, max: 32 }), userController.registration);
router.post('/signIn');
router.post('/logout');
router.get('/activate/:link');
router.get('/refresh');
router.get('/users');
module.exports = router;
