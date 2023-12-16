/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  str = str.toLowerCase();

  str = str.replace(/[\s.!?*,]/g, "");

  let j = str.length - 1;
  let i = 0;

  while (i < j) {
    if (str.charAt(i) != str.charAt(j)) {
      return false;
    } else {
      i++;
      j--;
    }
  }

  return true;
}

module.exports = isPalindrome;
