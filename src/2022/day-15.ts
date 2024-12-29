import {createDay} from '../day-test.ts';
import {distance, Range} from '../to-grid.ts';
import * as parse from '../parse.ts';

class Beacon {
	constructor(
		public x: number,
		public y: number,
	) {}
}

class Sensor {
	constructor(
		public x: number,
		public y: number,
		public beacon: Beacon,
	) {}

	get distance() {
		return distance(this, this.beacon);
	}

	coverage(row: number) {
		const yOffset = distance({x: this.x, y: row}, this);

		if (yOffset <= this.distance) {
			const startX = this.x - (this.distance - yOffset);
			const endX = this.x + (this.distance - yOffset);
			return new Range(startX, endX);
		}

		return undefined;
	}

	*edges(max: number) {
		for (const xo of [-1, 1]) {
			for (const yo of [-1, 1]) {
				for (let dx = 0; dx <= this.distance + 1; dx++) {
					const dy = this.distance + 1 - dx;
					const x = this.x + dx * xo;
					const y = this.y + dy * yo;

					if (x >= 0 && y >= 0 && x <= max && y <= max) {
						yield {x, y};
					}
				}
			}
		}
	}
}

class ScanRange {
	bands: Range[] = [];

	add(range: Range) {
		this.bands.push(range);
		this.bands.sort((a, b) => a.start - b.start);
	}

	get distance() {
		let range: Range | undefined;

		for (const band of this.bands) {
			if (range) {
				range.add(band);
			} else {
				range = band;
			}
		}

		return range?.distance;
	}
}

class Tunnel {
	sensors: Sensor[] = [];

	constructor(input: Iterable<string>) {
		for (const value of input) {
			const [sensorX = 0, sensorY = 0, beaconX = 0, beaconY = 0] =
				parse.integers(value);

			const beacon = new Beacon(beaconX, beaconY);
			const sensor = new Sensor(sensorX, sensorY, beacon);

			this.sensors.push(sensor);
		}
	}

	scan(row: number) {
		const range = new ScanRange();

		for (const sensor of this.sensors) {
			const coverage = sensor.coverage(row);

			if (coverage) {
				range.add(coverage);
			}
		}

		return range;
	}

	tuningFrequency(max: number) {
		for (const sensor of this.sensors) {
			for (const edge of sensor.edges(max)) {
				if (
					this.sensors.every(
						(sensor) => distance(sensor, edge) > sensor.distance,
					)
				) {
					return edge.x * 4_000_000 + edge.y;
				}
			}
		}

		return undefined;
	}
}

export const day = createDay({
	partOne({input, row}: {input: Iterable<string>; row: number}) {
		const tunnel = new Tunnel(input);
		const result = tunnel.scan(row);
		return result.distance;
	},

	partTwo({input, max}: {input: Iterable<string>; max: number}) {
		const tunnel = new Tunnel(input);
		return tunnel.tuningFrequency(max);
	},
});
