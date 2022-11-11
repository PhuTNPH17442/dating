const express = require('express')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser') 
const AuthRoute = require('./routes/auth')
const UserRoute = require('./routes/user')
dotenv.config();
const app = express();
app.use(cors());
app.use(cookieParser())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017',()=>{
    console.log("Connected MongoDb")
})

app.listen(5000,()=>{
    console.log("sever is running 5000")
})
app.use('/api',AuthRoute)
app.use('/api/user',UserRoute)