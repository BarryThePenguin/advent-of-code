type Cell = {
	x: number;
	y: number;
	value: string;
};

export type Coordinates = `${number},${number}`;

export function toGrid<T extends {readonly coordinates: string}>(
	input: string[],
	create: (value: Cell) => T,
) {
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
