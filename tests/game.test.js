const game = require("../js/game");

test("adds 1+2 to equal 3", () => {
  expect(game.sum(1, 2)).toBe(3);
});


/***
 * getSpriteLocation
 * first sprite
 * last sprite
 * 2 sprites in the middle
 * non-existent sprite
 */
test("sprite 0 is at 24x24", () => {
  expect(game.getSpriteLocation(0)).toStrictEqual([24, 24]);
});
