const tileSize = 64;
const numTiles = 9;
const uiWidth = 4;
x = y = 0;
if (typeof spritesheet_creatures === "undefined") {
    spritesheet_creatures = "spritesheet_creatures";
  }
const sprsht_idx_creatures = 0;
const spr_idx_knight = 0;

if (typeof spritesheet_world === "undefined") {
    spritesheet_world = "spritesheet_creatures";
  }
const sprsht_idx_world = 1;
const spr_idx_floor = 5;
const spr_idx_wall_pitted = 56;