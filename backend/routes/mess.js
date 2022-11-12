var express = require('express')

var router = express.Router()

var messenger = require('../controllers/messengerController')

router.get('/', messenger.index)

router.post('/send', messenger.send)

module.exports = router