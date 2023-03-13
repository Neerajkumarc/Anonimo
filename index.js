const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  io.emit("connection", { userId: socket.id });
  socket.on("chat message", (msg) => {
    io.emit("chat message", { userId: socket.id, msg });
  });

  socket.on("disconnect", () => {
    io.emit("user disconnected", { userId: socket.id });
  });
});


server.listen(3000, () => {
  console.log("server started");
});
