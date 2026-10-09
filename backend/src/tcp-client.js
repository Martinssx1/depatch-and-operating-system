const net = require("net");

const socket = net.createConnection({
  host: "localhost",
  port: 3000,
});

socket.on("connect", () => {
  console.log("Connected to server!");

  socket.write("heyyy");
});

socket.on("data", (data) => {
  console.log("Server said:", data.toString());

  socket.end();
});

socket.on("end", () => {
  console.log("Connection closed");
});
