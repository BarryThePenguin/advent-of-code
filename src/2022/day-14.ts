import {walk} from '../chunk.js';
import {range} from '../range.js';
import {
	fromCoordinates,
	toCoordinates,
	type Coordinates,
	Grid,
} from '../to-grid.js';

class Rock {
	constructor(
		public x: number,
		public y: number,
	) {}

	get coordinates() {
		return toCoordinates(this.x, this.y);
	}
}

class Sand {
	constructor(
		public x: number,
		public y: number,
	) {}

	get coordinates() {
		return toCoordinates(this.x, this.y);
	}

	moveDown() {
		this.y++;
	}

	moveDownLeft() {
		this.x--;
		this.y++;
	}

	moveDownRight() {
		this.x++;
		this.y++;
	}
}

class Cave extends Grid<Rock | Sand> {
	get cave() {
		return this.grid;
	}

	sandSource = fromCoordinates('500,0');

	constructor(
		input: string[],
		protected withFloor = false,
	) {
		super(walkPath(input));

		this.minX = Math.min(this.minX, this.sandSource.x);
		this.maxX = Math.max(this.maxX, this.sandSource.x);
		this.maxY = Math.max(this.maxY, this.sandSource.y);

		if (withFloor) {
			this.maxY += 2;
		}
	}

	get floor() {
		return this.maxY;
	}

	simulate() {
		return Array.from(this.simulateSand());
	}

	*simulateSand() {
		let sand = new Sand(this.sandSource.x, this.sandSource.y);

		while (!this.freeFall(sand)) {
			if (this.canMoveDown(sand)) {
				sand.moveDown();
			} else if (this.canMoveDownLeft(sand)) {
				sand.moveDownLeft();
			} else if (this.canMoveDownRight(sand)) {
				sand.moveDownRight();
			} else {
				this.cave.set(sand.coordinates, sand);
				yield sand;
				sand = new Sand(this.sandSource.x, this.sandSource.y);
			}
		}
	}

	canMoveDown(sand: Sand) {
		let adjacent = this.adjacentDown(sand);

		if (this.withFloor && this.onFloor(sand)) {
			adjacent = new Rock(sand.x, this.maxY);
		}

		return adjacent === undefined;
	}

	canMoveDownLeft(sand: Sand) {
		let adjacent = this.adjacentDownLeft(sand);

		if (this.withFloor && this.onFloor(sand)) {
			adjacent = new Rock(sand.x - 1, this.maxY);
		}

		return adjacent === undefined;
	}

	canMoveDownRight(sand: Sand) {
		let adjacent = this.adjacentDownRight(sand);

		if (this.withFloor && this.onFloor(sand)) {
			adjacent = new Rock(sand.x + 1, this.maxY);
		}

		return adjacent === undefined;
	}

	freeFall(sand: Sand) {
		if (this.withFloor) {
			return this.cave.has('500,0');
		}

		return sand.x < this.minX || sand.x > this.maxX || sand.y > this.maxY;
	}

	onFloor(sand: Sand) {
		return sand.y + 1 === this.maxY;
	}
}

function* walkPath(input: string[]) {
	for (const path of input) {
		for (const {previous, current} of walk(path.split(' -> '))) {
			const start = fromCoordinates((previous ?? current) as Coordinates);
			const end = fromCoordinates(current as Coordinates);

			if (start.x < end.x) {
				for (const x of range(start.x, end.x + 1)) {
					yield new Rock(x, start.y);
				}
			} else if (start.x > end.x) {
				for (const x of range(end.x, start.x + 1)) {
					yield new Rock(x, start.y);
				}
			} else if (start.y < end.y) {
				for (const y of range(start.y, end.y + 1)) {
					yield new Rock(start.x, y);
				}
			} else if (start.y > end.y) {
				for (const y of range(end.y, start.y)) {
					yield new Rock(start.x, y);
				}
			}
		}
	}
}

export const partOne = (input: string[]) => {
	const cave = new Cave(input);
	const sand = cave.simulate();
	return sand.length;
};

export const partTwo = (input: string[]) => {
	const withFloor = true;
	const cave = new Cave(input, withFloor);
	const sand = cave.simulate();
	return sand.length;
};
