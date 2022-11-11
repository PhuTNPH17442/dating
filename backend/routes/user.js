const express = require('express')
const router = express.Router()
const EmployeeController = require('../controllers/userController')
const upload = require('../middleware/upload')
const authenticate = require('../middleware/authenticate')
router.get('/showall',EmployeeController.index)
router.post('/show',authenticate.verifyTokenAndAdmin,EmployeeController.show)
router.post('/add', upload.single('avatar'), EmployeeController.add)
router.post('/update',authenticate.verifyTokenAndUserAuthorization,EmployeeController.update)
router.post('/delete',authenticate.verifyTokenAndUserAuthorization,EmployeeController.destroy)


module.exports = router