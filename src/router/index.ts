import express from "express"
const router = express.Router()
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');
const userController = require('../controllers/user-controller');


router.post('/registration',
    body('name').notEmpty().isLength({min: 1, max: 30}).withMessage('Name length must be between 1 and 30 symbols')
        .matches(/^[A-Za-z\s]+$/).withMessage('Name can contain only letters'),
    body('surname').notEmpty().isLength({min: 1, max: 30}).withMessage('Name length must be between 1 and 30 symbols')
        .matches(/^[A-Za-z\s]+$/).withMessage('Name can contain only letters'),
    body('email').isEmail().isLength({max: 256}).withMessage('Email length must be no more than 256 symbols'),
    body('password').isEmail().isLength({max: 256}).withMessage('Email length must be no more than 256 symbols'),
    userController.registration
);
router.post('/signin',
    body('email').isEmail().isLength({max: 256}).withMessage('Email length must be no more than 256 symbols'),
    body('password').isEmail().isLength({max: 256}).withMessage('Email length must be no more than 256 symbols'),
    userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);

module.exports = router