//DESCRIPTION:
//Given an array of integers as strings and numbers, return the sum of the array values as if all were numbers.

//Return your answer as a number.

solution
function sumMix(x){
    return x.map(a=> +a).reduce ((a, b) => a +b );
       }
   