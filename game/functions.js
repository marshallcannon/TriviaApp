function checkCollide(hb1, hb2) {

  if (hb1.x < hb2.x + hb2.width &&
   hb1.x + hb1.width > hb2.x &&
   hb1.y < hb2.y + hb2.height &&
   hb1.height + hb1.y > hb2.y) {
    return true;
  }
  else {
    return false;
  }

}

function shakeScreen(magnitude) {

  var randX = game.rnd.integerInRange(1, magnitude);
  var randY = game.rnd.integerInRange(1, magnitude);
  game.world.setBounds(randX, randY, game.width+randX, game.height+randY);

}
