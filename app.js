const express = require("express")
//express를 변수에 담기  
const app =express();
//express를 실행한 내용을 app에 담기

const path = require("path")
//url만들때 도와줌

const moment =require("moment");

const http = require("http");
const { resourceUsage } = require("process");
const server = http.createServer(app)
//express가 http 를통해서 실현될수 있게 했다

const sockIO = require("socket.io");
const { Socket } = require("dgram");




const io =sockIO(server)
//io로 메세지를 받아와서 제어하기




console.log("d")
//보여줄 폴더를 지정하자!
app.use(express.static(path.join(__dirname,"src")))
//__dirname은  가지고있는 프로젝트 폴더를 가리킨다!! 
//path.join알아보기!!!

const PORT =process.env.PORT || 5000;
//만약에 포트가 있으면 그서버를 쓰고 없으면 5000번쓰기

io.on("connection",(socket)=>{
    //console.log('odf')
    //socket.on("채팅아이디", "함수")
    //긍까 프론트 갔다가 오는겨??
    socket.on("chatting", (data)=>{
        console.log(data);
        const {name, msg} = data;
        
        io.emit("chatting", {
            name:name,
            msg:msg,
            time:moment(new Date()).format("h:mm A")
            //시간 주는 노드js 갖고 있는 머시기머시기
        })
    })
})
//애는 연결됬으면 정보나 모든 것을 소켓에 담는다!!

//app.listen(포트, 실행할명령)
server.listen(PORT, ()=>console.log(`server is running ${PORT}`))




