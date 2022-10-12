const express = require('express')
const router = express.Router()

const AuthCotroller = require('../controllers/authController')

router.post('/register', AuthCotroller.register)
router.post('/login', AuthCotroller.login)

module.exports = router