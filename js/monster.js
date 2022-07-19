const vars_req = require("../js/vars");

class Monster {
  constructor(tile, sprite_index, hp) {
    this.move(tile);
    this.sprite_index = sprite_index;
    this.spritesheet_index = vars_req.sprsht_idx_items;
    this.hp = hp;
  }

  draw() {
    drawSprite(
      this.sprite_index,
      this.spritesheet_index,
      this.tile.x,
      this.tile.y
    );
  }

  tryMove(dx, dy) {
    let newTile = this.tile.getNeighbor(dx, dy);
    if (newTile.passable) {
      if (!newTile.monster) {
        this.move(newTile);
      }
      return true;
    }
  }

  move(tile) {
    if (this.tile) {
      this.tile.monster = null;
    }
    this.tile = tile;
    tile.monster = this;
  }
}

class Player extends Monster {
  constructor(tile) {
    super(tile, vars_req.spr_idx_knight, 3);
    this.isPlayer = true;
  }
}
