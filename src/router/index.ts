import express from "express"
const router = express.Router()
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');
const userController = require('../controllers/user-controller');



router.post('/signup',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration
);
router.post('/signIn')
router.post('/logout')
router.get('/activate/:link')
router.get('/refresh')
router.get('/users')

module.exports = router