import {range} from '../range.ts';
import {superset} from '../set.ts';
import * as parse from '../parse.ts';

class Assignments {
	superset = 0;

	overlap = 0;

	constructor(input: string[]) {
		for (const assignment of input) {
			const [firstStart, firstEnd = 0, secondStart, secondEnd = 0] =
				parse.positiveIntegers(assignment);

			const firstRange = range(firstStart, firstEnd + 1);
			const secondRange = range(secondStart, secondEnd + 1);

			if (
				superset(firstRange, secondRange) ||
				superset(secondRange, firstRange)
			) {
				this.superset++;
			}

			const overlap = firstRange.overlap(secondRange);

			if (overlap.size > 0) {
				this.overlap++;
			}
		}
	}
}

export const partOne = (input: string[]) => {
	const assignments = new Assignments(input);
	return assignments.superset;
};

export const partTwo = (input: string[]) => {
	const assignments = new Assignments(input);
	return assignments.overlap;
};
