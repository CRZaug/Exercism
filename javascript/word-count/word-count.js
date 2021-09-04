/*
To solve this problem, we break it into a few steps:
  1. Split the input on all non-word characters and ' (using regex)
  2. Clean the results
  3. Perform the counting in a dict

Cleaning the results involves a few extra steps:
  1. Remove all spaces (e.g., " ")
  2. Remove quotes from an item if applicable
  3. Convert to lowercase
*/


/**
 * Count the words that appear in a string
 * @param  {String} input A string of words to count
 * @return {Object}       A dictionary containing words and their counts
 */
export const countWords = (input) => {
  
  var cleanedInput = splitInputAndClean(input);
  return performCounting(cleanedInput);

};

/**
 * Split and clean an input string of words to count
 * @param  {String} input A string of words to count
 * @return {Array}        An array of all cleaned words
 */
function splitInputAndClean(input){

  // Perform a split on all non-word chars except '
  var splitArray = input.split(/[^a-zA-Z0-9']/); 

  // Clean the array by removing spaces, extra quotes, and lowering all chars
  var filteredSplitArray = splitArray.filter(item => item != '');
  filteredSplitArray = filteredSplitArray.map(item => removeQuotations(item));
  filteredSplitArray = filteredSplitArray.map(item => item.toLowerCase())

  return filteredSplitArray;
}

/**
 * Remove quotes at the beginning or end of a word 
 * @param  {String} item  A word which may or may not have quotes
 * @return {String}       The word with quotes removed if necessary
 */
function removeQuotations(item){

  if (item[0]=="'"){
    item = item.slice(1);
  } 

  if (item[item.length - 1]=="'"){
    item = item.slice(0,-1);
  }

  return item;
}

/**
 * Count the number of times each word appears in a dict
 * @param  {Array} cleanedInput An array of strings, cleaned for counting
 * @return {Object}             A dictionary containing words and their counts
 */
function performCounting(cleanedInput) {

  var countDict = {};

  for (var i in cleanedInput){
    var item = cleanedInput[i];
    if (countDict.hasOwnProperty(item) == false){
      countDict[item] = 1;
    }
    else {
      countDict[item] += 1;
    }
  }
  
  return countDict;
}