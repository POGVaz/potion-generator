import { convertArrayToText, getCombinationsWithRepetition, getAllCombinations } from "../utils";

describe('Convert Array To Text', () => {
  it('Should return empty string for length 0', () => {
    expect(
      convertArrayToText([])
    ).toBe('');
  });

  it('Should return an element for length 1', () => {
    expect(
      convertArrayToText(['test'])
    ).toBe('test');
  });

  it('Should return both elements for length 2 or more', () => {
    expect(
      convertArrayToText(['test1', 'test2', 'test3'])
    ).toBe('test1, test2 & test3');
  });
});

describe('Get All Combinations', () => {
  it('should return an empty array if given an empty array', () => {
    expect(getAllCombinations([], 1, 3)).toEqual([]);
  });

  it('should return an array with no elements if min is 0 and max is 0', () => {
    expect(getAllCombinations(['a', 'b', 'c'], 0, 0)).toEqual([[]]);
  });

  it('should return an array of all combinations of the input array from min to max length', () => {
    const inputArray = ['a', 'b', 'c'];
    const min = 1;
    const max = 2;
    const expectedOutput = [
      ['a'],
      ['b'],
      ['c'],
      ['a', 'a'],
      ['a', 'b'],
      ['a', 'c'],
      ['b', 'b'],
      ['b', 'c'],
      ['c', 'c']
    ];
    expect(getAllCombinations(inputArray, min, max)).toEqual(expectedOutput);
  });
});

describe('Get Combinations With Repetition', () => {

  test('returns an array with a single empty combination when input array is empty', () => {
    const inputArray = [];
    const expectedOutput = [];
    expect(getCombinationsWithRepetition(inputArray, 2)).toEqual(expectedOutput);
  });

  test('returns an array of all combinations with repetition of length 1 from an array of length 1', () => {
    const inputArray = ['a'];
    const expectedOutput = [['a']];
    expect(getCombinationsWithRepetition(inputArray, 1)).toEqual(expectedOutput);
  });

  test('returns an array of all combinations with repetition of length 2 from an array of length 2', () => {
    const inputArray = [1, 2];
    const expectedOutput = [[1, 1], [1, 2], [2, 2]];
    expect(getCombinationsWithRepetition(inputArray, 2)).toEqual(expectedOutput);
  });

  test('returns an array of all combinations with repetition of length 3 from an array of length 3', () => {
    const inputArray = ['a', 'b', 'c'];
    const expectedOutput = [
      ['a', 'a', 'a'], ['a', 'a', 'b'], ['a', 'a', 'c'], ['a', 'b', 'b'],
      ['a', 'b', 'c'], ['a', 'c', 'c'], ['b', 'b', 'b'], ['b', 'b', 'c'],
      ['b', 'c', 'c'], ['c', 'c', 'c']
    ];
    expect(getCombinationsWithRepetition(inputArray, 3)).toEqual(expectedOutput);
  });
});
