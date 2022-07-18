//DESCRIPTION:
//Write function RemoveExclamationMarks which removes all exclamation marks from a given string.

solution
function removeExclamationMarks(s) {
    return s.split('!').join('');
  }