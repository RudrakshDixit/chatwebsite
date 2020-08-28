const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const http=require('http');
const socketIO=require('socket.io');
const {generateMessage} = require('./util/message.js');
const {Users}=require('./util/users.js');


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static("public"));
let server=http.createServer(app);
let io=socketIO(server);
let users= new Users();
app.get("/",function(req,res){
  res.render('chat');
});



app.get("/index",function(req,res){
  res.render('index');
});


app.get("/:name",function(req,res){
  res.redirect('index');
});


io.on('connection',function(socket){



socket.on('join',(ob,callback)=>{
  if(ob!=null){
    if(ob.room!='undefined'||ob.name!='undefined'){


    socket.join(ob.room[0].split(' ').join(''));
    users.removeUser(socket.id);

    users.addUser(socket.id,ob.username[0],ob.room[0].split(' ').join(''));


    io.to(ob.room[0].split(' ').join('')).emit('updateUsersList',users.getUserList(ob.room[0].split(' ').join('')));
    socket.emit('newMessage',generateMessage('Admin',"Welcome to the chat app"));

    let user=users.getUser(socket.id);
    if(user){
      socket.broadcast.to(user.room).emit('newMessage',generateMessage('Admin', ob.username + " joined the chat"));

    }
    }
  }

});

  socket.on('createMessage',function(message){
    let user=users.getUser(socket.id);
    if(user){
      io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
    }
  });


  socket.on('disconnect',()=>{
let user=users.removeUser(socket.id);
 if(user){
   io.to(user.room).emit('updateUsersList',users.getUserList(user.room));
   io.to(user.room).emit('newMessage',generateMessage("Admin", user.name + " has left the chat"));
 }


  });

});


server.listen(process.env.PORT||3000,function(){
  console.log("server is started on port 3000");
});
