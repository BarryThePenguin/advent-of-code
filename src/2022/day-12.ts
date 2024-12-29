import {createDay} from '../day-test.ts';
import {type Coordinates, toCoordinates, Grid} from '../to-grid.ts';

class Elevation {
	constructor(
		public x: number,
		public y: number,
		public value: string,
	) {}

	get coordinates() {
		return toCoordinates(this.x, this.y);
	}

	get elevation() {
		let elevation = this.value;

		if (this.start) {
			elevation = 'a';
		}

		if (this.end) {
			elevation = 'z';
		}

		return elevation.codePointAt(0) ?? 0;
	}

	get start() {
		return this.value === 'S';
	}

	get end() {
		return this.value === 'E';
	}
}

class HillClimb extends Grid<Elevation> {
	start: Elevation[] = [];

	end: Elevation | undefined;

	constructor(input: string[], startValue?: string) {
		const start: Elevation[] = [];

		let end: Elevation | undefined;

		super(
			Grid.coordinatesFrom(input, function (x, y, value) {
				const elevation = new Elevation(
					x,
					y,
					value === startValue ? 'S' : value,
				);

				if (elevation.start) {
					start.push(elevation);
				}

				if (elevation.end) {
					end = elevation;
				}

				return elevation;
			}),
		);

		this.start = start;

		this.end = end;
	}

	climb() {
		const paths = [];

		if (this.end) {
			for (const start of this.start) {
				const path = this.search(start, this.end);

				if (path) {
					paths.push(path);
				}
			}
		}

		const [shortestPath] = paths.sort((a, b) => a.length - b.length);

		return shortestPath ?? [];
	}

	search(start: Elevation, end: Elevation) {
		const cameFrom = this.frontier(start);
		let current: Elevation | undefined = end;

		const path = [];
		while (current !== undefined && current !== start) {
			path.push(current);
			current = cameFrom.get(current.coordinates);
		}

		if (current === undefined) {
			return;
		}

		return path.reverse();
	}

	frontier(from: Elevation) {
		const frontier = [from];
		const cameFrom = new Map<Coordinates, Elevation | undefined>();

		cameFrom.set(from.coordinates, undefined);

		while (frontier.length > 0) {
			const current = frontier.shift();

			if (current) {
				for (const next of this.adjacent(current)) {
					const elevationDifference = next.elevation - current.elevation;

					if (elevationDifference < 2 && !cameFrom.has(next.coordinates)) {
						frontier.push(next);
						cameFrom.set(next.coordinates, current);
					}
				}
			}
		}

		return cameFrom;
	}
}

export const day = createDay({
	partOne(input: string[]) {
		const hill = new HillClimb(input);
		const path = hill.climb();
		return path.length;
	},

	partTwo(input: string[]) {
		const hill = new HillClimb(input, 'a');
		const path = hill.climb();
		return path.length;
	},
});
