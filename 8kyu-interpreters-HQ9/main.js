//DESCRIPTION:
//You task is to implement an simple interpreter for the notorious esoteric language HQ9+ that will work for a single character input:

//If the input is 'H', return 'Hello World!'
//If the input is 'Q', return the input
//If the input is '9', return the full lyrics of 99 Bottles of Beer. It should be formatted like this:
//99 bottles of beer on the wall, 99 bottles of beer.
//Take one down and pass it around, 98 bottles of beer on the wall.
//98 bottles of beer on the wall, 98 bottles of beer.
//Take one down and pass it around, 97 bottles of beer on the wall.
//97 bottles of beer on the wall, 97 bottles of beer.
//Take one down and pass it around, 96 bottles of beer on the wall.
//...
//...
//...
//2 bottles of beer on the wall, 2 bottles of beer.
//Take one down and pass it around, 1 bottle of beer on the wall.
//1 bottle of beer on the wall, 1 bottle of beer.
//Take one down and pass it around, no more bottles of beer on the wall.
//No more bottles of beer on the wall, no more bottles of beer.
//Go to the store and buy some more, 99 bottles of beer on the wall.
//For everything else, don't return anything (return null in C#, None in Rust).
//(+ has no visible effects so we can safely ignore it.)

solution
function HQ9(code) {
    switch (code) {
      case 'H': return 'Hello World!';
      case 'Q': return code;
      case '9': return beer(99);
      default: return undefined;
    }
  }
  
  function beer(count) {
    if (count === 2) {
      return '2 bottles of beer on the wall, 2 bottles of beer.\n' +
          'Take one down and pass it around, 1 bottle of beer on the wall.\n' +
          '1 bottle of beer on the wall, 1 bottle of beer.\n' +
          'Take one down and pass it around, no more bottles of beer on the wall.\n' +
          'No more bottles of beer on the wall, no more bottles of beer.\n' +
          'Go to the store and buy some more, 99 bottles of beer on the wall.';
    } else {
      return `${count} bottles of beer on the wall, ${count} bottles of beer.\n` +
          `Take one down and pass it around, ${count - 1} bottles of beer on the wall.\n` +
          beer(count - 1);
    }
  }