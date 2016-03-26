function Animal(x, y, key) {

  this.texture = key || 'animalDefault';
  Phaser.Sprite.call(this, game, x, y, this.texture);
  game.add.existing(this);
  animalList.push(this);
  actorLayer.add(this);

  this.flying = false;
  this.flyingTimer = 0;
  this.caged = false;
  this.cageable = true;
  this.pen = null;
  this.motX = 0;
  this.motY = 0;
  this.hb = new Phaser.Rectangle(x, y, this.width, this.height);
  this.hb.offsetX = Math.abs(this.width)/2;
  this.hb.offsetY = Math.abs(this.height)/2;

  this.anchor.setTo(0.5, 0.5);
  this.shadow = game.add.sprite(this.hb.x, this.hb.y, 'shadow');
  shadowLayer.add(this.shadow);

  //Animations
  this.animations.add('run', [0,1], 5, true);
  this.animations.add('fly', [2,3], 10, true);
  this.animations.add('idle', [4,5], 5, true);

  //Attributes
  this.head = null;
  this.coat = null;
  this.ped = null;

}
Animal.prototype = Object.create(Phaser.Sprite.prototype);

Animal.prototype.update = function() {

  //Physics
  if(this.flying)
  {
    this.motX *= 0.95;
    this.motY *= 0.95;

    if(Math.abs(this.motX) < 0.5 && Math.abs(this.motY) < 0.5)
    {
      this.motX = 0;
      this.motY = 0;
    }
    if(this.flyingTimer === 0)
      this.flyingTimer = 2;
    else
      this.flyingTimer++;
  }
  else {
    this.flyingTimer = 0;
    if(!this.caged)
    {
      if(this.motX === 0 &&  this.motY === 0)
      {
        if(game.rnd.integerInRange(0,240) === 1)
          this.startWalking();
      }
      else {
        if(game.rnd.integerInRange(0,300) === 1)
          this.stopWalking();
      }
    }
  }

  //Graphics
  if(this.motX === 0 && this.motY === 0)
  {
    this.flying = false;
    this.animations.play('idle');
  }
  else {
    if(this.flying)
      this.animations.play('fly');
    else
      this.animations.play('run');
    //Change Direction
    if(this.motX > 0)
      this.scale.x = -1;
    else
      this.scale.x = 1;
  }

  this.move(this.motX, this.motY);
  this.updateSprite();

};

Animal.prototype.booted = function(xSpeed, ySpeed) {

  this.motX = xSpeed;
  this.motY = ySpeed;
  this.flying = true;
  if(this.caged)
  {
    var contextAnimal = this;
    setTimeout(function(){contextAnimal.uncage();}, 200);
  }
  if(this.pen)
    this.pen.releaseAnimal();

};

//Move animal relative to its current position
Animal.prototype.move = function(x, y) {

  if(this.hb.x + this.hb.width + x < game.world.width && this.hb.x + x > 0)
    this.hb.x += x;
  else {
    this.motX *= -1;
  }
  if(this.hb.y + this.hb.height + y < game.world.height && this.hb.y + y > 0)
    this.hb.y += y;
  else {
    this.motY *= -1;
  }

};

//Move animal to absolute position
Animal.prototype.setPosition = function(x, y) {
  this.hb.x = x;
  this.hb.y = y;
};

Animal.prototype.setAttributes = function(head, coat, ped) {

  if(head === 'horns' || head === 'ant')
    this.head = head;
  else
    console.log('Invalid head type: ' + head);
  if(coat === 'solid' || coat === 'stripes')
    this.coat = coat;
  else
    console.log('Invalid coat type: ' + coat);
  if(ped === 'biped' || ped === 'quad')
    this.ped = ped;
  else
    console.log('Invalid ped type: ' + ped);

};

