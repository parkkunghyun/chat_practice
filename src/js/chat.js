"use strict"

//지금 애가 프론트 앤드 거기인가 보네

const socket =io();

const nickname =document.querySelector("#nickname")
const chatList = document.querySelector(".chatting-list")
const chatInput =document.querySelector(".chatting-input")
const sendButton = document.querySelector(".send-button")
//button에도 이벤트를 주기 위해서
const displayContainer = document.querySelector(".display-container")

chatInput.addEventListener("keypress", (event)=>{
    if(event.keyCode ===13){
        send()
    }
})

function send(){
    const param ={
        name: nickname.value, //input태그안에 값에 접근이 가능하다
        msg: chatInput.value,
    }
    socket.emit("chatting",param)
}


sendButton.addEventListener("click", send)



socket.on("chatting",(data)=>{
    const {name, msg, time}=data;
    const item =new LiModel(name,msg,time); //limodel을 인스턴스화 시킴
    item.makeLi();
    displayContainer.scrollTo(0, displayContainer.scrollHeight)

    //console.log(data)
    //const li =document.createElement("li");
    //li.innerText=`${data.name}님이 - ${data.msg}`;
  //  chatList.appendChild(li);
})

console.log(socket)


function LiModel(name, msg, time){
    this.name =name;
    this.msg =msg;
    this.time =time;

    this.makeLi= ()=>{
        const li =document.createElement("li");
        li.classList.add(nickname.value === this.name? "sent":"receive")

        const dom = ` <span class="profile">
        <span class="user">${this.name}</span>
        <img class="image" src="https://placeimg.com/50/50/any" alt="any">
    </span>
    <span class="message">${this.msg}</span></span>
    <span class="time">${this.time}</span>`;
    li.innerHTML =dom;
    chatList.appendChild(li);
    }
}