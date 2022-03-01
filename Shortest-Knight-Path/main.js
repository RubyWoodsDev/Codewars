//DESCRIPTION:
//Given two different positions on a chess board, find the least number of moves it would take a knight to get from one to the other. The positions will be passed as two arguments in algebraic notation. For example, knight("a3", "b5") should return 1.

//The knight is not allowed to move off the board. The board is 8x8.

//For information on knight moves, see https://en.wikipedia.org/wiki/Knight_%28chess%29

//For information on algebraic notation, see https://en.wikipedia.org/wiki/Algebraic_notation_%28chess%29

//(Warning: many of the tests were generated randomly. If any do not work, the test cases will return the input, output, and expected output; please post them.)




solution

function knight(start, finish) {
    // Ha-ha, it's not "knight", it's a horse :D
  }
  Object.defineProperty( Set.prototype, "reduce", { value: function reduce(fn,z) { for ( const v of this ) z = fn(z,v); return z; } } );
  function knight(start,finish) {
    const fromXY = (x,y) => " abcdefgh"[x] + String(y) ;
    const toXY = ([x,y]) => [ " abcdefgh".indexOf(x), Number(y) ] ;
    const onBoard = ([x,y]) => x>=1 && x<=8 && y>=1 && y<=8 ;
    const moves = (x,y) => [ [x+1,y-2], [x+1,y+2], [x+2,y-1], [x+2,y+1], [x-1,y-2], [x-1,y+2], [x-2,y-1], [x-2,y+1] ].filter(onBoard) ;
    const allMoves = positions => positions.reduce( (set,pos) => moves(...toXY(pos)).reduce( (set,[x,y]) => set.add(fromXY(x,y)) , set ) , new Set ) ;
    return function move(positions,m) { return positions.has(finish) ? m : move( allMoves(positions), m+1 ) ; } ( new Set([start]), 0 ) ;
  }