var MobileState = function() {
};

MobileState.prototype.preload = function() {

  game.load.spritesheet('cluePen', 'assets/mobile/cluepen.png', 64, 64);
  game.load.image('horns', 'assets/mobile/horns.png');
  game.load.image('ant', 'assets/mobile/ant.png');
  game.load.image('quad', 'assets/mobile/quad.png');
  game.load.image('biped', 'assets/mobile/biped.png');
  game.load.image('stripes', 'assets/mobile/stripes.png');
  game.load.image('solid', 'assets/mobile/solid.png');

  game.load.image('readyButton', 'assets/readyButton.png');
  game.load.image('waiting', 'assets/waitingButton.png');
  game.load.image('exitButton', 'assets/exitButton.png');
  game.load.image('winText', 'assets/winText.png');
  game.load.image('loseText', 'assets/loseText.png');
  game.load.image('completeText', 'assets/completeText.png');

};

MobileState.prototype.create = function() {

    console.log("Starting mobile app");
    game.scale.setUserScale(window.innerWidth/800, window.innerHeight/600, 0, 0);
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.fullScreenScaleMod = Phaser.ScaleManager.EXACT_FIT;
    //game.input.onDown.add(gofull, this);
    game.stage.backgroundColor = '#FFCC99';

    //Menu Stuff
    winText = game.add.sprite(game.width/2 - 200, -200, 'winText');
    loseText = game.add.sprite(game.width/2 - 200, -200, 'loseText');
    completeText = game.add.sprite(game.width/2 - 200, -200, 'completeText');
    waitingSprite = game.add.sprite(game.width/2 - 200, -200, 'waiting');
    desktopReadyButton = game.add.button(game.width/2 - 200, -200, 'readyButton', DesktopState.prototype.readyUp);
    desktopExitButton = game.add.button(game.width/2 - 200, -200, 'exitButton', DesktopState.prototype.restart);
    mobileReadyButton = game.add.button(game.width/2 - 200, -200, 'readyButton', MobileState.prototype.readyUp);
    mobileExitButton = game.add.button(game.width/2 - 200, -200, 'exitButton', MobileState.prototype.restart);

    //List of all clue pens
    clueList = [];
    //Also a group of clue pens because spaghetti
    backgroundLayer = game.add.group();
    clueLayer = game.add.group();

    //Flags to Keep Devices in Sync
    desktopReady = false;
    mobileReady = false;

    currentLevel = 0;
    this.showWinMenu();
    winText.y = -200;

};

MobileState.prototype.update = function() {

  if(desktopReady && mobileReady)
    MobileState.prototype.startLevel();

};

MobileState.prototype.readyUp = function() {

  mobileReadyButton.y = -200;
  mobileReady = true;
  socket.emit('readyUpMobile', {});

};

MobileState.prototype.showWinMenu = function() {

  winText.y = game.height/2-80-200;
  waitingSprite.y = game.height/2-80;
  mobileReadyButton.y = game.height/2-80;

};

MobileState.prototype.hideWinMenu = function() {

  winText.y = -200;
  waitingSprite.y = -200;
  mobileReadyButton.y = -200;

};

MobileState.prototype.showLoseMenu = function() {

  loseText.y = game.height/2-80-200;
  waitingSprite.y = game.height/2-waitingSprite.height/2;
  mobileReadyButton.y = game.height/2-waitingSprite.height/2;
  mobileExitButton.y = game.height/2-waitingSprite.height/2+200;

};

MobileState.prototype.hideLoseMenu = function() {

  loseText.y = -200;
  waitingSprite.y = -200;
  mobileReadyButton.y = -200;
  mobileExitButton.y = -200;

};

MobileState.prototype.showCompleteMenu = function() {

  completeText.y = game.height/2-80-200;
  mobileExitButton.y = game.height/2-80;

};

MobileState.prototype.hideCompleteMenu = function() {

  completeText.y = -200;
  mobileExitButton.y = -200;

};

MobileState.prototype.restart = function() {

  MobileState.clearStage();
  game.state.start('mobile');

};

MobileState.prototype.startLevel = function() {
  levels[currentLevel].loadMobile();
  MobileState.prototype.hideWinMenu();
  MobileState.prototype.hideLoseMenu();
  mobileReady = false;
  desktopReady = false;

};

MobileState.prototype.clearStage = function() {
  clueLayer.removeAll();
  clueList = [];
};

function gofull() {

    if (game.scale.isFullScreen)
    {
        game.scale.stopFullScreen();
    }
    else
    {
        game.scale.startFullScreen(false);
    }

}

//Socket.io events
socket.on('penUpdate', function(msg){
  //Correct
  if(msg.satisfied === 1)
    clueList[msg.id].tint = 0x00FF00;
  //Incorrect
  else if(msg.satisfied === 0)
    clueList[msg.id].tint = 0xFF0000;
  //Empty
  else if(msg.satisfied === -1)
    clueList[msg.id].tint = 0xFFFFFF;
});
socket.on('setLevel', function(msg){
  currentLevel = msg;
});
socket.on('readyUpDesktop', function(msg){
  desktopReady = true;
});
socket.on('win', function(msg){
  console.log('win!');
  MobileState.prototype.clearStage();
  MobileState.prototype.showWinMenu();
});

//Clue Pens
function CluePen(x, y, clue) {

  Phaser.Sprite.call(this, game, x, y, clue);
  game.add.existing(this);
  clueList.push(this);
  clueLayer.add(this);

}
CluePen.prototype = Object.create(Phaser.Sprite.prototype);
