const express = require('express')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const cors = require('cors')
const handlebars = require('express-handlebars')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser') 
const AuthRoute = require('./routes/auth')
const UserRoute = require('./routes/user')
const MessRoute = require('./routes/mess')
const path = require('path')
dotenv.config();
const app = express();

//Temple Engine
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views' , path.join(__dirname,'frontend/resources/views'));
const http = require("http").createServer(app);
const io = require("socket.io")(http);
app.use(cors());
app.use(cookieParser())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017',()=>{
    console.log("Connected MongoDb")
})
app.get('/',(req,res)=>{
  res.render('home')
})

app.use('/api',AuthRoute)
app.use('/api/user',UserRoute)
// app.use('/api/mess',MessRoute)
// io.on("connection", (socket) => {
//     console.log(`Có người vừa kết nối, socketID: ${socket.id}`);
//     socket.on("send_message", (data) => {
//       console.log(data.name + ": " + data.message);
//       const newData = {
//         id_user1: data.id_user2,
//         id_user2: data.id_user1,
//         id: Math.random().toString(),
//         message: data.message,
//         name: data.name,
//         category: "receive",
//       };
  
//       console.log(newData.message);
  
//       const postData = async () => {
//         const messenger = await Messenger.findOne({
//           id_user1: newData.id_user1,
//           id_user2: newData.id_user2,
//         });
  
//         messenger.content.push(newData);
  
//         messenger.save();
//       };
  
//       postData();
//       socket.broadcast.emit("receive_message");
//     });
//     socket.on("keyboard_message_send", (data) => {
//       console.log(data.id_user1 + ": " + data.message);
  
//       socket.broadcast.emit("keyboard_message_receive", data);
//     });
//   });
http.listen(5000,()=>{
    console.log("sever is running 5000")
})