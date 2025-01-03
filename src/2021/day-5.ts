import {createDay} from '../day-test.ts';
import * as parse from '../parse.ts';

type Point = `${number},${number}`;

type Coordinates = Map<Point, number>;

function parseSegment(input: string, includeDiagonal: boolean) {
	const coordinates: Coordinates = new Map();
	let [x1 = 0, y1 = 0, x2 = 0, y2 = 0] = parse.integers(input);

	if (!includeDiagonal && x1 !== x2 && y1 !== y2) {
		return coordinates;
	}

	coordinates.set(`${x1},${y1}`, 1);

	if (x1 !== x2 && y1 !== y2) {
		while (x1 !== x2 && y1 !== y2) {
			if (x1 > x2) {
				x1 -= 1;
			} else {
				x1 += 1;
			}

			if (y1 > y2) {
				y1 -= 1;
			} else {
				y1 += 1;
			}

			coordinates.set(`${x1},${y1}`, 1);
		}
	} else {
		while (x1 !== x2 || y1 !== y2) {
			if (x1 > x2) {
				x1 -= 1;
			} else if (x1 < x2) {
				x1 += 1;
			} else if (y1 > y2) {
				y1 -= 1;
			} else if (y1 < y2) {
				y1 += 1;
			}

			coordinates.set(`${x1},${y1}`, 1);
		}
	}

	return coordinates;
}

class Hydrothermal {
	coordinates: Coordinates = new Map();

	get overlapCount() {
		let overlapCount = 0;

		for (const count of this.coordinates.values()) {
			if (count > 1) {
				overlapCount += 1;
			}
		}

		return overlapCount;
	}

	constructor(segments: Iterable<string>, includeDiagonal = false) {
		for (const segment of segments) {
			const coordinates = parseSegment(segment, includeDiagonal);

			for (const [point, count] of coordinates) {
				const current = this.coordinates.get(point) ?? 0;
				this.coordinates.set(point, current + count);
			}
		}
	}
}

export const day = createDay({
	partOne(input: Iterable<string>) {
		const vents = new Hydrothermal(input);

		return vents.overlapCount;
	},

	partTwo(input: Iterable<string>) {
		const vents = new Hydrothermal(input, true);

		return vents.overlapCount;
	},
});
