const vars_req = require("../js/vars");

class Monster {
  constructor(tile, sprite_index, hp) {
    this.move(tile);
    this.sprite_index = sprite_index;
    this.spritesheet_index = vars_req.sprsht_idx_creatures;
    this.hp = hp;
    this.teleportCounter = 2;
  }

  heal(damage){
    this.hp = Math.min(maxHp, this.hp + damage);
  }

  update() {
    this.teleportCounter--;
    if(this.stunned || this.teleportCounter > 0){
      this.stunned = false;
      return;
    }

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
    if(this.teleportCounter > 0){
      drawSprite(
        spr_idx_summoning_circle_blue,
        sprsht_idx_world,
        this.tile.x,
        this.tile.y,
      )
    } else {
      drawSprite(
        this.sprite_index,
        this.spritesheet_index,
        this.tile.x,
        this.tile.y
      );
      this.drawHp();
    }
    
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
      } else {
        if (this.isPlayer != newTile.monster.isPlayer){
          this.attackedThisTurn = true;
          newTile.monster.stunned = true;
          newTile.monster.hit(1);
        }
      }
      return true;
    }
  }

  hit(damage){
    this.hp -= damage;
    if(this.hp <= 0){
      this.die();
    }
  }

  die(){
    this.dead = true;
    this.tile.monster = null;
    this.sprite = 1;
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
    this.teleportCounter = 0;
  }

  tryMove(dx, dy) {
    if (super.tryMove(dx, dy)){
      tick();
    }
  }
}

class Bird extends Monster {
  constructor(tile) {
    super(tile, vars_req.spr_idx_bird_white, 3);
  }
}

class Snake extends Monster {
  constructor(tile) {
    super(tile, vars_req.spr_idx_snake, 1);
  }

  doStuff(){
    this.attackedThisTurn = false;
    super.doStuff();

    if(!this.attackedThisTurn){
      super.doStuff();
    }
  }

}

class Goop extends Monster {
  constructor(tile) {
    super(tile, vars_req.spr_idx_goop_brown, 2);
  }

  update(){
    let startedStunned = this.stunned;
    super.update();
    if(!startedStunned){
      this.stunned = true;
    }
  }
}

class Dragon extends Monster {
  constructor(tile) {
    super(tile, vars_req.spr_idx_dragon_red, 1);
  }

  doStuff(){
    let neighbors = this.tile.getAdjacentNeighbors().filter(t => !t.passable && inBounds(t.x, t.y));
    if(neighbors.length){
      neighbors[0].replace(Floor);
      this.heal(0.5);
    } else {
      super.doStuff();
    }
  }
}

class Turnip extends Monster {
  constructor(tile) {
    super(tile, vars_req.spr_idx_turnip, 2);
  }

  doStuff(){
    let neighbors = this.tile.getAdjacentPassableNeighbors();
    if(neighbors.length){
      this.tryMove(neighbors[0].x - this.tile.x, neighbors[0].y - this.tile.y);
    }
  }
}
