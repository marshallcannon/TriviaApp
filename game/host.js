var HostState = function() {

  this.preload = function() {

    game.load.image('sam', 'assets/sam.png');
    game.load.bitmapFont('font', 'assets/triviaFont.png', 'assets/triviaFont.fnt');

  };

  this.create = function() {

    lockImage = game.add.sprite(0, 0, 'sam');
    lockImage.scale.setTo(2, 2);
    lockImage.x = (game.width/2) - (lockImage.width/2);
    lockImage.y = (game.height/2) - (lockImage.height/2);
    lockImage.visible = false;

    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spacebar.onDown.add(lock);
    spacebar.onUp.add(unlock);

    playerNames = [];

  };

};

lock = function() {

  lockImage.visible = true;
  socket.emit('lock');

};

unlock = function() {

  lockImage.visible = false;
  socket.emit('unlock');

};

checkOverlap = function(a, b) {

  if (a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.height + a.y > b.y) {
    return true;
  }
  else {
    return false;
  }

};

socket.on('updatePlayers', function(msg){

  console.log(msg);

  //Delete All Player Names
  for(var i = playerNames.length-1; i >= 0; i--)
  {
    playerNames[i].destroy();
  }
  playerNames = [];

  //Create New Player Names
  for(var player in msg)
  {
    if(msg.hasOwnProperty(player))
    {
      if(msg[player].name !== '')
      {
        var newText = game.add.bitmapText(0, 0, 'font', msg[player].name, 64);
        newText.id = player;
        playerNames.push(newText);
      }
    }
  }
  console.log(playerNames);

  //Randomize Name Placement
  for(var j = 0; j < playerNames.length; j++)
  {
    var clear = false;
    while(!clear)
    {
      clear = true;
      playerNames[j].x = game.rnd.between(50, game.width-(playerNames[j].getBounds().width)-50);
      playerNames[j].y = game.rnd.between(50, game.height-(playerNames[j].getBounds().height)-50);

      console.log(playerNames);
      console.log(playerNames[j].x, playerNames[j].y);

      for(var k = 0; k < playerNames.length; k++)
      {
        if(k !== j)
        {
          if(checkOverlap(playerNames[j], playerNames[k]))
          {
            clear = false;
          }
        }
      }
    }
  }

});
