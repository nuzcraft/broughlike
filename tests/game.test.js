const game = require("../js/game");
const vars = require("../js/vars");

/***
 * getSpriteLocation
 */
test("sprite 0 is at 24x24 (row 1,column 1)", () => {
  expect(game.getSpriteLocation(0, vars.spritesheet_creatures)).toStrictEqual([
    24, 24,
  ]);
});

test("sprite 1 is at 48x24 (row 1,column 2)", () => {
  expect(game.getSpriteLocation(1)).toStrictEqual([48, 24]);
});

test("sprite 401 is at 144x552 (row 23,column 6)", () => {
  expect(game.getSpriteLocation(401)).toStrictEqual([144, 552]);
});

test("sprite 102 is at 312x144 (row 6, column 13)", () => {
  expect(game.getSpriteLocation(102)).toStrictEqual([312, 144]);
});

test("sprite 233 is at 432x312 (row 12, column 17) ", () => {
  expect(game.getSpriteLocation(233)).toStrictEqual([432, 312]);
});

test("sprite -1 defaults to 36x36 (row 1.5, column 1.5)", () => {
  expect(game.getSpriteLocation(-1)).toStrictEqual([36, 36]);
});

test("sprite 425 defaults to 36x36 (row 1.5, column 1.5)", () => {
  expect(game.getSpriteLocation(425)).toStrictEqual([36, 36]);
});
