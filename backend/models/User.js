const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {type: String, unique: true,  index: true},
    email: {type: String,  unique: true, index: true},
    password:{type:String},
    admin:{
        type:Boolean,
        default:true
    }
},{timestamps:true})
const User = mongoose.model('User',userSchema)
module.exports = User