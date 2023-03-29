import http from "http";
import SocketIO from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug")
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
    socket.on("enter_room", (a, b, c, d, e, f) => {
        console.log(a, b, c, d, e, f);
        
    });
});


// const sockets = [];
// wss.on("connection", (socket) => {
//     sockets.push(socket); // sockets [] 배열을 만들어서 누가 들어왔는지 알려주게끔 만들기 위해 sockets 만듬 
//     socket["nickname"] = "Anon"
//     console.log("Connected to Browser");
//     socket.on("close", () => console.log("Disconnected from the Browser") );
//     socket.on("message", (msg) => {
//         const message = JSON.parse(msg);
//         switch(message.type) {
//             case "new_message":
//                 sockets.forEach((aSocket) => 
//                 aSocket.send(`${socket.nickname} : ${message.payload}`));
//                 break;
//             case "nickname":
//                 socket["nickname"] = message.payload;
//                 break;
//         }
//     });
// });


const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen)

