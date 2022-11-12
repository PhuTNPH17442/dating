const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
//const upload = require('../middleware/upload')

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/logout', authController.logOut)

module.exports = router