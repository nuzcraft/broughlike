/**
 * pass in a function and it will try it a bunch of times until it
 * succeeds or throws
 * @param {string} description
 * @param {*} callback any function you want to try over and over
 * @returns results of the function or throws an error
 */
function tryTo(description, callback) {
  for (let timeout = 1000; timeout > 0; timeout--) {
    if (callback()) {
      return;
    }
  }
  throw "Timeout while trying to " + description;
}

/**
 * get a random number within a range
 * @param {number} min
 * @param {number} max
 * @returns random integer between the max and min
 */
function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
