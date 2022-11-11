const { response } = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const index = (req, res, next)=>{
    User.find().then(response=>{
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
    let userID = req.params.userID
    User.findOne(userID)
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
    let user = new User({
        username: req.body.username,
        email:req.body.email,
        password: req.body.password,
        designation: req.body.designation
    })
    if(req.file){
        employee.avatar = req.file.path
    }
    user.save()
    .then(response=>{
        res.json({
            message:'User Added Successfully!'
        })
    })
    .catch(error=>{
        res.json({
            message:'User Added Failed!'
        })
    })
}
const update = (req, res, next)=>{
    let userID = req.body.userID

    let updateData = {
        username:req.body.username,
        email : req.body.email,
        phone: req.body.phone,
        password: req.body.password
    }
    User.findByIdAndUpdate(userID,{$set:updateData})
    .then(()=>{
        res.json({
            message:'User update successfully'
        })
    })
    .catch(error=>{
        res.json({
            message:'User update failed'
        })
    })
}
// const destroy = async (req , res, next)=>{
//     try {
//         let userID = req.params.userID
//     await User.findByIdAndDestroy(userID)
//     .then(()=>{
//         req.json({
//             message:'Employee delete successfully'
//         })
//     })
//     .catch(error=>{
//         res.json({
//             message:'Employee delete fail'
//         })
//     })
//     } catch (err) {
//         res.status(500).json(err)
//     }
    
// }
const destroy = async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  }



module.exports ={
    index,show,update,destroy,add
}