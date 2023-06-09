﻿var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, {
    allowEIO3: true,
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"],
        credentials: true
    }
});

/* 接收在线人数，传给前端，保证在线人数是最新的 */
var userList=[{
    name:'广播',
    type:"group"
}];  
var roomList=[];

io.on('connection', function (socket) {   
    /* 监听用户登录事件,并将数据放到socket实例的属性上 */
    socket.on('login',(data,callback)=>{
        /* 遍历服务器连接对象 */
        var islogin=true;
        io.sockets.sockets.forEach(iss => {
            if(iss.name==data.name){
                islogin=false;
            }
        });
        if(islogin){
            // console.log('用户登录成功：',data);
            userList.push(data);
            socket.name=data.name;
            callback(true);
            io.emit('login',userList);
            io.emit('addRoom',roomList);
        }else{
            console.log('用户登录失败！：',data);
            callback(false);
        }
    });

    /* 监听群聊事件 */
    socket.on('groupChat',data=>{
        // 发送给所有客户端，除了发送者
        /* 修改源数据的属性 */
        data.type='user';
        socket.broadcast.emit('updateChatMessageList',data);
    });

    /* 监听私聊事件 */
    socket.on('privateChat',data=>{
        /* 找到对应的私聊对象 */
        io.sockets.sockets.forEach(iss=>{
            if(iss.name==data.receiver){
                data.type='user';
                io.to(iss.id).emit('updateChatMessageList',data);
            }
        });
    });

    socket.on('addRoom',data=>{
         roomList.push(data);
         console.log(socket.rooms); 
         socket.join(data.name);
         console.log(socket.rooms); 
         data.member.forEach(i =>
            {
                io.sockets.sockets.forEach(iss => {
                    if(iss.name === i)
                    {
                        console.log(iss.name+"joined!");                        
                        console.log(iss.rooms);
                        iss.join(data.name);
                        console.log(iss.rooms);
                    }                    
                })
            });
         io.emit('addRoom',roomList);
    });
    
    socket.on('roomChat',data => {
        if(data.roomName !== 'not a room')
        {
            data.type='user';
            console.log("send to "+ data.roomName);
            //先出一次再进来，防止发给自己
            socket.leave(data.roomName);
            io.to(data.roomName).emit('updateChatMessageList',data);
            socket.join(data.roomName);
        }         
    });

    /* 用户掉线 */
    socket.on('disconnect',()=>{
        /* 删除用户 */
        let index=userList.findIndex(i=>i.name==socket.name);
        if(index!=-1){
            userList.splice(index,1);
            /* 通知前端 */
            io.emit('login',userList);
        }
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});
