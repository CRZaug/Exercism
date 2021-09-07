/*
  To solve this problem:
  1. Determine if the board is feasible (it has to have a non-zero width/height)
  2. For each blank space (not a mine), determine which spaces exist around it
  3. Count the number of mines that appear in these possible spaces
  4. Use the knowledge of mines and their count to re-create the board

  There's some room for improvement. One idea is to use a dictionary instead 
  of looping through indices in order to re-use information.
*/

/**
 * Return number of mines around a square in minesweeper
 * @param  {Array} input An array of strings forming a minesweeper board 
 * @return {Array}       An array of strings forming a filled-in minesweeper board
 */
export const annotate = (input) => {

  var [width, height] = determineGridDimensions(input);

  if (width == 0 || height == 0) {
    return input; // Not a feasible board
  } else {
    var result = countMinesAndGenerateResult(input, width, height);
    return result;
  }

};

/**
 * Return the width and height of a grid
 * @param  {Array} input An array of strings forming a minesweeper board 
 * @return {Array}       An array containing int of width and height
 */
function determineGridDimensions(input) {

  var height = input.length;
  var width = 0;

  if (height > 0) {
    var width = input[0].length;
  }

  return [width, height]
}

/**
 * Count the number of mines everwhere on the board and return the result
 * @param  {Array}  input An array of strings forming a minesweeper board 
 * @param  {Number} width Integer representing number of horizontal squares
 * @param  {Number} height Integer representing number of horizontal squares
 * @return {Array}         An array of strings forming a filled-in minesweeper board
 */
function countMinesAndGenerateResult(input, width, height) {

  // Initialize array to hold final minesweeper board
  var result = [];

  // Iterate through all non-mine indices, get feasible neighbors, and count mines
  for (var y = 0; y < height; y++) {

    var row = "";

    for (var x = 0; x < width; x++) {
      if (!isMine(input[y][x])) {

        var [xIndices, yIndices] = generateAcceptableIndices(x, y, width, height);
        var count = sumUpLocalMines(input, xIndices, yIndices);

        // Fill result board if there's no mine there (fill with count or space)
        if (count == 0) {
          row += " ";
        } else {
          row += count;
        }

      } else {
        // Fill result board if there's a mine in that space
        row += "*";
      }

    }
    result.push(row);
  }
  return result;
}
/**
 * Get the possible neighbor indices for a particular space. This is constrained by the
 * borders of the board.
 * @param {Number} x       The x index of the square in question
 * @param {Number} y       The y index of the square in question
 * @param {Number} width   The width of the board
 * @param {Number} height  The height of the board 
 * @return {Array}         An array of arrays: contains neighboring x & y indices 
 */
function generateAcceptableIndices(x, y, width, height) {
  var xIndices = [x];
  var yIndices = [y];

  if (x - 1 >= 0) xIndices.push(x - 1);
  if (x + 1 <= width - 1) xIndices.push(x + 1);

  if (y - 1 >= 0) yIndices.push(y - 1);
  if (y + 1 <= height - 1) yIndices.push(y + 1);

  return [xIndices, yIndices]

}
/**
 * Determine if a mine is present
 * @param {String} space A string containing 1 character: the particular space
 * @return {Boolean}     True if the space is a mine, false otherwise 
 */
function isMine(space) {
  return (space == '*') ? true : false;
}

/**
 * Count the mines around a space.
 * @param {Array} input     An array of strings; the minesweeper board
 * @param {Array} xIndices  Array of possible neighbors' x indices
 * @param {Array} yIndices  Array of possible neighbors' y indices
 * @return {Number}         Number of mines around the current space
 */
function sumUpLocalMines(input, xIndices, yIndices) {

  var xyCount = 0;
  for (var i in xIndices) {

    var xi = xIndices[i];

    for (var j in yIndices) {

      var yi = yIndices[j];
      if (isMine(input[yi][xi])) {

        xyCount += 1;
      }
    }
  }
  return xyCount;
}