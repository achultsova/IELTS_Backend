import express from "express"
const router = express.Router()
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');
const userController = require('../controllers/user-controller');


router.post('/registration',
    body('name').notEmpty(),
    body('surname').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({min: 8, max: 64}),
    userController.registration
);
router.post('/signin', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);

module.exports = router