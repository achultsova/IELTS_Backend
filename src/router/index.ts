import express from "express"
const router = express.Router()
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');
const userController = require('../controllers/user-controller');
const testController = require('../controllers/test-controller');


router.post('/registration',
    body('name').notEmpty().isLength({ min: 1, max: 30 }).withMessage('Name length must be between 1 and 30 symbols')
        .matches(/^[A-Za-z\s]+$/).withMessage('Name can contain only letters'),
    body('surname').notEmpty().isLength({ min: 1, max: 30 }).withMessage('Name length must be between 1 and 30 symbols')
        .matches(/^[A-Za-z\s]+$/).withMessage('Name can contain only letters'),
    body('email').isEmail().isLength({ max: 256 }).withMessage('Email length must be no more than 256 symbols'),
    body('password').isLength({ min: 8, max: 64 }).withMessage('Email length must be no more than 256 symbols'),
    userController.registration
);
router.post('/login',
    body('email').isEmail().isLength({ max: 256 }).withMessage('Email length must be no more than 256 symbols'),
    body('password').isLength({ min: 8, max: 64 }).withMessage('Email length must be no more than 256 symbols'),
    userController.login);
router.post('/forgotPassword',
    body('email').isEmail().isLength({ max: 256 }).withMessage('Email length must be no more than 256 symbols'),
    userController.forgotPassword);
router.post('/setNewPassword/:id',
    body('password').isLength({ min: 8, max: 64 }).withMessage('Email length must be no more than 256 symbols'),
    userController.setNewPassword);
router.post('/changeInfo',
    body('name').notEmpty().isLength({ min: 1, max: 30 }).withMessage('Name length must be between 1 and 30 symbols')
        .matches(/^[A-Za-z\s]+$/).withMessage('Name can contain only letters'),
    body('surname').notEmpty().isLength({ min: 1, max: 30 }).withMessage('Name length must be between 1 and 30 symbols')
        .matches(/^[A-Za-z\s]+$/).withMessage('Name can contain only letters'),
    userController.changeInfo
);
router.post('/changePassword/:id',
    body('password').isLength({ min: 8, max: 64 }).withMessage('Email length must be no more than 256 symbols'),
    userController.changePassword)
router.post('/logout', userController.logout);
router.get('/reset/:link/:id', userController.reset);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);

router.get('/getAllTests', testController.getAllTests)
router.post('/createTest',
    body('count').notEmpty(),
    testController.createTest);
router.get('/getTestNumber/:id', testController.getTestNumber)

module.exports = router