const map = require("../js/map");
const tile = require("../js/tile");

// inBounds
test("inBounds: input within the bounds returns true", () => {
  numTiles = 5; // represents the square dimensions of the map/bounds
  expect(map.inBounds(1, 2)).toBe(true);
});

test("inBounds: input on the bounds returns false (y version)", () => {
  numTiles = 5; // represents the square dimensions of the map/bounds
  expect(map.inBounds(1, 5)).toBe(false);
});

test("inBounds: input on the bounds returns false (x version)", () => {
  numTiles = 5; // represents the square dimensions of the map/bounds
  expect(map.inBounds(5, 2)).toBe(false);
});

test("inBounds: input out of bounds returns false", () => {
  numTiles = 5; // represents the square dimensions of the map/bounds
  expect(map.inBounds(7, 8)).toBe(false);
});

function generateTilesAllFloor() {
  tiles = [];
  for (let i = 0; i < numTiles; i++) {
    tiles[i] = [];
    for (let j = 0; j < numTiles; j++) {
      tiles[i][j] = new tile.Floor(i, j);
    }
  }
}

// getTile
test("getTile: inBounds tile returns the contents of the tile object", () => {
  numTiles = 5;
  generateTilesAllFloor();
  expect(map.getTile(2, 3)).toBeInstanceOf(tile.Floor);
});

test("getTile: on bounds tile returns a wall object (x direction)", () => {
  numTiles = 5;
  generateTilesAllFloor();
  expect(map.getTile(5, 3)).toBeInstanceOf(tile.Wall);
});

test("getTile: on bounds tile returns a wall object (y direction)", () => {
  numTiles = 5;
  generateTilesAllFloor();
  expect(map.getTile(2, 5)).toBeInstanceOf(tile.Wall);
});

test("getTile: out of bounds tile returns a wall object", () => {
  numTiles = 5;
  generateTilesAllFloor();
  expect(map.getTile(7, 8)).toBeInstanceOf(tile.Wall);
});
