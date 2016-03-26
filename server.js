var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static('game'));

var players = [];
var host;

app.get('/', function(req, res){
  res.sendFile(__dirname + 'game/index.html');
});

io.on('connection', function(socket){
  console.log('Player connected!');
  players[socket.id] = {name:'', score:0};
  if(io.engine.clientsCount === 1)
  {
    host = socket.id;
    socket.host.emit('makeHost');
  }

  socket.on('disconnect', function(){
    console.log('Player disconnected...');
    delete players[socket.id];
  });

});

http.listen(3000, function(){
  console.log('listening on localhost:3000');
});
