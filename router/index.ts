const Router = require('express').Router

const router = Router()

router.post('/signUp')
router.post('/signIn')
router.post('/logout')
router.get('/activate/:link')
router.get('/refresh')
router.get('/users')

module.exports = router