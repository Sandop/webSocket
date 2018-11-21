const http = require('http');
const io = require('socket.io');

let httpServer = http.createServer((req,res)=>{});
httpServer.listen(8080);

let wsServer = io.listen(httpServer);

let aSock = [];         //用于存储连接窗口

wsServer.on('connection',sock=>{
    aSock.push(sock);   //将连接添加到数组

    //断开连接
    sock.on('disconnect',()=>{
        let num = aSock.indexOf(sock);

        aSock.splice(num,1)
    })

    //浏览器就收到的消息发送给除了自己的每个客户端
    sock.on('msg',str=>{
        aSock.forEach(s=>{
            if(s != sock){
                s.emit('msg',str);
            }
        })
    })
})