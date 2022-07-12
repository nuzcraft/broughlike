function setupCanvas() {
  canvas = document.querySelector("canvas");
  ctx = canvas.getContext("2d");

  canvas.width = tileSize * (numTiles + uiWidth);
  canvas.height = tileSize * numTiles;
  canvas.style.width = canvas.width + "px";
  canvas.style.height = canvas.height + "px";
  ctx.imageSmoothingEnabled = false;
}

function drawSprite(sprite, spritesheet, x, y) {
  let [x_loc, y_loc] = getSpriteLocation(sprite, spritesheet);
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

  drawSprite(spr_idx_knight, spritesheet_creatures, x, y);
}

/**
 *
 * @param {number} sprite the index of the sprite in the spritesheet
 * this function assumes the oryx_16bit_fantasy_creatures_trans.png spritesheet
 */
function getSpriteLocation(sprite, spritesheet) {
  let [
    x_offset,
    y_offset,
    x_default,
    y_default,
    num_columns,
    tile_width,
    num_tiles,
  ] = getSpritesheetInfo(spritesheet);

  // if the sprite is outside the appropriate bounds,
  // return a default midpoint of a sprite and will render really odd
  if (sprite < 0 || sprite > num_tiles) {
    return [x_default, y_default];
  }

  let x_loc = (sprite % num_columns) * tile_width;
  let y_loc = Math.floor(sprite / num_columns) * tile_width;

  return [x_loc + x_offset, y_loc + y_offset];
}
exports.getSpriteLocation = getSpriteLocation;

function getSpritesheetInfo(spritesheet) {
  let x_offset = 24;
  let y_offset = 24;
  let x_default = 36;
  let y_default = 36;
  let num_columns = 18;
  let tile_width = 24;
  let num_tiles = 401;
  if (spritesheet == spritesheet_creatures) {
    // change nothing
  } else if (spritesheet == spritesheet_world) {
    num_columns = 56;
    num_tiles = 2240;
  } else {
    // change nothing
  }
  return [
    x_offset,
    y_offset,
    x_default,
    y_default,
    num_columns,
    tile_width,
    num_tiles,
  ];
}
