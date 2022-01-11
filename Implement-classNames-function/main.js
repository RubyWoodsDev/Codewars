//DESCRIPTION:
//Prelude
//The HTML class attribute is a space-separated list of the case-sensitive classes of the element.

//MDN class Reference.

//<!--- HTML --->
//<button class="button active">hello</button>
//We can also create a button and assign it class names in JavaScript using element.className.

//MDN className Reference.

// JavaScript
//const myButton = document.createElement("button");
//myButton.textContent = "hello";
//myButton.className = "button active";
//Kata
//In this kata, we're going to write a function, cns, to help generate our class name string.

//Our cns function should accept an arbitrary number of arguments.

//The arguments maybe a mix of strings, conditionals and objects.

//Each string will represent a class name to be included in the class name string.

//Each object key will represent a class name to be included, only if it's property is true.

//No string argument or object key will contain multiple class names, eg 'button action' or { "large primary" : true }.

//We will then be able to use cns like so.

//const isActive = true;
//const isDisabled = false;
//const isLarge = false;
//const isPrimary = true;

const classNameString = cns(
  'button',
  isLarge && 'large',
  {
   'active': isActive,
   'disabled': isDisabled
  },
  isPrimary && 'primary'
); 
// -> 'button active primary'

//const myButton = document.createElement("button");
//myButton.className = classNameString;
//Requirements
//Output is a space-separated list of the case-sensitive class names, "button active primary"
//You should ignore extra spaces ('' and ' ' should be deleted; '  button ' should change to 'button')
//You should ignore boolean arguments
//You should ignore object keys which aren't strings, or are empty strings
//You should ignore object keys if the property is not true
//The order of the class names must match the order they appear in the arguments
//There must not be duplicate class names in the output
//If two identical classes have the opposite condition, we keep the class that had true.
//Nice to have some fun. And remember - it's just a code.




solution
const cns = (...arguments) => {
    let res = new Set();
    arguments.map(item => {
      if(typeof item === 'string' && item){
        if(item.trim()) res.add(item.trim())
      }else if(item !== null && typeof item === 'object'){
        Object.entries(item).reduce((acc, [key, value]) => {
        if(value && key.trim()) res.add(key.trim())
      }, [])
      }
    })
    return [...res].join(' ')
  };