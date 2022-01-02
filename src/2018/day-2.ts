import {frequency} from '../frequency.js';

const count = (number_: number) => (input: string[]) => {
  const hashMap = frequency(input);

  if ([...hashMap.values()].includes(number_)) {
    return 1;
  }

  return 0;
};

const count2 = count(2);
const count3 = count(3);

export const partOne = (boxes: string[]) => {
  let result = [0, 0];

  for (const value of boxes) {
    const counted2 = count2(value.split(''));
    const counted3 = count3(value.split(''));
    const [two, three] = result;
    result = [two + counted2, three + counted3];
  }

  return result.reduce((a, b) => a * b);
};

export const partTwo = (input: string[]) => {
  for (const value1 of input) {
    const split = value1.split('');

    const found = input
      .filter((value) => value !== value1)
      .find((value2) => {
        let found = 0;

        for (const [index, item] of split.entries()) {
          if (item !== value2[index]) {
            found += 1;
          }
        }

        return found === 1;
      });

    if (found) {
      return found
        .split('')
        .filter((x, i) => value1[i] === x)
        .join('');
    }
  }

  return undefined;
};
