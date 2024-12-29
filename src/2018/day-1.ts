import {createDay} from '../day-test.ts';

export const day = createDay({
	partOne(input: Iterable<string>) {
		return [...input].reduce(
			(accumulator, value) => accumulator + Number(value),
			0,
		);
	},

	partTwo(input: Iterable<string>) {
		const seen = new Set();
		const deltas = [...input].map(Number);
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
	},
});
