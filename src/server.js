import express from "express";
import path from "path";
import http from "http";
import { Server } from "socket.io";

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
const wsServer = new Server(server);

server.listen(PORT, handleListen);
