

class Monster {
  constructor(tile, sprite_index, hp) {
    this.move(tile);
    this.sprite_index = sprite_index;
    this.spritesheet_index = sprsht_idx_creatures;
    this.hp = hp;
  }

  update() {
    this.doStuff();
  }

  doStuff(){
    let neighbors = this.tile.getAdjacentPassableNeighbors();
    neighbors = neighbors.filter(t=> !t.monster || t.monster.isPlayer);

    if (neighbors.length){
      neighbors.sort((a, b) => a.dist(player.tile) - b.dist(player.tile));
      let newTile = neighbors[0];
      this.tryMove(newTile.x - this.tile.x, newTile.y - this.tile.y);
    }
  }

  draw() {
    drawSprite(
      this.sprite_index,
      this.spritesheet_index,
      this.tile.x,
      this.tile.y
    );
    this.drawHp();
  }

  drawHp(){
    for(let i=0; i<this.hp; i++){
      drawSpriteWithSize(
        spr_idx_heart_full,
        sprsht_idx_items,
        this.tile.x + (i%3)*(5/16),
        this.tile.y + (11/16) - Math.floor(i/3)*(5/16),
        20,
      );
    }
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
    super(tile, spr_idx_knight, 3);
    this.isPlayer = true;
  }

  tryMove(dx, dy) {
    if (super.tryMove(dx, dy)){
      tick();
    }
  }
}

class Bird extends Monster {
  constructor(tile) {
    super(tile, spr_idx_bird_white, 3);
  }
}

class Snake extends Monster {
  constructor(tile) {
    super(tile, spr_idx_snake, 1);
  }
}

class Goop extends Monster {
  constructor(tile) {
    super(tile, spr_idx_goop_brown, 2);
  }
}

class Dragon extends Monster {
  constructor(tile) {
    super(tile, spr_idx_dragon_red, 1);
  }
}

class Turnip extends Monster {
  constructor(tile) {
    super(tile, spr_idx_turnip, 2);
  }
}
