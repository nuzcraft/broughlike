function setupCanvas() {
  canvas = document.querySelector("canvas");
  ctx = canvas.getContext("2d");

  canvas.width = tileSize * (numTiles + uiWidth);
  canvas.height = tileSize * numTiles;
  canvas.style.width = canvas.width + "px";
  canvas.style.height = canvas.height + "px";
  ctx.imageSmoothingEnabled = false;
}

function drawSprite(sprite, x, y) {
  [x_loc, y_loc] = getSpriteLocation(sprite);
  ctx.drawImage(
    spritesheet,
    x_loc,
    y_loc,
    16,
    16,
    x * tileSize,
    y * tileSize,
    tileSize,
    tileSize
  );
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSprite(0, x, y);
}

function sum(a, b) {
  return a + b;
}
module.exports = sum;

/**
 *
 * @param {number} sprite the index of the sprite in the spritesheet
 * this function assumes the oryx_16bit_fantasy_creatures_trans.png spritesheet
 */
function getSpriteLocation(sprite) {
  // there is a 24x24 blank border before sprites actually start
  x_offset = 24;
  y_offset = 24;

  x_loc = sprite / 18;
  y_loc = sprite / 18;

  return [x_loc + x_offset, y_loc + y_offset];
}
module.exports = getSpriteLocation;
