import {entries} from './chunk.ts';

type Cell = {
	x: number;
	y: number;
};

export type Coordinates = `${number},${number}`;

type GridItem = Cell & {
	readonly coordinates: Coordinates;
};

export abstract class Grid<Item extends GridItem> {
	static coordinatesFrom = function* <Item>(
		input: string[],
		create: (x: number, y: number, value: string) => Item,
	) {
		for (const [y, yValues] of input.entries()) {
			for (const [x, value] of entries(yValues)) {
				yield create(x, y, value);
			}
		}
	};

	grid = new Map<Coordinates, Item>();

	minX = Number.POSITIVE_INFINITY;

	maxX = 0;

	minY = Number.POSITIVE_INFINITY;

	maxY = 0;

	constructor(input: Iterable<Item>) {
		for (const value of input) {
			this.grid.set(value.coordinates, value);

			this.minX = Math.min(value.x, this.minX);
			this.maxX = Math.max(value.x, this.maxX);
			this.minY = Math.max(value.y, this.maxY);
			this.maxY = Math.max(value.y, this.maxY);
		}
	}

	adjacent(location: Cell) {
		const edges = [];

		const up = this.adjacentUp(location);
		const down = this.adjacentDown(location);
		const left = this.adjacentLeft(location);
		const right = this.adjacentRight(location);

		if (up) {
			edges.push(up);
		}

		if (down) {
			edges.push(down);
		}

		if (left) {
			edges.push(left);
		}

		if (right) {
			edges.push(right);
		}

		return edges;
	}

	adjacentUp({x, y}: Cell) {
		return this.getCoordinates(x, y - 1);
	}

	adjacentDown({x, y}: Cell) {
		return this.getCoordinates(x, y + 1);
	}

	adjacentLeft({x, y}: Cell) {
		return this.getCoordinates(x - 1, y);
	}

	adjacentRight({x, y}: Cell) {
		return this.getCoordinates(x + 1, y);
	}

	adjacentUpLeft({x, y}: Cell) {
		return this.getCoordinates(x - 1, y - 1);
	}

	adjacentUpRight({x, y}: Cell) {
		return this.getCoordinates(x + 1, y - 1);
	}

	adjacentDownLeft({x, y}: Cell) {
		return this.getCoordinates(x - 1, y + 1);
	}

	adjacentDownRight({x, y}: Cell) {
		return this.getCoordinates(x + 1, y + 1);
	}

	debug(stringify: (value: Item) => string = String) {
		console.log(fromGrid(this.grid, stringify));
	}

	*getRow(row: number) {
		for (const data of this.grid.values()) {
			if (data.y === row) {
				yield data;
			}
		}
	}

	getCoordinates(x: number, y: number) {
		return this.grid.get(toCoordinates(x, y));
	}
}

export class Range {
	constructor(
		public start: number,
		public end: number,
	) {}

	get distance() {
		return this.end - this.start;
	}

	add(range: Range) {
		if (this.continuous(range)) {
			this.start = Math.min(this.start, range.start);
			this.end = Math.max(this.end, range.end);
		}
	}

	continuous(range: Range) {
		return this.start <= range.end && range.start <= this.end;
	}
}

export function fromGrid<T>(
	grid: Map<Coordinates, T>,
	stringify: (value: T) => string = String,
) {
	const output: string[][] = [];

	for (const [cell, data] of grid) {
		const {x, y} = fromCoordinates(cell);
		const row = output[y] ?? [];
		row[x] = stringify(data);
		output[y] = row;
	}

	return output.map((row) => row.join('')).join('\n');
}

export function distance(a: Cell, b: Cell) {
	return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

export function toCoordinates(x: number, y: number): Coordinates {
	return `${x},${y}`;
}

export function fromCoordinates(coordinates: Coordinates): Cell {
	const [x, y] = coordinates.split(',');
	return {x: Number(x), y: Number(y)};
}
