const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {response} = require('express')

const register = (req,res,next)=>{
    bcrypt.hash(req.body.password,10, function(err, hash){
        if(err){
            res.json({
                error:err
            })
        }
        let user = new User({
            username : req.body.username,
            email: req.body.email,
            password: hash
        })
        user.save()
        .then(user=>{
            res.json({
                message:'User added succesfully'
            })
        })
        .catch(error=>{
            res.json({
                message:error
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
                    let token = jwt.sign({username: user.username}, 'secretValue',{expiresIn:'1h'})

                    let refreshtoken = jwt.sign({username: user.username}, 'refreshtokensecret',{expiresIn:'2d'})

                    res.json({
                        message:'Login successful',
                        token,
                        refreshtoken
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
const logOut = async (req, res) => {
    
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.clearCookie("refreshToken");
    res.status(200).json("Logged out successfully!");
  }

module.exports={
    register,login,logOut
}