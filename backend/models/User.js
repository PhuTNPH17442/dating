const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], index: true},
    password:{type:String},
    admin:{
        type : Boolean,
        default:false
    }
},{timestamps:true})
const User = mongoose.model('User',userSchema)
module.exports = User