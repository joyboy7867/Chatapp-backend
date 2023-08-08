const express=require("express");
const app=express();
const cors=require("cors");
app.use(cors());
const http=require("http")
const{Server}=require("socket.io")

const server=http.createServer(app);

const io=new Server(server,{
  cors:{
    origin:"*"
  }  
})

io.on("connection",socket=>{
    console.log(`User connected ${socket.id}`)
    socket.on("join",data=>{
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    })

    socket.on("send_message",data=>{
      console.log(data);
      let room=data.room;
      socket.to(room).emit("receive_message",data);
    })

   
} )
io.on("disconnect",()=>{
  console.log("user disconnected",socket.id)
})

server.listen(3001,()=>{
    console.log("express server connected")
})