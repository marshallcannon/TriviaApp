var game = new Phaser.Game('100', '100', Phaser.AUTO, 'game', { preload: preload, create: create, update: update }, false, false);

var socket = io();

function preload() {

}

function create() {

  game.textBox = document.getElementById('textBox');
  game.submitButton = document.getElementById('submitButton');

  game.stage.backgroundColor = "#262626";
  game.state.add('host', HostState, false);
  game.state.add('player', PlayerState, false);

}

function update() {

}

function submitName() {

  socket.emit('setName', game.textBox.value);
  hideNameEntry();
  game.state.start('player');

}

function hideNameEntry() {

  game.textBox.style.visibility = 'hidden';
  game.submitButton.style.visibility = 'hidden';

}

socket.on('makeHost', function() {
  hideNameEntry();
  game.state.start('host');
});
