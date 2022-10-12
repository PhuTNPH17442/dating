const express = require('express')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser') 
const AuthRoute = require('./routes/auth')
dotenv.config();
const app = express();
app.use(cors());
app.use(cookieParser())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URL,()=>{
    console.log("Connected MongoDb")
})

app.listen(5000,()=>{
    console.log("sever is running")
})
app.use('/api',AuthRoute)