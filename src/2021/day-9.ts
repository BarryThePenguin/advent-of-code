import {
	toCoordinates,
	toGrid,
	adjacentUp,
	adjacentDown,
	adjacentLeft,
	adjacentRight,
} from '../to-grid.js';

class Location {
	constructor(public x: number, public y: number, public height: number) {}

	get coordinates() {
		return toCoordinates(this.x, this.y);
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

class HeightMap {
	locations: Map<string, Location>;

	constructor(input: string[]) {
		this.locations = toGrid(
			input,
			({x, y, value}) => new Location(x, y, Number(value)),
		);
	}

	findLowPoints() {
		const lowpoints: Location[] = [];

		for (const location of this.locations.values()) {
			if (this.isLowpoint(location)) {
				lowpoints.push(location);
			}
		}

		return lowpoints;
	}

	isLowpoint(location: Location) {
		const up = adjacentUp(this.locations, location);
		const down = adjacentDown(this.locations, location);
		const left = adjacentLeft(this.locations, location);
		const right = adjacentRight(this.locations, location);

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
		const up = adjacentUp(this.locations, location);
		const down = adjacentDown(this.locations, location);
		const left = adjacentLeft(this.locations, location);
		const right = adjacentRight(this.locations, location);

		if (up && up.height !== 9 && basin.addLocation(up)) {
			this.findBasinLocations(up, basin);
		}

		if (down && down.height !== 9 && basin.addLocation(down)) {
			this.findBasinLocations(down, basin);
		}

		if (left && left.height !== 9 && basin.addLocation(left)) {
			this.findBasinLocations(left, basin);
		}

		if (right && right.height !== 9 && basin.addLocation(right)) {
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
