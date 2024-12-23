import {countFrequency} from '../frequency.ts';
import {hammingDistance, union} from '../string.ts';

export const partOne = (boxes: string[]) => {
	let count2 = 0;
	let count3 = 0;

	for (const value of boxes) {
		const counted = countFrequency(value);

		if (counted.has(2)) {
			count2 += 1;
		}

		if (counted.has(3)) {
			count3 += 1;
		}
	}

	return count2 * count3;
};

export const partTwo = (input: string[]) => {
	let found;

	for (const value1 of input) {
		if (found === undefined) {
			found = input.find((value2) => hammingDistance(value1, value2) === 1);

			if (typeof found === 'string') {
				found = union(found, value1).join('');
			}
		}
	}

	return found;
};
