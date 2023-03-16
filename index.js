const PORT = process.env.PORT || 3000
require('dotenv').config()
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.use(express.static(__dirname+"/public"))
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  io.emit("connection", { userId: socket.id , onlineUsers:socket.adapter.sids.size});
  socket.on("chat message", (msg) => {
    io.emit("chat message", { userId: socket.id, msg });
  });

  socket.on("disconnect", () => {
    io.emit("user disconnected",{ userId: socket.id , onlineUsers:socket.adapter.sids.size});
  });
});


server.listen(PORT, () => {
  console.log("server started on "+ PORT);
});
