import {createDay} from '../day-test.ts';
import {toCoordinates, Grid} from '../to-grid.ts';

class Location {
	constructor(
		public x: number,
		public y: number,
		public height: number,
	) {}

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

class HeightMap extends Grid<Location> {
	get locations() {
		return this.grid;
	}

	constructor(input: Iterable<string>) {
		super(
			Grid.coordinatesFrom(
				input,
				(x, y, value) => new Location(x, y, Number(value)),
			),
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
		const up = this.adjacentUp(location);
		const down = this.adjacentDown(location);
		const left = this.adjacentLeft(location);
		const right = this.adjacentRight(location);

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

		return basins.sort((a, b) => b.size - a.size).map((basin) => basin.size);
	}

	findBasinLocations(location: Location, basin: Basin) {
		const up = this.adjacentUp(location);
		const down = this.adjacentDown(location);
		const left = this.adjacentLeft(location);
		const right = this.adjacentRight(location);

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

export const day = createDay({
	partOne(input: Iterable<string>) {
		const heightMap = new HeightMap(input);

		const lowpoints = heightMap.findLowPoints();

		return lowpoints.reduce((a, location) => a + location.height + 1, 0);
	},

	partTwo(input: Iterable<string>) {
		const heightMap = new HeightMap(input);

		const [one = 0, two = 0, three = 0] = heightMap.findBasins();

		return one * two * three;
	},
});
