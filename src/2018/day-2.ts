import {countFrequency} from '../frequency.js';

export const partOne = (boxes: string[]) => {
  let count2 = 0;
  let count3 = 0;

  for (const value of boxes) {
    const counted = countFrequency(value.split(''));

    if (counted.has(2)) {
      count2 += 1;
    }

    if (counted.has(3)) {
      count3 += 1;
    }
  }

  return count2 * count3;
};

function difference(stringOne: string, stringTwo: string): string[] {
  const diff = [];

  for (const [index, char] of Array.from(stringOne).entries()) {
    if (stringTwo.charAt(index) !== char) {
      diff.push(char);
    }
  }

  return diff;
}

function union(stringOne: string, stringTwo: string): string[] {
  const diff = [];

  for (const [index, char] of Array.from(stringOne).entries()) {
    if (stringTwo.charAt(index) === char) {
      diff.push(char);
    }
  }

  return diff;
}

export const partTwo = (input: string[]) => {
  let found;

  for (const value1 of input) {
    if (typeof found === 'undefined') {
      found = input.find((value2) => difference(value1, value2).length === 1);

      if (typeof found === 'string') {
        found = union(found, value1).join('');
      }
    }
  }

  return found;
};
