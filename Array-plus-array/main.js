//DESCRIPTION:
//I'm new to coding and now I want to get the sum of two arrays...actually the sum of all their elements. I'll appreciate for your help.

//P.S. Each array includes only integer numbers. Output is a number too.

solution
const sum = arr => arr.reduce((sum, v) => sum + v);

function arrayPlusArray(arr1, arr2) {
  return sum(arr1) + sum(arr2); //something went wrong
}