const getSpriteLocation = require("../js/game");
const sum = require("../js/game");

test("adds 1+2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("sprite 0 is at 24x24", () => {
  expect(getSpriteLocation(0)).toBe([24, 24]);
});
