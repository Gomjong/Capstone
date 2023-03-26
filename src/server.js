import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug")
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({server})

const sockets = [];

wss.on("connection", (socket) => {
    sockets.push(socket); // sockets [] 배열을 만들어서 누가 들어왔는지 알려주게끔 만들기 위해 sockets 만듬 
    console.log("Connected to Browser");
    socket.on("close", () => console.log("Disconnected from the Browser") );
    socket.on("message", (message) => {
        sockets.forEach(aSocket => aSocket.send(message.toString())); // 각 브라우저를 aSocket이라고함
    });
});

server.listen(3000, handleListen)