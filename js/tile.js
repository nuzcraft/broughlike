class Tile {
  constructor(x, y, sprite, passable) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.passable = passable;
  }

  draw() {
    drawSprite(this.sprite, sprsht_idx_world, this.x, this.y);
  }
}

class Floor extends Tile {
  constructor(x, y) {
    super(x, y, spr_idx_floor, true);
  }
}

class Wall extends Tile {
  constructor(x, y) {
    super(x, y, spr_idx_wall_pitted, false);
  }
}
