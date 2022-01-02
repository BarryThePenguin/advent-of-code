export const partOne = (input: string[]) => input.reduce((acc, val) => acc + parseInt(val, 10), 0);

export const partTwo = (input: string[]) => {
  const seen = new Set();
  const deltas = input.map((val) => parseInt(val, 10));
  let frequency = 0;

  while (true) {
    for (const delta of deltas) {
      seen.add(frequency);
      frequency += delta;

      if (seen.has(frequency)) {
        return frequency;
      }
    }
  }
};