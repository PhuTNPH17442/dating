const express = require('express')
const router = express.Router()
const EmployeeController = require('../controllers/EmployeeController')
const upload = require('../middleware/upload')
router.get('/',EmployeeController.index)
router.post('/show',EmployeeController.show)
router.post('/add', upload.single('avatar'), EmployeeController.add)
router.post('/update',EmployeeController.update)
router.post('/delete',EmployeeController.destroy)
router.post('/login',EmployeeController.login)

module.exports = router