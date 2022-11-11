const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema({
    username: {type: String},
    email: {type: String},
    password:{type:String},
    designation:{
      type:String
    },
    admin:{
       type:Boolean,
       default:false
    },
    avatar:{type:String}
},{timestamps:true})
const Employee = mongoose.model('Employee',employeeSchema)
module.exports = Employee
