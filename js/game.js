function setupCanvas() {
  canvas = document.querySelector("canvas");
  ctx = canvas.getContext("2d");

  canvas.width = tileSize * (numTiles + uiWidth);
  canvas.height = tileSize * numTiles;
  canvas.style.width = canvas.width + "px";
  canvas.style.height = canvas.height + "px";
  ctx.imageSmoothingEnabled = false;
}

function drawSprite(sprite_index, spritesheet_index, x, y) {
  let spritesheet = getSpritesheet(spritesheet_index);
  let [x_loc, y_loc] = getSpriteLocation(
    sprite_index,
    spritesheet_index
  );
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

  drawSprite(spr_idx_knight, sprsht_idx_creatures, x, y);
}

/**
 * Get the spritesheet, handling undefined instances
 * @param {number} spritesheet_index 
 * @returns spritesheet Image() or string if there is no image
 */
function getSpritesheet(spritesheet_index) {
  if (spritesheet_index == 0){
    // creatures spritesheet
    if (typeof spritesheet_creatures === "undefined"){
      return "spritesheet_creatures"
    } else {
      return spritesheet_creatures
    }
  } else if (spritesheet_index == 1) {
    // world spritesheet
    if (typeof spritesheet_world === "undefined"){
      return "spritesheet_world"
    } else {
      return spritesheet_world
    }
  } else {
    return "undefined spritesheet"
  }
}
try {
  exports.getSpritesheet = getSpritesheet
} catch (e) {
  // do nothing :)
}

function getSpriteLocation(sprite_index, spritesheet_index) {
  let [
    x_offset,
    y_offset,
    x_default,
    y_default,
    num_columns,
    tile_width,
    num_tiles,
  ] = getSpritesheetInfo(spritesheet_index);

  // if the sprite is outside the appropriate bounds,
  // return a default midpoint of a sprite and will render really odd
  if (sprite_index < 0 || sprite_index > num_tiles) {
    return [x_default, y_default];
  }

  let x_loc = (sprite_index % num_columns) * tile_width;
  let y_loc = Math.floor(sprite_index / num_columns) * tile_width;

  return [x_loc + x_offset, y_loc + y_offset];
}
// exports.getSpriteLocation = getSpriteLocation;

function getSpritesheetInfo(spritesheet_index) {
  let x_offset = 24;
  let y_offset = 24;
  let x_default = 36;
  let y_default = 36;
  let num_columns = 18;
  let tile_width = 24;
  let num_tiles = 401;
  if (spritesheet_index == 0) {
    // change nothing
  } else if (spritesheet_index == 1) {
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
try {
  exports.getSpritesheetInfo = getSpritesheetInfo;
} catch (e) {
  // do nothing :)
}
