var level1 = {

  loadDesktop: function() {

    //player
    if(!player)
    {
      player = new Player();
      game.add.existing(player);
      actorLayer.add(player);
    }
    player.setPosition(100, 100);

    //pens
    var pen1 = new Pen(200, 200);
    pen1.setRequirement('horns');
    var pen2 = new Pen(500, 200);
    pen2.setRequirement('stripes');
    var pen3 = new Pen(200, 400);
    pen3.setRequirement('quad');
    var pen4 = new Pen(500, 400);
    pen4.setRequirement('ant');

    //animals
    var animal1 = new HornsSolidQuad(300, 300);
    var animal2 = new AntSolidQuad(400, 100);
    var animal3 = new HornsStripesQuad(350, 500);
    var animal4 = new AntStripesQuad(400, 500);

  },

  loadMobile: function() {

    //clues
    var clue1 = new CluePen(200, 200, 'horns');
    var clue2 = new CluePen(500, 200, 'stripes');
    var clue3 = new CluePen(200, 400, 'quad');
    var clue4 = new CluePen(500, 400, 'ant');

  }

};

var level2 = {

  loadDesktop: function() {

    //player
    player = new Player();
    game.add.existing(player);
    actorLayer.add(player);
    player.setPosition(400, 300);
    spacebar.onDown.add(Player.prototype.kick, player);

    //pens
    var pen1 = new Pen(100, 300);
    pen1.setRequirement('horns');
    var pen2 = new Pen(600, 200);
    pen2.setRequirement('stripes');
    var pen3 = new Pen(300, 100);
    pen3.setRequirement('biped');
    var pen4 = new Pen(550, 500);
    pen4.setRequirement('quad');
    var pen5 = new Pen(350, 350);
    pen4.setRequirement('ant');

    //animals
    var animal1 = new HornsStripesBiped(500, 500);
    var animal2 = new AntStripesQuad(100, 100);
    var animal3 = new HornsSolidQuad(300, 300);
    var animal4 = new AntSolidBiped(100, 400);
    var animal5 = new HornsSolidBiped(200, 300);

  },

  loadMobile: function() {

    var clue1 = new CluePen(100, 300, 'horns');
    var clue2 = new CluePen(600, 200, 'stripes');
    var clue3 = new CluePen(300, 100, 'biped');
    var clue4 = new CluePen(550, 500, 'quad');
    var clue5 = new CluePen(350, 350, 'ant');

  }

};

//Add levels to array
levels.push(level1);
levels.push(level2);
