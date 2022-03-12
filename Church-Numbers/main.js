//DESCRIPTION:
//Church Numbers
//Church Numbers are representations of natural numbers (non-negative integers) as functions. Not only as functions, but as functions that can perform a task upon a value a set number of times. This is an important concept of Lambda Calculus, so naturally we'll have to talk about Lambda Calculus.

//Lambda Calculus
//Lambda Calculus is a syntax for functional computing/mathematics. In Lambda Calculus, a function has one input, and one output. However, the input function can be another lambda function (which accepts another input), and this can somewhat simulate multiple inputs with some important differences; this is called "currying".

//Some languages (e.g., Haskell) naturally use curried functions. Other languages (e.g., Javascript) must have currying forced upon them. The solution starts with the functions properly curried, and will need to remain that way.

//Church Functions
//Back to Church Numbers. With a Church Number, we want to accept "two inputs" (a function f and a value x; remember they're curried, so it's c(f)(x) not c(f, x)), and we want to successively perform f on x. So, if we have Church Number 2, that should mean f(f(x)). If you're working in Haskell, ignore this bit; you're already curried.

//To define this, we'll start at zero:

//var zero = (f) => (x) => x;
//As you can see, zero accepts a function, and returns a function. The returned function performs f zero times and returns the result (also known as an identify function). One goes a step further:

//var one = (f) => (x) => f(x);
//Of course, it would get tedious to have to declare every natural number you need. So let's write a successor function:

//var succ = (c) => (f) => (x) => f(c(f)(x));
//The successor function takes a Church Number (including zero), and returns a function that performs one more application of f than the previous Church Number. So, succ(zero) is equivalent to one, succ(succ(zero)) is two, etc.. And how you use a Church Number c is to:

//var result = c(f)(x);
//result will be f performed on x c times. So if c is 3 (succ(succ(succ(zero)))), result will be f(f(f(x))).

//Your Goal
//Implement some basic arithmetic for Church Numbers, namely adding, multiplying, and exponentiation. Performance is part of this kata; if you're timing out (and Codewars isn't under load), you'll need to come up with more efficient functions.

//General Tips
//Since the functions are curried, you can call a function with only one "input" and receive a function back. Think of this like the classic adder function:

//var addX = (x) => (y) => x + y;
//var addOne = addX(1);
//addOne(5);// == 6
//With Church Numbers, this means that c(f) is a function that takes one input (x) and returns f performed on x c times. The ability to pass this function around is useful, to give an example, for multiplying.

//Adding Tips
//What you want to do is perform f on x through an entire one of your //Church inputs, then feed that value into your next Church input as if it were x.
//Lambda Calculus definition for adding: c1 f (c2 f x)

//Multiplying Tips
//You can use repeated adding to multiply, but there's a much cleaner solution. Remember c(f) is a function of its own.
//Lambda Calculus definition for multiplying: c1 (c2 f) x

//Exponentiation Tips
//Similar to multiplying, you could use repeated multiplication, but it's better not to. In fact, exponentiation is syntactically simpler than adding with Church Numbers (even if it takes some brain gymnastics to figure out why).
//Lambda Calculus definition: (ce cb) f x
//
//While it isn't a hard requirement for this kata, try to implement multiplying without adding, and exponentiation without multiplying or adding. It's actually simpler this way (really).

//Testing Tips
//The following functions are preloaded; feel free to use them for testing purposes. They can't be used when you Submit, only when you run your own test cases.

//var zero = (f) => (x) => x;
//var succ = (c) => (f) => (x) => f(c(f)(x));
//var numerify = (c) => c((i) => i + 1)(0); //Turns a Church Number into //an integer
//var churchify = (n) => (f) => (x) => { //Turns an integer into a Church Number.
//      for(var i = 0; i < n; i++) x = f(x);
//      return x;
//    };
//For churchify, why don't we use succ(churchify(n - 1))? The stack size gets out of hand.
//You won't need to sanitize your inputs; you will always receive valid Church Numbers into churchAdd, churchMul, and churchPow.

//Beta Notes
//A C# version is forthcoming. If someone else translates into other languages, I'll add them as well. It's improbable that a satisfactory //Java solution can be made since generics and lambdas don't play well.

//After you finish, please mark as Ready (or add why it isn't to the discussion) and give a kyu rating.




solution
var churchAdd = (c1) => (c2) => (f) => (x) => 1;
var churchMul = (c1) => (c2) => (f) => (x) => 1;
var churchPow = (cb) => (ce) => (f) => (x) => 1;

var churchAdd = (c1) => (c2) => (f) => (x) => c1(f)(c2(f)(x));
var churchMul = (c1) => (c2) => (f) => (x) => c1(c2(f))(x);
var churchPow = (cb) => (ce) => (f) => (x) => ce(cb)(f)(x);