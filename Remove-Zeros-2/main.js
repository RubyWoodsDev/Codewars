//DESCRIPTION:
//Write a function that takes an array of values and moves all elements that are zero to the end of the array, otherwise preserving the order of the array. The zero elements must also maintain the order in which they occurred.

//For example, the following array

//[7, 2, 3, 0, 4, 6, 0, 0, 13, 0, 78, 0, 0, 19, 14]

//is transformed into

//[7, 2, 3, 4, 6, 13, 78, 19, 14, 0, 0, 0, 0, 0, 0]

//Zero elements are defined by either 0 or "0". Some tests may include elements that are not number literals.

//You are NOT allowed to use any temporary arrays or objects. You are also not allowed to use any Array.prototype or Object.prototype methods.

function removeZeros(array) {
    // Sort "array" so that all elements with the value of zero are moved to the
    // end of the array, while the other elements maintain order.
    // [0, 1, 2, 0, 3] --> [1, 2, 3, 0, 0]
    // Zero elements also maintain order in which they occurred.
    // [0, "0", 1, 2, 3] --> [1, 2, 3, 0, "0"]
    
    // Do not use any temporary arrays or objects. Additionally, you're not able
    // to use any Array or Object prototype methods such as .shift(), .push(), etc
    
    // the correctly sorted array should be returned.
    return array;
  }
  function removeZeros(array) {
      var end = array.length;
      for (var i = 0; i < end; i++) {
          if (array[i] === 0 || array[i] === "0") {
              arrayShiftToEnd(array, i);
              i--;
              end--;
          }
      }
      return array;
  }
  
  function arrayShiftToEnd(array, n) {
      var end = array[n]
      for(var i = n; i <  array.length; i++) {
          array[i] = array[i + 1]
      }
      array[array.length - 1] = end;
  
      return array
  }