Animal.prototype.updateSprite = function() {
  this.x = this.hb.x-this.hb.offsetX;
  this.y = this.hb.y-this.hb.offsetY;
  this.shadow.x = this.hb.x + this.hb.width/2 - this.shadow.width/2;
  this.shadow.y = this.hb.y + this.hb.height - 12;

  //Bounce Animation
  if(this.flying)
  {
    this.y -= Math.abs(Math.sin(this.flyingTimer/5)*(1/this.flyingTimer*200));
  }
};

Animal.prototype.uncage = function() {
  this.caged = false;
};

Animal.prototype.startWalking = function() {
  this.motX = game.rnd.integerInRange(1,2);
  this.motY = game.rnd.integerInRange(1,2);
};

Animal.prototype.stopWalking = function() {
  this.motX = 0;
  this.motY = 0;
};


/***************************************
**********ANIMAL VARIATIONS*************
***************************************/

function HornsSolidQuad(x, y) {
  Animal.call(this, x, y, 'horns-solid-quad');
  this.setAttributes('horns', 'solid', 'quad');
  this.hb = new Phaser.Rectangle(this.x-22, this.y+4, 50, 30);
  this.hb.offsetX = -22;
  this.hb.offsetY = 4;
}
HornsSolidQuad.prototype = Object.create(Animal.prototype);

function AntSolidQuad(x, y) {
  Animal.call(this, x, y, 'ant-solid-quad');
  this.setAttributes('ant', 'solid', 'quad');
  this.hb = new Phaser.Rectangle(this.x-15, this.y+7, 33, 25);
  this.hb.offsetX = -15;
  this.hb.offsetY = 7;
}
AntSolidQuad.prototype = Object.create(Animal.prototype);

function HornsStripesQuad(x, y) {
  Animal.call(this, x, y, 'horns-stripes-quad');
  this.setAttributes('horns', 'stripes', 'quad');
  this.hb = new Phaser.Rectangle(this.x-18, this.y+14, 45, 18);
  this.hb.offsetX = -18;
  this.hb.offsetY = 14;
}
HornsStripesQuad.prototype = Object.create(Animal.prototype);

function AntStripesQuad(x, y) {
  Animal.call(this, x, y, 'ant-stripes-quad');
  this.setAttributes('ant', 'stripes', 'quad');
  this.hb = new Phaser.Rectangle(this.x-18, this.y+14, 45, 18);
  this.hb.offsetX = -18;
  this.hb.offsetY = 14;
}
AntStripesQuad.prototype = Object.create(Animal.prototype);

function HornsSolidBiped(x, y) {
  Animal.call(this, x, y, 'horns-solid-biped');
  this.setAttributes('horns', 'solid', 'biped');
  this.hb = new Phaser.Rectangle(this.x-12, this.y+4, 25, 30);
  this.hb.offsetX = -12;
  this.hb.offsetY = 4;
}
HornsSolidBiped.prototype = Object.create(Animal.prototype);

function AntSolidBiped(x, y) {
  Animal.call(this, x, y, 'ant-solid-biped');
  this.setAttributes('ant', 'solid', 'biped');
  this.hb = new Phaser.Rectangle(this.x-12, this.y+4, 25, 30);
  this.hb.offsetX = -12;
  this.hb.offsetY = 4;
}
AntSolidBiped.prototype = Object.create(Animal.prototype);

function HornsStripesBiped(x, y) {
  Animal.call(this, x, y, 'horns-stripes-biped');
  this.setAttributes('horns', 'stripes', 'biped');
  this.hb = new Phaser.Rectangle(this.x-12, this.y+4, 25, 30);
  this.hb.offsetX = -12;
  this.hb.offsetY = 4;
}
HornsStripesBiped.prototype = Object.create(Animal.prototype);

function AntStripesBiped(x, y) {
  Animal.call(this, x, y, 'ant-stripes-biped');
  this.setAttributes('ant', 'stripes', 'biped');
  this.hb = new Phaser.Rectangle(this.x-12, this.y+4, 25, 30);
  this.hb.offsetX = -12;
  this.hb.offsetY = 4;
}
AntStripesBiped.prototype = Object.create(Animal.prototype);
