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
    24,
    24,
    x * tileSize,
    y * tileSize,
    tileSize,
    tileSize
  );
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < numTiles; i++) {
    for (let j = 0; j < numTiles; j++) {
      getTile(i, j).draw();
    }
  }

  drawSprite(0, x, y);
}

/**
 *
 * @param {number} sprite the index of the sprite in the spritesheet
 * this function assumes the oryx_16bit_fantasy_creatures_trans.png spritesheet
 */
function getSpriteLocation(sprite) {
  // there is a 24x24 blank border before sprites actually start
  x_offset = 24;
  y_offset = 24;

  // if the sprite is outside the appropriate bounds, return 36x36
  // this is a midpoint of a sprite and will render really odd
  if (sprite < 0 || sprite > 401) {
    return [36, 36];
  }

  x_loc = (sprite % 18) * 24;
  y_loc = Math.floor(sprite / 18) * 24;

  return [x_loc + x_offset, y_loc + y_offset];
}
exports.getSpriteLocation = getSpriteLocation;
