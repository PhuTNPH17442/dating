const { response } = require('express')
const Employee = require('../models/Employee')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const index = (req, res, next)=>{
    Employee.find().then(response=>{
        res.json({
            response
        })
    })
    .catch(error =>{
        res.json({
            message :'An error Occured'
        })
    })
}
const show = (req, res , next)=>{
    let username = req.body.username
    Employee.findOne(username)
    .then(response=>{
        res.json({
            response
        })
    })
    .catch(error=>{
        res.json({
            message:'An error Occured'
        })
    })
}
const add = (req,res,next)=>{
    let employee = new Employee({
        username: req.body.username,
        email:req.body.email,
        password: req.body.password,
        designation: req.body.designation
    })
    if(req.file){
        employee.avatar = req.file.path
    }
    employee.save()
    .then(response=>{
        res.json({
            message:'Employee Added Successfully!'
        })
    })
    .catch(error=>{
        res.json({
            message:'Employee Added Failed!'
        })
    })
}
const update = (req, res, next)=>{
    let employeeID = req.body.employeeID

    let updateData = {
        username:req.body.username,
        email : req.body.email,
        phone: req.body.phone,
        password: req.body.password
    }
    Employee.findByIdAndUpdate(employeeID,{$set:updateData})
    .then(()=>{
        res.json({
            message:'Employee update successfully'
        })
    })
    .catch(error=>{
        res.json({
            message:'Employee update failed'
        })
    })
}
const destroy = (req , res, next)=>{
    let employeeID = req.body.employeeID
    Employee.findByIdAndDestroy(employeeID)
    .then(()=>{
        req.json({
            message:'Employee delete successfully'
        })
    })
    .catch(error=>{
        res.json({
            message:'Employee delete fail'
        })
    })
}
const login = (req,res,next)=>{
    var username = req.body.username
    var password = req.body.password

    Employee.findOne({$or: [{email:username}]})
    .then(employee=>{
        if(employee){
            bcrypt.compare(password,employee.password,function(err,result){
                if(err){
                    res.json({
                        error:err
                    })
                }
                if(result){
                    let token = jwt.sign({username: employee.username}, 'verySecretvalue',{expiresIn:'1h'})
                    res.json({
                        message:'Login successful',
                        token
                    })
                }else{
                    res.json({
                        message:'Password not matched'
                    })
                }
            })
        }else{
            res.json({
                message:'No user found'
            })
        }
    })
}


module.exports ={
    index,show,add,update,destroy,login
}