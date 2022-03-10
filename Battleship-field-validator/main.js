//DESCRIPTION:
//Write a method that takes a field for well-known board game "Battleship" as an argument and returns true if it has a valid disposition of ships, false otherwise. Argument is guaranteed to be 10*10 two-dimension array. Elements in the array are numbers, 0 if the cell is free and 1 if occupied by ship.

//Battleship (also Battleships or Sea Battle) is a guessing game for two players. Each player has a 10x10 grid containing several "ships" and objective is to destroy enemy's forces by targetting individual cells on his field. The ship occupies one or more cells in the grid. Size and number of ships may differ from version to version. In this kata we will use Soviet/Russian version of the game.


//Before the game begins, players set up the board and place the ships accordingly to the following rules:
//There must be single battleship (size of 4 cells), 2 cruisers (size 3), 3 destroyers (size 2) and 4 submarines (size 1). Any additional ships are not allowed, as well as missing ships.
//Each ship must be a straight line, except for submarines, which are just single cell.

//The ship cannot overlap or be in contact with any other ship, neither by edge nor by corner.

//This is all you need to solve this kata. If you're interested in more information about the game, visit this link.



solution
function validateBattlefield(field) {
    // write your magic here
  }
  function validateBattlefield(field) {
    let ships = {
      battleship: {
        allowed: 1
      },
      crusiers: {
        allowed: 2
      },
      destroyers: {
        allowed: 3
      },
      subs: {
        allowed: 4
      }
    };
  
    const getShape = (x, y) => {
      let shape = [{ x, y }];
  
      if (field[y + 1][x]) {
        while (field[shape[shape.length - 1].y + 1][x] === 1) {
          field[shape[shape.length - 1].y + 1][x] = 0;
          shape.push({ y: shape[shape.length - 1].y + 1, x });
        }
      } else if (field[y][x + 1]) {
        while (field[y][shape[shape.length - 1].x + 1] === 1) {
          field[y][shape[shape.length - 1].x + 1] = 0;
          shape.push({ y, x: shape[shape.length - 1].x + 1 });
        }
      }
  
      return shape;
    };
  
    const touch = (a, b) => {
      if (a === b) return false;
  
      return a.some(({ x: ax, y: ay }) =>
        b.some(({ x: bx, y: by }) => {
          for (let y = ay - 1; y <= ay + 1; y++) {
            for (let x = ax - 1; x <= ax + 1; x++) {
              if (x === ax && y === ay) {
                continue;
              }
  
              if (x === bx && y === by) {
                return true;
              }
            }
          }
          return false;
        })
      );
    };
  
    const shapes = [];
    for (let y = 0; y < field.length; y++) {
      for (let x = 0; x < field[y].length; x++) {
        if (field[y][x]) {
          const shape = getShape(x, y);
          shapes.push(shape);
  
          switch (shape.length) {
            case 4:
              ships.battleship.present = ships.battleship.present
                ? ships.battleship.present + 1
                : 1;
              break;
            case 3:
              ships.crusiers.present = ships.crusiers.present
                ? ships.crusiers.present + 1
                : 1;
              break;
            case 2:
              ships.destroyers.present = ships.destroyers.present
                ? ships.destroyers.present + 1
                : 1;
              break;
            case 1:
              ships.subs.present = ships.subs.present
                ? ships.subs.present + 1
                : 1;
              break;
          }
        }
      }
    }
  
    if (shapes.some((shapeA) => shapes.some((shapeB) => touch(shapeA, shapeB))))
      return false;
  
    return Object.values(ships).every(
      ({ present, allowed }) => present === allowed
    );
  }
  console.log(
    validateBattlefield([
      [1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
      [1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ])
  );