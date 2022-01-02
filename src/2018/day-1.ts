export const partOne = (input: string[]) =>
  input.reduce((acc, value) => acc + Number.parseInt(value, 10), 0);

export const partTwo = (input: string[]) => {
  const seen = new Set();
  const deltas = input.map((value) => Number.parseInt(value, 10));
  let frequency = 0;

  while (!seen.has(frequency)) {
    for (const delta of deltas) {
      if (!seen.has(frequency)) {
        seen.add(frequency);
        frequency += delta;
      }
    }
  }

  return frequency;
};
