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
  let [x_loc, y_loc] = getSpriteLocation(sprite_index, spritesheet_index);
  let tile_width = getSpriteSheetTileWidth(spritesheet_index);
  ctx.drawImage(
    spritesheet,
    x_loc,
    y_loc,
    tile_width,
    tile_width,
    x * tileSize,
    y * tileSize,
    tileSize,
    tileSize
  );
}

function drawSpriteWithSize(sprite_index, spritesheet_index, x, y, new_tileSize) {
  let spritesheet = getSpritesheet(spritesheet_index);
  let [x_loc, y_loc] = getSpriteLocation(sprite_index, spritesheet_index);
  let tile_width = getSpriteSheetTileWidth(spritesheet_index);
  ctx.drawImage(
    spritesheet,
    x_loc,
    y_loc,
    tile_width,
    tile_width,
    x * tileSize,
    y * tileSize,
    new_tileSize,
    new_tileSize
  );
}

function draw() {
  if(gameState == "running" || gameState == "dead"){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < numTiles; i++) {
      for (let j = 0; j < numTiles; j++) {
        getTile(i, j).draw();
      }
    }

    for (let i = 0; i < monsters.length; i++) {
      monsters[i].draw();
    }

    player.draw();

    drawText("Level: " + level, 30, false, 40, "white");
    drawText("Score: " + score, 30, false, 70, "white");
  }
}

function tick(){
  for (let k=monsters.length - 1; k>=0; k--){
    if (!monsters[k].dead){
      monsters[k].update();
    } else {
      monsters.splice(k, 1);
    }
  }

  if (player.dead){
    addScore(score, false);
    gameState = "dead";
  }

  spawnCounter--;
  if(spawnCounter <= 0){
    spawnMonster();
    spawnCounter = spawnRate;
    spawnRate --;
  }
}

/**
 * Get the spritesheet, handling undefined instances
 * @param {number} spritesheet_index
 * @returns spritesheet Image() or string if there is no image
 */
function getSpritesheet(spritesheet_index) {
  if (spritesheet_index == 0) {
    // creatures spritesheet
    if (typeof spritesheet_creatures === "undefined") {
      return "spritesheet_creatures";
    } else {
      return spritesheet_creatures;
    }
  } else if (spritesheet_index == 1) {
    // world spritesheet
    if (typeof spritesheet_world === "undefined") {
      return "spritesheet_world";
    } else {
      return spritesheet_world;
    }
  } else if (spritesheet_index == 2) {
    // world spritesheet
    if (typeof spritesheet_items === "undefined") {
      return "spritesheet_items";
    } else {
      return spritesheet_items;
    }
  } else {
    return "undefined spritesheet";
  }
}
try {
  exports.getSpritesheet = getSpritesheet;
} catch (e) {
  // do nothing :)
}

/**
 * Get the location of a sprite on a sheet
 * @param {number} sprite_index
 * @param {number} spritesheet_index
 * @returns x, y location (top left) of the selected sprite on the spritesheet
 */
function getSpriteLocation(sprite_index, spritesheet_index) {
  let [x_offset, y_offset, x_default, y_default, num_columns, num_tiles] =
    getSpritesheetInfo(spritesheet_index);
  let tile_width = getSpriteSheetTileWidth(spritesheet_index);

  // if the sprite is outside the appropriate bounds,
  // return a default midpoint of a sprite and will render really odd
  if (sprite_index < 0 || sprite_index > num_tiles) {
    return [x_default, y_default];
  }

  let x_loc = (sprite_index % num_columns) * tile_width;
  let y_loc = Math.floor(sprite_index / num_columns) * tile_width;

  return [x_loc + x_offset, y_loc + y_offset];
}
try {
  exports.getSpriteLocation = getSpriteLocation;
} catch (e) {
  // do nothing :)
}

/**
 * get information about a spritesheet based on the index (pre-compiled)
 * @param {number} spritesheet_index
 * @returns bounty of info about a spritesheet
 */
function getSpritesheetInfo(spritesheet_index) {
  let x_offset = 24;
  let y_offset = 24;
  let x_default = 36;
  let y_default = 36;
  let num_columns = 18;
  let num_tiles = 401;
  if (spritesheet_index == 0) {
    // creature spritesheet
    // change nothing
  } else if (spritesheet_index == 1) {
    // world spritesheet
    num_columns = 56;
    num_tiles = 2240;
  } else if (spritesheet_index == 2) {
    // items spritesheet
    x_offset = 16;
    y_offset = 16;
    x_default = 24;
    y_default = 24;
    num_columns = 22;
    num_tiles = 168;
  } else {
    // change nothing
  }
  return [x_offset, y_offset, x_default, y_default, num_columns, num_tiles];
}
try {
  exports.getSpritesheetInfo = getSpritesheetInfo;
} catch (e) {
  // do nothing :)
}

function getSpriteSheetTileWidth(spritesheetIndex) {
  let tile_width = 24;
  if (spritesheetIndex == 0) {
    // creatures spritesheet
    // do nothing
  } else if (spritesheetIndex == 1) {
    // world spritesheet
    // do nothing
  } else if (spritesheetIndex == 2) {
    // items spritesheet
    tile_width = 16;
  }
  return tile_width;
}

function showTitle(){
  ctx.fillStyle = 'rgba(0, 0, 0, .75)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  gameState = "title"

  drawText("MONSTER HUNTER", 40, true, canvas.height/2 - 110, "white");
  drawText("WONDERLAND", 70, true, canvas.height / 2 - 50, "white");

  drawScores();
}

function startGame(){
  level = 1;
  score = 0;
  startLevel(startingHp);
  gameState = "running";
}

function startLevel(playerHp){
  spawnRate = 15;
  spawnCounter = spawnRate;

  generateLevel();
  player = new Player(randomPassableTile());
  player.hp = playerHp;

  randomPassableTile().replace(Exit);
}

function drawText(text, size, centered, textY, color){
  ctx.fillStyle = color;
  ctx.font = size + "px monospace";
  let textX;
  if(centered){
    textX = (canvas.width - ctx.measureText(text).width)/2;
  } else {
    textX = canvas.width - uiWidth * tileSize + 25;
  }

  ctx.fillText(text, textX, textY);
}

function getScores(){
  if(localStorage["scores"]){
    return JSON.parse(localStorage["scores"])
  } else {
    return [];
  }
}

function addScore(score, won){
  let scores = getScores();
  let scoreObject = {score: score, run: 1, totalScore: score, active: won};
  let lastScore = scores.pop();

  if(lastScore){
    if(lastScore.active){
      scoreObject.run = lastScore.run + 1;
      scoreObject.totalScore += lastScore.totalScore;
    } else {
      scores.push(lastScore);
    }
  }
  scores.push(scoreObject);

  localStorage["scores"] = JSON.stringify(scores);
}

function drawScores(){
  let scores = getScores();
  if(scores.length){
    drawText(
      rightPad(["RUN", "SCORE", "TOTAL"]),
      18,
      true,
      canvas.height/2,
      "white",
    );

    let newestScore = score.pop();
    scores.sort(function(a, b){
      return b.totalScore - a.totalScore;
    });
    scores.unshift(newestScore);

    for(let i=0;i<Math.min(10,scores.length);i++){
      let scoreText = rightPad([scores[i].run, scores[i].score, scores[i].totalScore]);
      drawText(
        scoreText,
        18,
        true,
        canvas.height/2 + 24+i*24,
        i == 0 ? "aqua":"violet",
      );
    }
  }
}
