//DESCRIPTION:
//Given positive integers a and b as strings, evaluate a / b and return the quotient and the remainder as strings in the form [quotient, remainder] (vector<string> {quotient, remainder} in C++).

//a and b can be very large (at the order of 10^150 to 10^200)
//As usual, your result should not have leading 0s
//require is disabled in JavaScript. Do it yourself ;-)



solution
function divideStrings(a,b) {
    return [Math.floor(+a / +b).toString(), (+a % +b).toString()];  // This doesn't work on big numbers!
  }
  function divideStrings(a,b) {
    if(!strvalcmp(a, b)) return ['0',a];
    var quo = '', len = a.length-b.length, rem = a.slice(0,b.length);
    a = a.slice(b.length);
    for(let i=0; i<=len; i++) {
      var dgt = 0;
      for(;strvalcmp(rem,b);dgt++) rem = subtractStrings(rem,b);
      quo=(quo==='0'?'':quo)+dgt;
      rem=(rem==='0'?'':rem)+(a[0]||'');
      a=a&&a.slice(1);
    }
    return [quo+a,rem||'0'];
  }
  var strvalcmp=(a,b)=>a.length>b.length || (a.length===b.length && a>=b);
  function subtractStrings(a, b) {
    if(a===b)return '0';
    var res = '', c = 0;
    a = a.split(''); b = b.split('');
    while (a.length || b.length || c) {
      c += ~~a.pop() - ~~b.pop();
      res = (c+10) % 10 + res;
      c = -(c < 0);
    }
    return res.replace(/^0+/, '');
  }