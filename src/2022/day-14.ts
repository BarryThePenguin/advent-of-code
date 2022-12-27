import {walk} from '../chunk.js';
import {range} from '../range.js';
import {
	adjacentDown,
	adjacentDownLeft,
	adjacentDownRight,
	fromCoordinates,
	toCoordinates,
	fromGrid,
	type Coordinates,
} from '../to-grid.js';

class Rock {
	constructor(public x: number, public y: number) {}

	get coordinates() {
		return toCoordinates(this.x, this.y);
	}
}

class Sand {
	constructor(public x: number, public y: number) {}

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

class Cave {
	cave = new Map<Coordinates, Rock | Sand>();

	sandSource = fromCoordinates('500,0');

	minX = this.sandSource.x;

	maxX = this.sandSource.x;

	maxY = this.sandSource.y;

	constructor(input: string[], protected withFloor = false) {
		for (const {x, y} of walkPath(input)) {
			this.minX = Math.min(x, this.minX);
			this.maxX = Math.max(x, this.maxX);
			this.maxY = Math.max(y, this.maxY);
			const rock = new Rock(x, y);
			this.cave.set(rock.coordinates, rock);
		}

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
		let adjacent = adjacentDown(this.cave, sand);

		if (this.withFloor && this.onFloor(sand)) {
			adjacent = new Rock(sand.x, this.maxY);
		}

		return typeof adjacent === 'undefined';
	}

	canMoveDownLeft(sand: Sand) {
		let adjacent = adjacentDownLeft(this.cave, sand);

		if (this.withFloor && this.onFloor(sand)) {
			adjacent = new Rock(sand.x - 1, this.maxY);
		}

		return typeof adjacent === 'undefined';
	}

	canMoveDownRight(sand: Sand) {
		let adjacent = adjacentDownRight(this.cave, sand);

		if (this.withFloor && this.onFloor(sand)) {
			adjacent = new Rock(sand.x + 1, this.maxY);
		}

		return typeof adjacent === 'undefined';
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
					yield {x, y: start.y};
				}
			} else if (start.x > end.x) {
				for (const x of range(end.x, start.x + 1)) {
					yield {x, y: start.y};
				}
			} else if (start.y < end.y) {
				for (const y of range(start.y, end.y + 1)) {
					yield {x: start.x, y};
				}
			} else if (start.y > end.y) {
				for (const y of range(end.y, start.y)) {
					yield {x: start.x, y};
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
