//DESCRIPTION:
//Play game Series #8: Three Dots
//Welcome
//In this kata, we'll playing with three dots.

//Task
//You are given a gamemap, like this:

//+------------+
//|RGY         | +,-,| --> The boundary of game map
//|            | *     --> The obstacle
//|     **     | R,G,Y --> Three Dots with different color(red,green,//yellow)
//|     **     | r,g,y --> The target position of three dots
//|            |           You should move R to r, G to g and Y to y
//|         rgy|
//+------------+
//In the testcase, it displayed like this:



//Your task is calculate a path to move three dots from the initail position to the target position. The result should be a string. Use ↑↓←→ representing four directions(up,down,left and right).

//Moving Rules
//When the move command(↑↓←→) is executed, the three dots move in the same direction at the same time unless the boundary or barrier is in front of them.
//Only the dot blocked by the obstacle will stop moving, and the dots that does not encounter obstacles will continue to move.
//Like the example above, you can return a path like this:

//"→→→→→→→→→↓↓↓↓↓"
//After move right x 9:



//After move down x 4:


//So easy! right? ;-) Please write a nice solution to solve this kata. I'm waiting for you, code warrior ^_^

//Note
//You can assume that all test cases have at least one possible solution. Of course, usually it has many solutions, and you just need to return one of them.
//Somethimes, the obstacle/boundary may be your enemy or your friend ;-)
//Examples
//Let's see some harder examples:

//For gameMap = 

//+------------+
//|R           |
//|G           |
//|Y    **     |
//|     **    r|
//|           g|
//|           y|
//+------------+
//The output can be "→→→→→←↓↓↓↓→→→↑↑→→→→→↓"

//Let's see the moving step by step:

//initial game map:


//First we move three dots to the right: →→→→, after move right x 4:


//Then, continue the moving: →


//Now, we can see: Y was stoped, but R and G move to right.

//Hmm.. we should move to left 1 step: ←


//Then moving the dots downward: ↓↓↓


//Hmm.. Not enough. Continue to move downward: ↓


//Now dots can finally move to the right: →→→

//Hey! Wait, Their shape is incorrect:


//So we need some extra steps: ↑↑


//Now we can move to the right again ;-) →→→→


//r is covered by G, then →


//r is covered by G, g is covered by Y, then ↓


//r is covered by R, g is covered by G and y is covered by Y. You win the game ;-)

//For gameMap = 

//+------------+
//|R           |
//|G    **     |
//|Y    **     |
//|            |
//|     **    r|
//|     **    g|
//|           y|
//+------------+
//The output can be "→→→→↓→↓→↓→↓→↓→→→→→↓"

//initial game map:


//→→→→


//↓


//→


//↓


//→


//↓


//→


//↓


//→


//↓


//→→→→→


//↓


//Recommand
//You can submit the example solution(preloaded in the initail code) to see how it works 

solution

var ii=0
function threeDots(gameMap){
  //Coding like playing game
  var exampleSolution=[
  "→→→→→→→→→↓↓↓↓↓",  //an example solution for basic test-1
  "→→→→→←↓↓↓↓→→→↑↑→→→→→↓",  //an example solution for basic test-2
  "→→→→↓→↓→↓→↓→↓→→→→→↓",  //an example solution for basic test-3
  "↓↓→→→→→→↓→→→→→→→↓",  //an example solution for basic test-4
  "↓↓→→→→→→→→↑←↓↓↓↓↓↓↑←←↓→→→→→→"  //an example solution for basic test-5
  ]
  return exampleSolution[ii++]||"If you've understood the rule, please write your own solution"
}
function arreq(u, v) {
    for (const i in u)
        if (u[i] !== v[i]) return false;
    return true; 
}


function threeDots(gameMap) {

    gameMap = gameMap.split("\n");
    const width = gameMap[0].length - 2;
    const height = gameMap.length - 2;
    const walls = new Set();
    const start = [null, null, null];   // red, green, yellow
    const goal = [null, null, null];    // red, green, yellow

    for (const [y, line] of gameMap.slice(1, -1).entries()) {
        for (const [x, char] of line.split('').slice(1, -1).entries()) {
            if      (char === "*") walls.add([x, y].toString());
            else if (char === "R") start[0] = [x, y];
            else if (char === 'G') start[1] = [x, y];
            else if (char === 'Y') start[2] = [x, y];
            else if (char === 'r') goal[0] = [x, y];
            else if (char === 'g') goal[1] = [x, y];
            else if (char === 'y') goal[2] = [x, y];
        }
    }


    const transMove = {'→' : [1, 0], '↓' : [0, 1], '←' : [-1, 0], '↑' : [0, -1]};
    function move(pos, dir) {
        let [dx, dy] = transMove[dir];
        let done = [];
        let newpos = [...pos];

        let cmp = (a, b) => dx * b[1][0] + dy * b[1][1] - (dx * a[1][0] + dy * a[1][1]);
        for (const [i, [x, y]] of Array.from(newpos.entries()).sort(cmp)) {
            done.push(i);

            let inOtherDot = false;
            for (const j of [0, 1, 2])
                if (j !== i && done.includes(j) && arreq([x+dx, y+dy], newpos[j]))     // dont go into other dots
                    {inOtherDot = true; break;}
            if (inOtherDot) continue;

            if (!(0 <= x+dx && x+dx < width && 0 <= y+dy && y+dy < height))     // dont go outside the map
                continue;

            if (walls.has([x+dx, y+dy].toString())) continue;   // dont go into wall

            newpos[i] = [x+dx, y+dy];
        }

        if (!arreq(pos, newpos)) return newpos;
    }


    function shape(state) {
        let [xr, yr] = state[0];
        let shape = [];
        for (const [x, y] of state.slice(1))
            shape = shape.concat([xr - x, yr - y]);
        return shape;
    }

    const goalShape = shape(goal);
    function deltaShape(pos) {
        posShape = shape(pos);
        let sum = 0;
        for (const i of [0, 1, 2, 3])
            sum += Math.abs(goalShape[i] - posShape[i]);
        return sum;
    }
  
    function deltaPos(pos) {
        let sum = 0;
        for (const i of [0, 1, 2])
            sum += Math.abs(pos[i][0] - goal[i][0]) + Math.abs(pos[i][1] - goal[i][1]);
        return sum;
    }


    function posEq(p1, p2) {
        for (const i of [0, 1, 2])
            if (!arreq(p1[i], p2[i])) return false;
        return true;
    }

    
    const seen = new Set();
    function dfs(pos, path) {
        seen.add(pos.toString());
        if (posEq(pos, goal)) return path;

        let moves = [];
        for (const d of ['→', '↓', '←', '↑']) {
            let newpos = move(pos, d);
            if (newpos == undefined) continue;
            if (seen.has(newpos.toString())) continue;
            moves.push([d, newpos]);
        }

        moves.sort((a, b) => {
            let [sa, sb] = [deltaShape(a[1]), deltaShape(b[1])];
            if (sa !== sb) return sa - sb;
            return deltaPos(a[1]) - deltaPos(b[1]);
        })
        for (const [d, newpos] of moves) {
            let newPath = path.concat([d]);
            let res = dfs(newpos, newPath);
            if (res != undefined) return res;
        }
    }

    
    return dfs(start, []).join('');
}