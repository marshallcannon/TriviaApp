var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update }, false, false);

var socket = io();

function preload() {

}

function create() {

  game.state.add('host', HostState, false);
  game.state.add('player', MobileState, false);

}

function update() {

}
