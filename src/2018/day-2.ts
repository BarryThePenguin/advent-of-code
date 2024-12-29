import {createDay} from '../day-test.ts';
import {countFrequency} from '../frequency.ts';
import {hammingDistance, union} from '../string.ts';

export const day = createDay({
	partOne(input: Iterable<string>) {
		let count2 = 0;
		let count3 = 0;

		for (const value of input) {
			const counted = countFrequency(value);

			if (counted.has(2)) {
				count2 += 1;
			}

			if (counted.has(3)) {
				count3 += 1;
			}
		}

		return count2 * count3;
	},

	partTwo(input: Iterable<string>) {
		let found;
		const values = [...input];

		for (const value1 of values) {
			if (found === undefined) {
				found = values.find((value2) => hammingDistance(value1, value2) === 1);

				if (typeof found === 'string') {
					found = union(found, value1).toArray().join('');
				}
			}
		}

		return found;
	},
});
