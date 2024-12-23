import {range} from '../range.ts';
import {intersection, superset} from '../set.ts';

class Assignments {
	superset = 0;

	overlap = 0;

	constructor(input: string[]) {
		for (const assignment of input) {
			const [first, second] = assignment.split(',');

			const firstRange = new Set(cleanRange(first));
			const secondRange = new Set(cleanRange(second));

			if (
				superset(firstRange, secondRange) ||
				superset(secondRange, firstRange)
			) {
				this.superset++;
			}

			const intersect = intersection(firstRange, secondRange);

			if (intersect.size > 0) {
				this.overlap++;
			}
		}
	}
}

function cleanRange(assignment: string) {
	const [start, end] = assignment.split('-');
	return range(Number(start), Number(end) + 1);
}

export const partOne = (input: string[]) => {
	const assignments = new Assignments(input);
	return assignments.superset;
};

export const partTwo = (input: string[]) => {
	const assignments = new Assignments(input);
	return assignments.overlap;
};
