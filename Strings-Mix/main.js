//DESCRIPTION:
//Given two strings s1 and s2, we want to visualize how different the two strings are. We will only take into account the lowercase letters (a to z). First let us count the frequency of each lowercase letters in s1 and s2.

//s1 = "A aaaa bb c"

//s2 = "& aaa bbb c d"

//s1 has 4 'a', 2 'b', 1 'c'

//s2 has 3 'a', 3 'b', 1 'c', 1 'd'

//So the maximum for 'a' in s1 and s2 is 4 from s1; the maximum for 'b' is 3 from s2. In the following we will not consider letters when the maximum of their occurrences is less than or equal to 1.

//We can resume the differences between s1 and s2 in the following string: "1:aaaa/2:bbb" where 1 in 1:aaaa stands for string s1 and aaaa because the maximum for a is 4. In the same manner 2:bbb stands for string s2 and bbb because the maximum for b is 3.

//The task is to produce a string in which each lowercase letters of s1 or s2 appears as many times as its maximum if this maximum is strictly greater than 1; these letters will be prefixed by the number of the string where they appear with their maximum value and :. If the maximum is in s1 as well as in s2 the prefix is =:.

//In the result, substrings (a substring is for example 2:nnnnn or 1:hhh; it contains the prefix) will be in decreasing order of their length and when they have the same length sorted in ascending lexicographic order (letters and digits - more precisely sorted by codepoint); the different groups will be separated by '/'. See examples and "Example Tests".

//Hopefully other examples can make this clearer.

//s1 = "my&friend&Paul has heavy hats! &"
//s2 = "my friend John has many many friends &"
//mix(s1, s2) --> "2:nnnnn/1:aaaa/1:hhh/2:mmm/2:yyy/2:dd/2:ff/2:ii/2:rr/=:ee/=:ss"

//s1 = "mmmmm m nnnnn y&friend&Paul has heavy hats! &"
//s2 = "my frie n d Joh n has ma n y ma n y frie n ds n&"
//mix(s1, s2) --> "1:mmmmmm/=:nnnnnn/1:aaaa/1:hhh/2:yyy/2:dd/2:ff/2:ii/2:rr/=:ee/=:ss"

//s1="Are the kids at home? aaaaa fffff"
//s2="Yes they are here! aaaaa fffff"
//mix(s1, s2) --> "=:aaaaaa/2:eeeee/=:fffff/1:tt/2:rr/=:hh"
//Note for Swift, R, PowerShell
//The prefix =: is replaced by E:

//s1 = "mmmmm m nnnnn y&friend&Paul has heavy hats! &"
//s2 = "my frie n d Joh n has ma n y ma n y frie n ds n&"
//mix(s1, s2) --> "1:mmmmmm/E:nnnnnn/1:aaaa/1:hhh/2:yyy/2:dd/2:ff/2:ii/2:rr/E:ee/E:ss"//



solution

const collectData = (map, str, arraySequence) => {
    str.match(/[a-z]/g)
      .forEach((v) => {
        const format = map.get(v) || {};
        format[arraySequence] = (format[arraySequence] || 0) + 1;
        format.max = Math.max(format[1] || 0, format[2] || 0);
        
        if (format[1] === format[2]) {
          format.greater = '=';
        } else {
          format.greater = (format[1] || 0) > (format[2] || 0) ? 1 : 2;
        }
        
        map.set(v, format);
      });
    return map;
  };
  
  const mix = (s1, s2) => {
    let map = collectData(new Map(), s1, 1);
    map = collectData(map, s2, 2);
   
    const sortedResult = [...map.entries()].sort((a, b) => {
      if (a[1].max < b[1].max) {
        return 1;
      }
      
      if (a[1].max === b[1].max) {
        if ((parseInt(a[1].greater) || 3) > (parseInt(b[1].greater) || 3)) {
          return 1;
        }
        
        if (a[1].greater === b[1].greater) {
          return a[0].localeCompare(b[0]);
        }
      }
      
      return -1;
    }).filter((v) => v[1].max > 1);
    
    return sortedResult.map((v) => `${v[1].greater}:${v[0].repeat(v[1].max)}`)
      .join('/');
  };