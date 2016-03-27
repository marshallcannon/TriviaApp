var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static('game'));

var players = {};
var host;
var locked = false;
var winnerSelected = false;

app.get('/', function(req, res){
  res.sendFile(__dirname + 'game/index.html');
});

io.on('connection', function(socket){
  console.log('Player connected!');
  players[socket.id] = {name:'', score:0};
  if(io.engine.clientsCount === 1)
  {
    host = socket.id;
    io.to(host).emit('makeHost');
  }

  socket.on('disconnect', function(){
    console.log('Player disconnected...');
    delete players[socket.id];
  });

  //Set Player Name
  socket.on('setName', function(msg){
    players[socket.id].name = msg;
    io.to(host).emit('updatePlayers', players);
  });

  //Lock Buzzers
  socket.on('lock', function(){
    locked = true;
  });

  //Unlock Buzzers
  socket.on('unlock', function(){
    locked = false;
    winnerSelected = false;
  });

  //Player Buzzed In
  socket.on('buzz', function(){
    if(!locked && !winnerSelected)
    {
      winnerSelected = true;
      io.to(host).emit('buzzWinner', {socketID: socket.id});
    }
    else {
      io.to(host).emit('buzzTardy', {socketID: socket.id});
    }
  });

});

http.listen(3000, function(){
  console.log('listening on localhost:3000');
});
