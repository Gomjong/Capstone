const socket = new WebSocket(`ws://${window.location.host}`); // app.js(프론트엔드)의 socket은 서버와의 연결을 뜻한다

const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

socket.addEventListener("open", () => {
    console.log("Connected to Server ");
});

socket.addEventListener("message", (message) => {
    console.log("New message: ", message.data);
});

socket.addEventListener("close", () => {
    console.log("Disconnected from Server ");
});

function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(input.value);
    input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);