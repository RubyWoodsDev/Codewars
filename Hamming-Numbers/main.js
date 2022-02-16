//A Hamming number is a positive integer of the form 2i3j5k, for some non-negative integers i, j, and k.

//Write a function that computes the nth smallest Hamming number.

//Specifically:

//The first smallest Hamming number is 1 = 203050
//The second smallest Hamming number is 2 = 213050
//The third smallest Hamming number is 3 = 203150
//The fourth smallest Hamming number is 4 = 223050
//The fifth smallest Hamming number is 5 = 203051
//The 20 smallest Hamming numbers are given in the Example test fixture.

//Your code should be able to compute the first 5 000 ( LC: 400, Clojure: 2 000, NASM, C, D, C++, Go and Rust: 13 282 ) Hamming numbers without timing out.


solution
function hamming (n) {
    // TODO: Program me
  }
  function hamming (n) {
    var seq = [1];
    var i2 = 0, i3 = 0, i5 = 0;
    for (var i = 1; i < n; i++) {
      var x = Math.min(2 * seq[i2], 3 * seq[i3], 5 * seq[i5]);
      seq.push(x);
      if (2 * seq[i2] <= x) i2++;
      if (3 * seq[i3] <= x) i3++;
      if (5 * seq[i5] <= x) i5++;
    }
    return seq[n-1];
  }