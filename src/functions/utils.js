'use-strict'

function convertArrayToText(arr) {
    let returnText = '';

    switch (arr.length) {
        case 0:
            returnText = '';
        break;

        case 1:
            returnText = arr[0];
        break;
    
        default:
            returnText = arr.slice(0, arr.length - 1).join(', ') + " & " + arr[arr.length - 1];
        break;
        }
        
    return returnText;
}

/**
* Returns an array of all possible combinations of elements from the given array
* with a minimum length of min and a maximum length of max, including both extremes.
* @param {Array} array - The array to get the combinations from
* @param {Number} min - The minimum length of combinations to return
* @param {Number} max - The maximum length of combinations to return
* 
* @returns {Array} An array containing all possible combinations
*/
function getAllCombinations(array, min, max) {
    let returnArray = [];
    for (let index = min; index <= max; index++) {
        returnArray = [...returnArray, ...getCombinationsWithRepetition(array, index)];
    }
    return returnArray;
}

/**
* getCombinationsWithRepetition - generates all combinations of a given length from an array, allowing for repetition

* @param {Array} arr - the input array to generate combinations from
* @param {number} combLen - the length of the combinations to generate (optional, default is the length of the input array)
* 
* @throws {TypeError} if combLen is not a number
* @returns {Array} an array of all combinations of the given length, with repetition allowed
*/
function getCombinationsWithRepetition(arr, combLen) {
    combLen = Number(combLen);

    if (combLen === void 0) combLen = arr.length; // Length of the combinations
    let data = Array(combLen),             // Used to store state
        results = [];                // Array of results
    (function f(pos, start) {        // Recursive function
        if (pos === combLen) {                // End reached
            results.push(data.slice());  // Add a copy of data to results
            return;
        }
        for (let i = start; i < arr.length; ++i) {
            data[pos] = arr[i];          // Update data
            f(pos + 1, i);                 // Call f recursively
        }
    })(0, 0);                        // Start at index 0
    return results;                  // Return results
}

function getRandomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function shuffleArray(array) {
    const shuffledArray = [...array];
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
            shuffledArray[randomIndex], shuffledArray[currentIndex]];
    }

    return shuffledArray;
}

export {
    convertArrayToText,
    getAllCombinations,
    getCombinationsWithRepetition,
    getRandomFromArray,
    shuffleArray
}