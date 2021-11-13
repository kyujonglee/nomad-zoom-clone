import express from "express";
import path from "path";
import http from "http";
import { WebSocketServer } from "ws";

const app = express();

const PORT = process.env.PORT || 3000;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => {
  console.log(`✅  server starting PORT:${PORT}`);
};

// app.listen(PORT, handleListen);
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const onSocketClose = () => {
  console.log("disconnect from the browser");
};

const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  socket["nickname"] = "Anon";
  console.log("Connected to Browser !!");
  socket.on("close", onSocketClose);
  socket.on("message", (message) => {
    const parsed = JSON.parse(message.toString());
    switch (parsed.type) {
      case "new_message": {
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname}: ${parsed.payload}`)
        );
        break;
      }
      case "nickname": {
        socket["nickname"] = parsed.payload;
        break;
      }
    }
  });
});

server.listen(PORT, handleListen);
