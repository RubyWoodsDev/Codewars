//DESCRIPTION:
//Simpler Interactive interpreter (or REPL)
//You will create an interpreter which takes inputs described below and produces outputs, storing state in between each input. This is a simplified version of the Simple Interactive Interpreter kata with functions removed, so if you have fun with this kata, check out its big brother to add functions into the mix.

//If you're not sure where to start with this kata, check out ankr's //Evaluate Mathematical Expression kata.

//Note that the eval command has been disabled.

//Concepts
//The interpreter will take inputs in the language described under the language header below. This section will give an overview of the language constructs.

//Variables
//Any identifier which is not a keyword will be treated as a variable. //If the identifier is on the left hand side of an assignment operator, the result of the right hand side will be stored in the variable. If a variable occurs as part of an expression, the value held in the variable will be substituted when the expression is evaluated.

//Variables are implicitly declared the first time they are assigned to.

//Example: Initializing a variable to a constant value and using the variable in another expression (Each line starting with a '>' indicates a separate call to the input method of the interpreter, other lines represent output)

//>x = 7
//    7
//>x + 6
//    13    
//Referencing a non-existent variable will cause the interpreter to throw an error. The interpreter should be able to continue accepting input even after throwing.

//Example: Referencing a non-existent variable

//>y + 7
//    ERROR: Invalid identifier. No variable with name 'y' was found."
//Assignments
//Example: Assigning a constant to a variable

//x = 7
    7
//In this kata, all tests will contain only a single assignment. You do not need to consider chained or nested assignments.

//Operator Precedence
//Operator precedence will follow the common order. There is a table in the Language section below that explicitly states the operators and their relative precedence.

//Name conflicts
//Because variables are declared implicitly, no naming conflicts are possible. variable assignment will always overwrite any existing value.

//Input
//Input will conform to the expression production in the grammar below.

//Output
//Output for a valid expression will be the result of the expression.

//Output for input consisting entirely of whitespace will be an empty string (null in case of Java).

//All other cases will throw an error.

//Language
//Grammar
//This section specifies the grammar for the interpreter language in //EBNF syntax

//expression      ::= factor | expression operator expression
//factor          ::= number | identifier | assignment | '(' expression //')'
//assignment      ::= identifier '=' expression

//operator        ::= '+' | '-' | '*' | '/' | '%'

//identifier      ::= letter | '_' { identifier-char }
//identifier-char ::= '_' | letter | digit

//number          ::= { digit } [ '.' digit { digit } ]

//letter          ::= 'a' | 'b' | ... | 'y' | 'z' | 'A' | 'B' | ... | //'Y' | 'Z'
//digit           ::= '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | //'8' | '9'
//Operator Precedence
//The following table lists the language's operators grouped in order of precedence. Operators within each group have equal precedence.



solution
function Interpreter()
{
    this.vars = {};
    this.functions = {};
}

Interpreter.prototype.tokenize = function (program)
{
    if (program === "")
        return [];

    var regex = /\s*([-+*\/\%=\(\)]|[A-Za-z_][A-Za-z0-9_]*|[0-9]*\.?[0-9]+)\s*/g;
    return program.split(regex).filter(function (s) { return !s.match(/^\s*$/); });
};

Interpreter.prototype.input = function (expr)
{
    var tokens = this.tokenize(expr);
};
var operators = {
  '%': 2,
  '*': 2,
  '/': 2,
  '^': 2,
  '+': 1,
  '-': 1
};

function toPostfix(expression) {
  var stack = [];
  var post = [];

  expression = expression.replace(/\s+/g, '');
  expression = expression.replace(/--/g, '+');
  expression = expression.replace(/\+-/g, '-');
  expression = expression.replace(/(\*|\/)-([0-9.]+)/g, "$1(0-$2)");
  expression = expression.replace(/(\*|\/)-\((.+?)\)/g, "$1(0-($2))");
  expression = expression.replace(/\(-/g, "(0-");
  
  for (var i = 0; i < expression.length; i++) {
    var c = '' + expression[i];
    var u = null;

    if (c in operators) {
      while (stack.length > 0 && operators[c] <= operators[ stack[stack.length-1] ]) post.push(stack.pop());
      stack.push(c);
    } else if (c === '(') {
      stack.push(c);
    } else if (c === ')') {
      while ((u = stack.pop()) !== '(') post.push(u);
    } else if (c === ' ') {
    } else if (c === '=') {
      stack.push('=');
    } else if (/[0-9]/.test(c)) {
      while (i < expression.length-1 && /^[0-9.]$/.test(expression[i+1])) c += expression[++i];
      post.push(+c);
    } else if (/[a-z]/i.test(c)) {
      while (i < expression.length-1 && /[a-z]/i.test(expression[i+1])) c += expression[++i];
      post.push(c);
    }
  }

  return post.concat(stack.reverse());
}

function Interpreter() {
  this.vars = {};
}

Interpreter.prototype.eval = function(value) {
  if (/^[a-z]/i.test(value)) {
    if (!(value in this.vars)) throw new Error(value + ' is not defined');
    return this.vars[value];
  } else return value;
};

Interpreter.prototype.input = function(expression) {
  var postfix = toPostfix(expression);
  var stack = [];
  for (var i = 0; i < postfix.length; i++) {
    var c = postfix[i];
    if (c == +c) {
      stack.push(+c);
    } else if (c in operators) {
      var a = this.eval(stack.pop()), b = this.eval(stack.pop());
      switch (c) {
        case '+': stack.push(a+b); break;
        case '*': stack.push(a*b); break;
        case '/': stack.push(b/a); break;
        case '-': stack.push((b||0)-a); break;
        case '%': stack.push(b%a); break;
      }
    } else if (c === '=') {
      var value = stack.pop(), name = stack.pop();
      this.vars[name] = value;
      stack.push(value);
    } else {
      stack.push(c);
    }
  }
  var s = stack.pop();
  return s ? this.eval(s) : '';
};