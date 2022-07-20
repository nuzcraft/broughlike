const game = require("../js/game");

// getSpritesheet
test("getSpritesheet: spritesheet index 0 returns spritesheet_creatures", () => {
  expect(game.getSpritesheet(0)).toBe("spritesheet_creatures");
});

test("getSpritesheet: spritesheet index 0 with defined spritesheet_creatures variable returns the variable", () => {
  spritesheet_creatures = "fake_name";
  expect(game.getSpritesheet(0)).toBe("fake_name");
});

test("getSpritesheet: spritesheet index 1 returns spritesheet_world", () => {
  expect(game.getSpritesheet(1)).toBe("spritesheet_world");
});

test("getSpritesheet: spritesheet index 1 with defined spritesheet_creatures variable returns the variable", () => {
  spritesheet_world = "fake_name_again";
  expect(game.getSpritesheet(1)).toBe("fake_name_again");
});

test("getSpritesheet: spritesheet with unmapped index returns undefined spritesheet", () => {
  expect(game.getSpritesheet(-2)).toBe("undefined spritesheet");
});

//getSpritesheetInfo
test("getSpritesheetInfo: spritesheet index 0 returns values consistent with the creatures spritesheet", () => {
  let [x_offset, y_offset, x_default, y_default, num_columns, num_tiles] =
    game.getSpritesheetInfo(0);

  expect(x_offset).toBe(24);
  expect(y_offset).toBe(24);
  expect(x_default).toBe(36);
  expect(y_default).toBe(36);
  expect(num_columns).toBe(18);
  expect(num_tiles).toBe(401);
});

test("getSpritesheetInfo: spritesheet index 1 returns values consistent with the world spritesheet", () => {
  let [x_offset, y_offset, x_default, y_default, num_columns, num_tiles] =
    game.getSpritesheetInfo(1);

  expect(x_offset).toBe(24);
  expect(y_offset).toBe(24);
  expect(x_default).toBe(36);
  expect(y_default).toBe(36);
  expect(num_columns).toBe(56);
  expect(num_tiles).toBe(2240);
});

test("getSpritesheetInfo: spritesheet with unmapped index returns values consistent with the creatures spritesheet", () => {
  let [x_offset, y_offset, x_default, y_default, num_columns, num_tiles] =
    game.getSpritesheetInfo(-2);

  expect(x_offset).toBe(24);
  expect(y_offset).toBe(24);
  expect(x_default).toBe(36);
  expect(y_default).toBe(36);
  expect(num_columns).toBe(18);
  expect(num_tiles).toBe(401);
});

// getSpriteLocation
test("getSpriteLocation: sprite 0 in the creatures spritesheet is at 24x24 (row 1,column 1)", () => {
  expect(game.getSpriteLocation(0, 0)).toStrictEqual([24, 24]);
});

test("getSpriteLocation: sprite 1 in the creatues spritesheet is at 48x24 (row 1,column 2)", () => {
  expect(game.getSpriteLocation(1, 0)).toStrictEqual([48, 24]);
});

test("getSpriteLocation: sprite 401 in the creatures spritesheet is at 144x552 (row 23,column 6)", () => {
  expect(game.getSpriteLocation(401, 0)).toStrictEqual([144, 552]);
});

test("getSpriteLocation: sprite 102 in the creatures spritesheet is at 312x144 (row 6, column 13)", () => {
  expect(game.getSpriteLocation(102, 0)).toStrictEqual([312, 144]);
});

test("getSpriteLocation: sprite 233 in the creatures spritesheet is at 432x312 (row 12, column 17) ", () => {
  expect(game.getSpriteLocation(233, 0)).toStrictEqual([432, 312]);
});

test("getSpriteLocation: sprite -1 in the creatures spritesheet defaults to 36x36 (row 1.5, column 1.5)", () => {
  expect(game.getSpriteLocation(-1, 0)).toStrictEqual([36, 36]);
});

test("getSpriteLocation: sprite 425 in the creatures spritesheet defaults to 36x36 (row 1.5, column 1.5)", () => {
  expect(game.getSpriteLocation(425, 0)).toStrictEqual([36, 36]);
});
