const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server,{
 cors:{origin:"*"}
});

io.on("connection",(socket)=>{

 console.log("User connected");

 socket.on("locationUpdate",(data)=>{

  const {bus_id,lat,lng}=data;

  db.query(
   "INSERT INTO locations (bus_id,lat,lng) VALUES (?,?,?)",
   [bus_id,lat,lng]
  );

  io.emit("busLocation",data);

 });

});

server.listen(3000,()=>{
 console.log("Server running on port 3000");
});
