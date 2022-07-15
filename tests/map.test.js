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

// getTile
test("getTile: inBounds tile returns the contents of the tile object", () => {
    numTiles = 5;
    tiles = [];
    tiles[0] = [];
    tiles[0][0] = new tile.Tile(0, 0);
    expect(map.getTile(0, 0)).toStrictEqual(new tile.Wall(0, 0));
})