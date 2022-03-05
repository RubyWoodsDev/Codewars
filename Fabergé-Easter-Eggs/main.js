//DESCRIPTION:
//One man (lets call him Eulampy) has a collection of some almost identical Fabergé eggs. One day his friend Tempter said to him:

//Do you see that skyscraper? And can you tell me a maximal floor that if you drop your egg from will not crack it?
//No, - said Eulampy.
//But if you give me N eggs, - says Tempter - I'l tell you an answer.
//Deal - said Eulampy. But I have one requirement before we start this: if I will see more than M falls of egg, my heart will be crushed instead of egg. So you have only M trys to throw eggs. Would you tell me an exact floor with this limitation?
//Task
//Your task is to help Tempter - write a function

//height :: Integer -> Integer -> Integer
//height n m = -- see text
//that takes 2 arguments - the number of eggs n and the number of trys m //- you should calculate maximum scyscrapper height (in floors), in //which it is guaranteed to find an exactly maximal floor from which //that an egg won't crack it.

//Which means,

//You can throw an egg from a specific floor every try
//Every egg has the same, certain durability - if they're thrown from a //certain floor or below, they won't crack. Otherwise they crack.
//You have n eggs and m tries
//What is the maxmimum height, such that you can always determine which //f//loor the target floor is when the target floor can be any floor //between 1 to this maximum height?
//Examples
//height 0 14 = 0
//height 2 0  = 0
//height 2 14 = 105
//height 7 20 = 137979
//Data range
//n <= 20000
//m <= 20000



solution
// recurrent formula: h(n, m) = h(n - 1, m - 1) + h(n, m - 1) + 1
// recurrsive solution is elegant, but slow even with using cache. Also it fails serious tests due to stack overflow exception.
// consider iterrative solution
// h(n, m) = sum{k = 1:n}[ c(m, k) ]

/* Solutions Table:
m\n|   1   2   3   4   5   6   7   8   9
========================================
 1 |   1   1   1   1   1   1   1   1   1
 2 |   2   3   3   3   3   3   3   3   3
 3 |   3   6   7   7   7   7   7   7   7
 4 |   4  10  14  15  15  15  15  15  15
 5 |   5  15  25  30  31  31  31  31  31
 6 |   6  21  41  56  62  63  63  63  63
 7 |   7  28  63  98 119 126 127 127 127
 8 |   8  36  92 162 218 246 254 255 255
 9 |   9  45 129 255 381 465 501 510 511
 */
 function height(n, m, power = false) {
    // consider some corner and boundary cases
    if (n > m) {
      return height(m, m);
    }
    if (n === 0 || m === 0) {
      return 0;
    }
    if (m === 1) {
      return 1;
    }
    if (n === 1) {
      return m;
    }
    if (n === m) {
      // h = 2 ^ m - 1
      return new BigNumber(2).toPower(m).minus(1);
    }
    // general case
    if (n <= m / 2) {
      // direct case: n <= m / 2
      let sum = new BigNumber(0);
      let c = new BigNumber(1);
      for (let k = 1; k <= n; k++) {
        c = c.mul(m - k + 1).div(k);
        sum = sum.add(c);
      }
      return sum;
    } else {
      // reverse case (to improve performance)
      let sum = height(m, m);
      let c = new BigNumber(1);
      for (let k = m; k > n; k--) {
        sum = sum.sub(c);
        c = c.mul(k).div(m - k + 1);
      }
      return sum;
    }
  }