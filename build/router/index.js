"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = tslib_1.__importDefault(require("express"));
var router = express_1.default.Router();
var body = require('express-validator').body;
var authMiddleware = require('../middlewares/auth-middleware');
var userController = require('../controllers/user-controller');
router.post('/registration', body('name').notEmpty().isLength({ min: 1, max: 30 }).withMessage('Name length must be between 1 and 30 symbols')
    .matches(/^[A-Za-z\s]+$/).withMessage('Name can contain only letters'), body('surname').notEmpty().isLength({ min: 1, max: 30 }).withMessage('Name length must be between 1 and 30 symbols')
    .matches(/^[A-Za-z\s]+$/).withMessage('Name can contain only letters'), body('email').isEmail().isLength({ max: 256 }).withMessage('Email length must be no more than 256 symbols'), body('password').isLength({ min: 8, max: 64 }).withMessage('Email length must be no more than 256 symbols'), userController.registration);
router.post('/login', body('email').isEmail().isLength({ max: 256 }).withMessage('Email length must be no more than 256 symbols'), body('password').isLength({ min: 8, max: 64 }).withMessage('Email length must be no more than 256 symbols'), userController.login);
router.post('/forgotPassword', body('email').isEmail().isLength({ max: 256 }).withMessage('Email length must be no more than 256 symbols'), userController.forgotPassword);
router.post('/setNewPassword/:id', body('password').isLength({ min: 8, max: 64 }).withMessage('Email length must be no more than 256 symbols'), userController.setNewPassword);
router.post('/changeInfo', body('name').notEmpty().isLength({ min: 1, max: 30 }).withMessage('Name length must be between 1 and 30 symbols')
    .matches(/^[A-Za-z\s]+$/).withMessage('Name can contain only letters'), body('surname').notEmpty().isLength({ min: 1, max: 30 }).withMessage('Name length must be between 1 and 30 symbols')
    .matches(/^[A-Za-z\s]+$/).withMessage('Name can contain only letters'), userController.changeInfo);
router.post('/changePassword/:id', body('password').isLength({ min: 8, max: 64 }).withMessage('Email length must be no more than 256 symbols'), userController.changePassword);
router.post('/logout', userController.logout);
router.get('/reset/:link/:id', userController.reset);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);
module.exports = router;
