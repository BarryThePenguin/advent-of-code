type Cell = {
	x: number;
	y: number;
};

type CreateCell = Cell & {
	value: string;
};

export type Coordinates = `${number},${number}`;

export function toGrid<T extends {readonly coordinates: string}>(
	input: string[],
	create: (value: CreateCell) => T,
): Map<string, T> {
	const grid = new Map<string, T>();

	for (const coordinates of coordinatesFrom(input)) {
		const value = create(coordinates);
		grid.set(value.coordinates, value);
	}

	return grid;
}

export function toCoordinates(x: number, y: number): Coordinates {
	return `${x},${y}`;
}

function* coordinatesFrom(input: string[]) {
	for (const [y, entries] of input.entries()) {
		for (const [x, value] of entries.split('').entries()) {
			yield {x, y, value};
		}
	}
}

export type AdjacentCell = <T extends Cell>(
	grid: Map<string, T>,
	location: T,
) => T | undefined;

export const adjacentUp: AdjacentCell = (grid, {x, y}) =>
	grid.get(toCoordinates(x, y - 1));

export const adjacentDown: AdjacentCell = (grid, {x, y}) =>
	grid.get(toCoordinates(x, y + 1));

export const adjacentLeft: AdjacentCell = (grid, {x, y}) =>
	grid.get(toCoordinates(x - 1, y));

export const adjacentRight: AdjacentCell = (grid, {x, y}) =>
	grid.get(toCoordinates(x + 1, y));

export const adjacentUpLeft: AdjacentCell = (grid, {x, y}) =>
	grid.get(toCoordinates(x - 1, y - 1));

export const adjacentUpRight: AdjacentCell = (grid, {x, y}) =>
	grid.get(toCoordinates(x + 1, y - 1));

export const adjacentDownLeft: AdjacentCell = (grid, {x, y}) =>
	grid.get(toCoordinates(x - 1, y + 1));

export const adjacentDownRight: AdjacentCell = (grid, {x, y}) =>
	grid.get(toCoordinates(x + 1, y + 1));
