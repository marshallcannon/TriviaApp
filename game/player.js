var PlayerState = function() {

  this.preload = function() {

    game.load.spritesheet('buzzer', 'assets/button.png', 200, 200);

  };

  this.create = function() {

    var buzzerButton = game.add.button(game.width/2-50, game.height/2-50, 'buzzer', buzz, this, 0, 0, 1, 0);
    buzzerButton.anchor.setTo(0.5, 0.5);
    buzzerButton.scale.setTo(3, 3);

  };

};

buzz = function() {

  socket.emit('buzz');

};
