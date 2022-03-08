//DESCRIPTION:
//When no more interesting kata can be resolved, I just choose to create the new kata, to solve their own, to enjoy the process --myjinxin2015 said

//Task
//We have a rectangular cake with some raisins on it:

//cake = 
//  ........
 // ..o.....
// // ...o....
 // ........
// o is the raisins
//We need to cut the cake evenly into n small rectangular pieces, so that each small cake has 1 raisin. n is not an argument, it is the number of raisins contained inside the cake:

//cake = 
 // ........
 // ..o.....
 // ...o....
 // ........
 
//result should be an array:
  //[
   //  ........
    // ..o.....
 // ,
   //  ...o....
   //  ........
 // ]
// In order to clearly show, we omit the quotes and "\n"
//If there is no solution, return an empty array []

//Note
//The number of raisins is always more than 1 and less than 10.
//If there are multiple solutions, select the one with the largest width of the first element of the array. (See also the examples below.)
//Evenly cut into n pieces, meaning the same area. But their shapes can be different. (See also the examples below.)
//In the result array, the order of pieces is from top to bottom and from left to right (according to the location of the upper left corner).
//Each piece of cake should be rectangular.
//Examples
//An example of multiple solutions:
//cake = 
 // .o......
 // ......o.
 // ....o...
 // ..o.....

//In this test case, we can found three solution:
//solution 1 (horizontal cutting):
 // [
    //.o......  //piece 1
  //,
   // ......o.  //piece 2
  //,
   // ....o...  //piece 3
 // ,
  //  ..o.....  //piece 4
 // ]

////solution 2 (vertical cutting):
  //[
  //  .o  //piece 1
 //   ..
   // ..
 //   ..
 // ,
   // ..  //piece 2
  //  ..
  //  ..
  //  o.
 // ,
    //..  //piece 3
  //  ..
  //  o.
  //  ..
  //,
   // ..  //piece 4
   // o.
    //..
   // ..
 // ]
  
//solution 3 (cross cutting):
  //[
  //  .o..  //piece 1
 //   ....
 // ,
 //   ....  //piece 2
    //..o.
  //,
 //   ....  //piece 3
 //   ..o.
  //,
   // o...  //piece 4
  //  ....   
  //]

//we need choose solution 1 as result
//An example of different shapes:
//cake = 
 // .o.o....
 // ........
 // ....o...
  //........
  //.....o..
  //........
//
//the result should be:
 // [
  //  .o      //pieces 1
    //..
  //  ..
  //  ..
  //  ..
   // ..
  //,
 // //  .o....  //pieces 2
    //......
  //,
   // ..o...  //pieces 3
    //......
  //,//
   // ...o..  //pieces 4
   // ......   
  //]
//Although they have different shapes, 
//they have the same area(2 x 6 = 12 and 6 x 2 = 12).
//An example of no solution case:
//cake = 
 // .o.o....
  //.o.o....
  //........
  //........
  //........
  //........
//the result should be []
//Kata may contains bug, please help me to test it, thanks ;-)



solution
function cut(cake){
    //coding and coding..
    
    
  }
  // Stringify a piece of cake
  function stringify(cake) {
    return cake.map(e => e.join('')).join('\n')
  }
  
  // Check if this cut is a valid slice
  function isAValidSlice(cake, x, y, width, height) {
    // Is not valid if we exceed in width or height
    if ((x + width) > cake[0].length) return false;
    if ((y + height) > cake.length) return false;
  
    console.log('Trying with', x, y, width, height);
    
    // Do a real slice and convert it to a string
    const slice = cake.slice(y, y + height).map(e => e.slice(x, x + width));
    const slice_str = stringify(slice);  
    console.log('The slice is ');
    console.log(slice_str);
    
    // If this string has X, we cutted an already cutted cake
    if (slice_str.match(/x/)) {
      console.log('Already cut');
      return false;
    }
    
    // If this string has exactly one O, then this is valid slice!
    const numberOfO = (slice_str.match(/o/g) || []).length;
    if (numberOfO != 1) {
      console.log('Invalid', numberOfO);
      return false;
    }
    
    // And return this slice to append to the list of slices
    return slice_str;
  }
  
  // Do a cut by inserting X when cake is cutted
  function doCut(cake, x, y, width, height) {
    console.log('Cutting', x, y, width, height);
    for (let i = y; i < (y + height); i++) {
      for (let j = x; j < (x + width); j++) {
        cake[i][j] = 'x';
      }
    }
    return cake;
  }
  
  // Simply find a top left corner where cake is not cutted
  function findFirstTopLeftCorner(cake) {
    for (let i = 0; i < cake.length; i++) {
      for (let j = 0; j < cake[i].length; j++) {
        if (cake[i][j] !== 'x') {
          return [i,j];
        }
      }
    }
  }
  
  function run(cake, size, slices) {
    console.log('RUN', slices);
    console.log(stringify(cake));
    
    // First of all, find a top-left corner
    const corner = findFirstTopLeftCorner(cake);
    console.log('Corner', corner);
    // If a corner is not found, the cake is cutted completely
    if (null == corner) return slices;
    
    let x = corner[1];
    let y = corner[0];
    
    // Otherwise, cycle over all possibile combination of how we can write SIZE = WIDTH * HEIGHT,
    // but start when Width is the maximum value (for the rules of the Kata)
    for (let width = size; width >= 1; width--) {
      for (let height = 1; height <= size; height++) {
        if ((height * width) !== size) continue;
    
        // If this is not valid slice, interrupt this cycle
        const slice = isAValidSlice(cake, x, y, width, height);
        if (!slice) continue;
    
        // Instead if a valid slice append to the slices
        const newSlices = Object.assign([], slices);
        newSlices.push(slice);
        
        // And cut the cake (before making a copy)
        let newCake = doCut(JSON.parse(JSON.stringify(cake)), x, y, width, height);
        
        // And run the algorithm again
        let r = run(newCake, size, newSlices);
        
        // If the result slice are not empty, we found a result
        if (r.length) {
          console.log('Found', r);
          return r;
        }
      }
    }
    
    // Otherwise, there's no way to solve this problem bro.
    console.log('Not found');
    return [];
  }
  
  function cut(cake) {
    // How many O
    const num = cake.match(/o/g).length;  
    // Convert to array
    const cake_array = cake.split('\n').map(e => e.split(''));
    
    // Calculate rows and cols
    const rows = cake_array.length;
    const cols = cake_array[0].length;
    // And then determine the size
    const size = (rows * cols) / num;
    
    // And run the algorithm
    return run(cake_array, size, []);
  }