//DESCRIPTION:
//Given a 2D array and a number of generations, compute n timesteps of Conway's Game of Life.

//The rules of the game are:

//Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
//Any live cell with more than three live neighbours dies, as if by overcrowding.
//Any live cell with two or three live neighbours lives on to the next generation.
//Any dead cell with exactly three live neighbours becomes a live cell.
//Each cell's neighborhood is the 8 cells immediately around it (i.e. Moore Neighborhood). The universe is infinite in both the x and y dimensions and all cells are initially dead - except for those specified in the arguments. The return value should be a 2d array cropped around all of the living cells. (If there are no living cells, then return [[]].)

//For illustration purposes, 0 and 1 will be represented as ░░ and ▓▓ blocks respectively (PHP, C: plain black and white squares). You can take advantage of the htmlize function to get a text representation of the universe, e.g.:

//console.log(htmlize(cells));



solution
function getGeneration(cells, generations){

}
function getGeneration(cells, generations){

  var ce = JSON.parse(JSON.stringify(cells));

  var minY;
  var maxY;
  var minX;
  var maxX;

  for (var i = 1; i <= generations; i++) {
    expandUniverse();

    ce = ce.map(function(r, row){return r.map(function(c, col){return setValue(row, col, -c);});});

    getBoundaries();
    shrinkUniverse();
  }

  function setValue(row, col, sum) {
    for (var r = row - 1; r <= row + 1; r++)
      for (var c = col - 1; c <= col + 1; c++)
        sum += (ce[r] && ce[r][c]) | 0;

    return +(sum == 3 || sum == 2 && ce[row][col]);
  }

  function getBoundaries() {
    minY = maxY = minX = maxX = -1;
    
    ce.forEach(function(r, row){r.forEach(function(c, col){
      if (c == 1) {
        minY = minY == -1 ? row : Math.min(minY, row);
        maxY = maxY == -1 ? row : Math.max(maxY, row);
        minX = minX == -1 ? col : Math.min(minX, col);
        maxX = maxX == -1 ? col : Math.max(maxX, col);
      }
    });});
  }

  function expandUniverse() {
    var a = [], b = [];

    ce[0].forEach(function(){a.push(0); b.push(0);});

    ce.unshift(a);
    ce.push(b);
    ce.map(function(i){i.unshift(0); i.push(0);});
  }

  function shrinkUniverse() {
    ce = ce.map(function(e){ return e.slice(minX, maxX + 1);});
    ce = ce.slice(minY, maxY + 1);
  }

  return ce;
}