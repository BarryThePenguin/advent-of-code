class Location {
	constructor(public x: number, public y: number, public height: number) {}

	get coordinates() {
		return `${this.x}${this.y}`;
	}
}

class Basin {
	constructor(public locations = new Map<string, Location>()) {}

	addLocation(location: Location) {
		const newLocation = !this.locations.has(location.coordinates);

		if (newLocation) {
			this.locations.set(location.coordinates, location);
		}

		return newLocation;
	}

	get size() {
		return this.locations.size;
	}
}

type AdjacentLocation = (location: Location) => (location: Location) => boolean;

const adjacentUp: AdjacentLocation =
	(location) =>
	({x, y}) =>
		x === location.x && y === location.y - 1;

const adjacentDown: AdjacentLocation =
	(location) =>
	({x, y}) =>
		x === location.x && y === location.y + 1;

const adjacentLeft: AdjacentLocation =
	(location) =>
	({x, y}) =>
		y === location.y && x === location.x - 1;

const adjacentRight: AdjacentLocation =
	(location) =>
	({x, y}) =>
		y === location.y && x === location.x + 1;

class HeightMap {
	locations: Location[] = [];

	constructor(input: string[]) {
		for (const [y, entries] of input.entries()) {
			for (const [x, height] of Array.from(entries).entries()) {
				this.locations.push(new Location(x, y, Number(height)));
			}
		}
	}

	findLowPoints() {
		const lowpoints: Location[] = [];

		for (const location of this.locations) {
			if (this.isLowpoint(location)) {
				lowpoints.push(location);
			}
		}

		return lowpoints;
	}

	isLowpoint(location: Location) {
		const up = this.locations.find(adjacentUp(location));
		const down = this.locations.find(adjacentDown(location));
		const left = this.locations.find(adjacentLeft(location));
		const right = this.locations.find(adjacentRight(location));

		let isLowpoint = true;

		if (up) {
			isLowpoint &&= location.height < up.height;
		}

		if (down) {
			isLowpoint &&= location.height < down.height;
		}

		if (left) {
			isLowpoint &&= location.height < left.height;
		}

		if (right) {
			isLowpoint &&= location.height < right.height;
		}

		return isLowpoint;
	}

	findBasins() {
		const basins: Basin[] = [];

		for (const lowpoint of this.findLowPoints()) {
			const basin = new Basin();

			basins.push(this.findBasinLocations(lowpoint, basin));
		}

		return basins;
	}

	findBasinLocations(location: Location, basin: Basin) {
		const up = this.locations.find(adjacentUp(location));
		const down = this.locations.find(adjacentDown(location));
		const left = this.locations.find(adjacentLeft(location));
		const right = this.locations.find(adjacentRight(location));

		if (up && up?.height !== 9 && basin.addLocation(up)) {
			this.findBasinLocations(up, basin);
		}

		if (down && down?.height !== 9 && basin.addLocation(down)) {
			this.findBasinLocations(down, basin);
		}

		if (left && left?.height !== 9 && basin.addLocation(left)) {
			this.findBasinLocations(left, basin);
		}

		if (right && right?.height !== 9 && basin.addLocation(right)) {
			this.findBasinLocations(right, basin);
		}

		return basin;
	}
}

export const partOne = (input: string[]) => {
	const heightMap = new HeightMap(input);

	const lowpoints = heightMap.findLowPoints();

	return lowpoints.reduce((a, location) => a + location.height + 1, 0);
};

export const partTwo = (input: string[]) => {
	const heightMap = new HeightMap(input);

	const basins = heightMap.findBasins();

	basins.sort((a, b) => b.size - a.size);

	const [one, two, three] = basins;

	return one.size * two.size * three.size;
};
