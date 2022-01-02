import { frequency } from '../frequency.js'

const count = (num: number) => (input: string[]) => {
  const hashMap = frequency(input)

  if ([...hashMap.values()].some(val => val === num)) {
    return 1;
  }

  return 0;
};

const count2 = count(2);
const count3 = count(3);

export const partOne = (boxes: string[]) => {
  const result = boxes.reduce(
    (acc, val) => {
      const counted2 = count2(val.split(''));
      const counted3 = count3(val.split(''));
      const [two, three] = acc;
      return [two + counted2, three + counted3];
    },
    [0, 0]
  );

  return result.reduce((a, b) => a * b);
};

export const partTwo = (input: string[]) => {
  for (const val1 of input) {
    const split = val1.split('');

    const found = input
      .filter(val => val !== val1)
      .find(val2 => {
        const found = split.reduce((acc, item, index) => {
          if (item === val2[index]) {
            return acc;
          }

          return acc + 1;
        }, 0);

        return found === 1;
      });

    if (found) {
      return found
        .split('')
        .filter((x, i) => val1[i] === x)
        .join('');
    }
  }
};
