//DESCRIPTION:
//source: imgur.com

//Kata Task
//You are given a grid, which always includes exactly two end-points indicated by X

//You simply need to return true/false if you can detect a one and only one "valid" line joining those points.

//A line can have the following characters :

//- = left / right
//| = up / down
//+ = corner
//Rules for valid lines
//The most basic kind of valid line is when the end-points are already //adjacent
//X
//X
//XX
//The corner character (+) must be used for all corners (but only for corners).
//If you find yourself at a corner then you must turn.
//It must be possible to follow the line with no ambiguity (lookahead of //just one step, and never treading on the same spot twice).
//The line may take any path between the two points.
//Sometimes a line may be valid in one direction but not the other. Such //a line is still considered valid.
//Every line "character" found in the grid must be part of the line. If extras are found then the line is not valid.
//Examples
//Good lines
//X---------X
//X
//|
//|
//X
//   +--------+
//X--+        +--+
//               |
//               X
//   +-------------+
//   |             |
//X--+      X------+    
//   +-------+
//   |      +++---+
//X--+      +-+   X
//Bad lines
//X-----|----X
//X
//|
//+
//X
//   |--------+
//X---        ---+
//               |
//               X
//   +------ 
//   |              
//X--+      X  
//      +------+
//      |      |
//X-----+------+
//      |
//      X
//Hint
//Imagine yourself walking a path where you can only see your very next step. Can you know which step you must take, or not?



function line(grid) {
    // Your code here
    return false;
  }
  function line(grid) {
    let is = (a,b)=>b.includes(a), moves = [[-1,0],[0,1],[1,0],[0,-1]], g  // `g` used for working grid
    
    let trav = ([r,c], dir) => {
      g[r][c] = ' '
      let X = moves.map(([R,C])=>[R+r,C+c])    // Coordinates
      let P = X.map(([R,C])=>g[R]&&g[R][C]||' ').map((d,i)=>d!='-|-|'[i]?d:' '), [U,R,D,L] = P  // Path pieces
      let go = d => trav(X['URDL'.indexOf(d)], d)  // Recurser
      
      switch (grid[r][c]) {
        case 'X': return dir && g.every(w=>w.every(q=>q==' '))     // Made it to the end!
                  || (P.join``.match(/\S/g)||[]).length == 1 && go('URDL'[P.findIndex(l=>l!=' ')])   // Start...
        case '|': return is(dir,'UD') && go(dir)      // Keep moving vertically
        case '-': return is(dir,'RL') && go(dir)      // Keep moving horizontally
        case '+': return is(dir,'RL')
          ? is(U,'|+X') && is(D,'- ') && go('U') || is(D,'|+X') && is(U,'- ') && go('D')  // Turn from horiz or vert
          : is(R,'-+X') && is(L,'| ') && go('R') || is(L,'-+X') && is(R,'| ') && go('L')  // Turn from vert to horiz
      }
      return false  // Dead end
    }
    return grid.some((w,r) => [...w].some((s,c) => s=='X' && (g = grid.map(y=>[...y]), trav([r,c])) ))
  }