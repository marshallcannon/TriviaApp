var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static('game'));

app.get('/', function(req, res){
  res.sendFile(__dirname + 'game/index.html');
});

io.on('connection', function(socket){
  console.log('Player connected!');

  socket.on('disconnect', function(){
    console.log('Player disconnected...');
  });

});

http.listen(3000, function(){
  console.log('listening on localhost:3000');
});
