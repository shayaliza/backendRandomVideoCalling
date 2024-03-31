const http = require("http");
const { v4: uuidv4 } = require("uuid");
const { Server } = require("socket.io");

// Load environment variables
require("dotenv").config();

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  const roomID = uuidv4();

  socket.join(roomID);

  socket.emit("roomID", roomID);

  socket.on("message", (message) => {
    io.to(roomID).emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
