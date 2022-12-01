export const partOne = (input: string[]) => {
	return input.reduce((acc, value) => acc + Number(value), 0);
};

export const partTwo = (input: string[]) => {
	const seen = new Set();
	const deltas = input.map(Number);
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
