let socket = io();
socket.on('connect',function(){
  var ob=parseURLParams(window.location.href);

if(ob==null||ob==''||ob=='undefined'){
  alert('Join room to chat');
  window.location.href="/index";


}else{

  if(window.location.href.indexOf('&' + 'room' + '=') != -1||window.location.href.indexOf('?' + 'username' + '=') != -1){
  //present
  socket.emit('join',ob,function(err){
    if(err){
      alert('Error');
      window.location.href="/index";
    }else{
    }
  });
}else{
  alert('Join room to chat');
  window.location.href="/index";
}

}



});

socket.on('disconnect',function(){


});

socket.on('updateUsersList',function(users){

  var list = document.querySelector(".usersonline");
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }


  for(var i=0;i<users.length;i++){
    const li=document.createElement('li');
    li.innerText =users[i];
    li.setAttribute("class", "classname");
    document.querySelector(".usersonline").appendChild(li);

  }
});


//getting a new message
socket.on('newMessage',function(message){
  const time=moment(message.date).format('LT');

  const li=document.createElement('li');
  li.innerText = message.from+ ' ' +time + ': ' + message.text;
  document.querySelector(".mainc").appendChild(li);


  updateScroll();
});

document.querySelector('#submit-btn').addEventListener('click',function(e){
e.preventDefault();

if(document.getElementById("input-id").value.trim()==""){
  alert('Type something')
}else{
  socket.emit('createMessage',{
    from: 'User',
    text: document.querySelector('#input-id').value,
  });
}

//creating a new message


document.getElementById("input-id").value="";

});


function updateScroll(){
    var element = document.getElementById("down");
    element.scrollTop = element.scrollHeight;
}


function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}
