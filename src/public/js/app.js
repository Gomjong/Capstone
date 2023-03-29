const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

function handleRoomSubmit(event){
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit("enter_room", { payload : input.value }, 
    5, 
    "hello", 
    4344, 
    true, 
    false
    );
    input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);
