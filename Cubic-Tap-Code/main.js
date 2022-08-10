//DESCRIPTION:
//Cubic Tap Code
//This works similarly to Tap Code except instead of being mapped onto a 5x5 square, letters are mapped onto a 3x3x3 cube, left to right, top to bottom, front to back with space being the 27th "letter". Letters are represented by a series of taps (represented as dots .) and pauses (represented by spaces  ), for example A is represented as . . . (first column, first row, first layer) and   is represented as ... ... ... (third column, third row, third layer).

//For reference the three layers of the cube are as follows (underscore represents space):

//1  1  2  3 
//1  A  B  C
//2  D  E  F
//3  G  H  I

//2  1  2  3 
//1  J  K  L
//2  M  N  O
//3  P  Q  R

//3  1  2  3 
//1  S  T  U
//2  V  W  X
//3  Y  Z  _
//Your task (should you choose to accept it)
//Create two functions encode() and decode(), to encode and decode strings to and from cubic tap code.

//Input
//encode() takes a string of uppercase letters and spaces and outputs a string of dots and spaces. decode() takes a string of dots and spaces and outputs a string of uppercase letters and spaces. All inputs will be valid.

//Examples
//encode("N") => ".. .. .."
//encode("TEST") => ".. . ... .. .. . . . ... .. . ..."
//encode("HELLO WORLD") => ".. ... . .. .. . ... . .. ... . .. ... .. .. ... ... ... .. .. ... ... .. .. ... ... .. ... . .. . .. ."

//decode(".. .. ..") => "N"
//decode(".. . ... .. .. . . . ... .. . ...") => "TEST"
//decode(".. ... . .. .. . ... . .. ... . .. ... .. .. ... ... ... .. .. ... ... .. .. ... ... .. ... . .. . .. .") => "HELLO WORLD"
solution
function encode(str) {
    return [...str.toLowerCase()]
        .map(x => x.charCodeAt() - 96)
        .map(x => x > 0 ? [ x % 3 === 0 ? 3 : x % 3, Math.ceil(x/3) % 3 === 0 ? 3 : Math.ceil(x/3) % 3, Math.ceil(x / 9)] : [3,3,3])
        .map(x => x.map(a => '.'.repeat(a)).join(' ')).join(' ')
}


function decode(str) {
    str = str.split(' ')
    return Array(str.length / 3)
        .fill(0)
        .map(x => str.splice(0,3).map(a => a.length).map((a,b) => b === 0 ? a : b === 1 ? (a-1) * 3 : (a-1) * 9).reduce((a,b) => a+ b)).map(x => x !== 27 ? String.fromCharCode(x + 96) : ' ').join('').toUpperCase()
}