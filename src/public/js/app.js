const socket = new WebSocket(`ws://${window.location.host}`); // app.js(프론트엔드)의 socket은 서버와의 연결을 뜻한다
const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");

function makeMessage(type, payload){
    const msg = {type, payload}
    return JSON.stringify(msg);
}

socket.addEventListener("open", () => {
    console.log("Connected to Server ");
});

socket.addEventListener("message", (message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
});

socket.addEventListener("close", () => {
    console.log("Disconnected from Server ");
});
// 서로 다른 form임 messageForm, nickForm (form2개)
function handleSubmit(event) {  // 이 부분은 front-end에서 chat으로 보내는 메세지
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new_message", input.value));
    input.value = "";
}

function handleNickSubmit(event){ // 이 부분은 front-end에서 nickname을 설정 및 변경할때 back-end로 보내는 메세지
    event.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value));
    input.value = "";
}
messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);