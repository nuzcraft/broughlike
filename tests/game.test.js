const game = require("../js/game");

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

/***
 * getSpriteLocation
 */
// test("sprite 0 in the creatures spritesheet is at 24x24 (row 1,column 1)", () => {
//   expect(game.getSpriteLocation(0, 0)).toStrictEqual([
//     "spritesheet_creatures",
//     24,
//     24,
//   ]);
// });

// test("sprite 1 in the creatues spritesheet is at 48x24 (row 1,column 2)", () => {
//   expect(game.getSpriteLocation(1, 0)).toStrictEqual([
//     "spritesheet_creatures",
//     48,
//     24,
//   ]);
// });

// test("sprite 401 in the creatures spritesheet is at 144x552 (row 23,column 6)", () => {
//   expect(game.getSpriteLocation(401, 0)).toStrictEqual([
//     "spritesheet_creatures",
//     144,
//     552,
//   ]);
// });

// test("sprite 102 in the creatures spritesheet is at 312x144 (row 6, column 13)", () => {
//   expect(game.getSpriteLocation(102, 0)).toStrictEqual([
//     "spritesheet_creatures",
//     312,
//     144,
//   ]);
// });

// test("sprite 233 in the creatures spritesheet is at 432x312 (row 12, column 17) ", () => {
//   expect(game.getSpriteLocation(233, 0)).toStrictEqual([
//     "spritesheet_creatures",
//     432,
//     312,
//   ]);
// });

// test("sprite -1 in the creatures spritesheet defaults to 36x36 (row 1.5, column 1.5)", () => {
//   expect(game.getSpriteLocation(-1, 0)).toStrictEqual([
//     "spritesheet_creatures",
//     36,
//     36,
//   ]);
// });

// test("sprite 425 in the creatures spritesheet defaults to 36x36 (row 1.5, column 1.5)", () => {
//   expect(game.getSpriteLocation(425, 0)).toStrictEqual([
//     "spritesheet_creatures",
//     36,
//     36,
//   ]);
// });
