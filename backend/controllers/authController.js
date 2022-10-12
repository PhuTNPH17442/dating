const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {response} = require('express')

const register = (req,res,next)=>{
    bcrypt.hash(req.body.password,10, function(err, hashedPass){
        if(err){
            res.json({
                error:err
            })
        }
        let user = new User({
            username : req.body.username,
            email: req.body.email,
            password: hashedPass
        })
        user.save()
        .then(user=>{
            res.json({
                message:'User added succesfully'
            })
        })
        .catch(error=>{
            res.json({
                message:'User add fail'
            })
        })
    })
    
}
const login = (req,res,next)=>{
    var username = req.body.username
    var password = req.body.password

    User.findOne({$or: [{email:username}]})
    .then(user=>{
        if(user){
            bcrypt.compare(password,user.password,function(err,result){
                if(err){
                    res.json({
                        error:err
                    })
                }
                if(result){
                    let token = jwt.sign({username: user.username}, 'verySecretvalue',{expiresIn:'1h'})
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

module.exports={
    register,login
}