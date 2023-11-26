import {toCoordinates, Grid} from '../to-grid.js';

class Octopus {
	flashed = false;

	constructor(
		public x: number,
		public y: number,
		public energyLevel: number,
	) {}

	get coordinates() {
		return toCoordinates(this.x, this.y);
	}

	charge() {
		this.energyLevel++;
	}

	flash() {
		if (!this.flashed) {
			this.flashed = this.energyLevel > 9;
			return this.flashed;
		}

		return false;
	}

	reset() {
		if (this.flashed) {
			this.energyLevel = 0;
			this.flashed = false;
		}
	}
}

class Cavern extends Grid<Octopus> {
	constructor(input: string[]) {
		super(
			Grid.coordinatesFrom(input, function* (x, y, value) {
				yield new Octopus(x, y, Number(value));
			}),
		);
	}

	step() {
		const highlighted = new Map<string, Octopus>();

		for (const octopus of this.grid.values()) {
			octopus.charge();
		}

		for (const octopus of this.grid.values()) {
			this.flash(octopus, highlighted);
		}

		for (const octopus of this.grid.values()) {
			octopus.reset();
		}

		return highlighted;
	}

	flash(octopus: Octopus, highlighted: Map<string, Octopus>) {
		if (octopus.flash()) {
			highlighted.set(octopus.coordinates, octopus);
			this.chargeAdjacent(octopus, highlighted);
		}
	}

	charge(octopus: Octopus, highlighted: Map<string, Octopus>) {
		octopus.charge();
		this.flash(octopus, highlighted);
	}

	chargeAdjacent(octopus: Octopus, highlighted: Map<string, Octopus>) {
		const up = this.adjacentUp(octopus);
		const down = this.adjacentDown(octopus);
		const left = this.adjacentLeft(octopus);
		const right = this.adjacentRight(octopus);
		const upLeft = this.adjacentUpLeft(octopus);
		const upRight = this.adjacentUpRight(octopus);
		const downLeft = this.adjacentDownLeft(octopus);
		const downRight = this.adjacentDownRight(octopus);

		if (up) {
			this.charge(up, highlighted);
		}

		if (down) {
			this.charge(down, highlighted);
		}

		if (left) {
			this.charge(left, highlighted);
		}

		if (right) {
			this.charge(right, highlighted);
		}

		if (upLeft) {
			this.charge(upLeft, highlighted);
		}

		if (upRight) {
			this.charge(upRight, highlighted);
		}

		if (downLeft) {
			this.charge(downLeft, highlighted);
		}

		if (downRight) {
			this.charge(downRight, highlighted);
		}
	}
}

function energyLevels(grid: Map<string, Octopus>) {
	const value: number[][] = [];

	for (const octopus of grid.values()) {
		const row = value[octopus.y] ?? [];
		row[octopus.x] = octopus.energyLevel;
		value[octopus.y] = row;
	}

	return value.flat();
}

function every(items: number[], value: number) {
	return items.every((item) => item === value);
}

export const partOne = (input: string[]) => {
	const cavern = new Cavern(input);

	const flashes = [];

	for (let i = 0; i < 100; i++) {
		flashes.push(...cavern.step().values());
	}

	return flashes.length;
};

export const partTwo = (input: string[]) => {
	const cavern = new Cavern(input);

	let step = 0;
	let levels: number[] = [1];

	while (!every(levels, 0)) {
		cavern.step();
		levels = energyLevels(cavern.grid);
		step++;
	}

	return step;
};
