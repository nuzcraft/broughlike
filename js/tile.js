const vars_req = require("../js/vars");

class Tile {
  constructor(x, y, sprite, passable) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.passable = passable;
  }

  getNeighbor(dx, dy) {
    return getTile(this.x + dx, this.y + dy);
  }

  getAdjacentNeighbors() {
    return shuffle([
      this.getNeighbor(0, -1),
      this.getNeighbor(0, 1),
      this.getNeighbor(-1, 0),
      this.getNeighbor(1, 0),
    ]);
  }

  getAdjacentPassableNeighbors() {
    return this.getAdjacentNeighbors().filter((t) => t.passable);
  }

  getConnectedTiles() {
    let connectedTiles = [this];
    let frontier = [this];
    while (frontier.length) {
      let neighbors = frontier
        .pop()
        .getAdjacentPassableNeighbors()
        .filter((t) => !connectedTiles.includes(t));
      connectedTiles = connectedTiles.concat(neighbors);
      frontier = frontier.concat(neighbors);
    }
    return connectedTiles;
  }

  draw() {
    drawSprite(this.sprite, vars_req.sprsht_idx_world, this.x, this.y);
  }
}
try {
  exports.Tile = Tile;
} catch (e) {
  // do nothing :)
}

class Floor extends Tile {
  constructor(x, y) {
    super(x, y, vars_req.spr_idx_floor, true);
  }
}
try {
  exports.Floor = Floor;
} catch (e) {
  // do nothing :)
}

class Wall extends Tile {
  constructor(x, y) {
    super(x, y, vars_req.spr_idx_wall_pitted, false);
  }
}
try {
  exports.Wall = Wall;
} catch (e) {
  // do nothing :)
}
