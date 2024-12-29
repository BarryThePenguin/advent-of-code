import {createDay} from '../day-test.ts';
import {chunk} from '../chunk.ts';
import {intersects, range, type Range} from '../range.ts';

type MapInput = {
	dest: Range;
	source: Range;
};

type TransformFunction = (location: Range, input: MapInput) => Range;

type FindFunction = (input: MapInput) => Range;

function compose(...maps: GardenMap[]) {
	return (find: FindFunction) =>
		(location: Range, transform: TransformFunction) => {
			let result = location;

			for (const map of maps) {
				const entry = map.get(result, find);
				if (entry) {
					result = transform(result, entry);
				}
			}

			return result;
		};
}

class GardenMap {
	map: MapInput[] = [];

	constructor(public type: string) {}

	add(input: MapInput) {
		this.map.push(input);
	}

	get(location: Range, find: FindFunction) {
		return this.map.find((entry) => {
			const range = find(entry);
			console.log({location, range, interects: intersects(range, location)});
			return intersects(range, location);
		});
	}
}

const categoryMap = /(\d+) (\d+) (\d+)/;

const seedsRegex = /seeds: (.+)/;

class Almanac {
	seeds: Iterable<Range> = [];

	seedToSoilMap = new GardenMap('seed-to-soil');

	soilToFertilizerMap = new GardenMap('soil-to-fertilizer');

	fertilizerToWaterMap = new GardenMap('fertilizer-to-water');

	waterToLightMap = new GardenMap('water-to-light');

	lightToTemperatureMap = new GardenMap('light-to-temperature');

	temperatureToHumidityMap = new GardenMap('temperature-to-humidity');

	humidityToLocationMap = new GardenMap('humidity-to-location');

	seedByLocation = compose(
		this.humidityToLocationMap,
		this.temperatureToHumidityMap,
		this.lightToTemperatureMap,
		this.waterToLightMap,
		this.fertilizerToWaterMap,
		this.soilToFertilizerMap,
		this.seedToSoilMap,
	);

	locationBySeed = compose(
		this.seedToSoilMap,
		this.soilToFertilizerMap,
		this.fertilizerToWaterMap,
		this.waterToLightMap,
		this.lightToTemperatureMap,
		this.temperatureToHumidityMap,
		this.humidityToLocationMap,
	);

	constructor(
		input: Iterable<string>,
		parseSeeds: (seeds: string) => Iterable<Range>,
	) {
		let map = this.seedToSoilMap;

		for (const value of input) {
			const [, seedsInput] = seedsRegex.exec(value) ?? [];

			if (seedsInput) {
				this.seeds = parseSeeds(seedsInput);
			} else {
				switch (value) {
					case 'seed-to-soil map:': {
						map = this.seedToSoilMap;
						break;
					}

					case 'soil-to-fertilizer map:': {
						map = this.soilToFertilizerMap;
						break;
					}

					case 'fertilizer-to-water map:': {
						map = this.fertilizerToWaterMap;
						break;
					}

					case 'water-to-light map:': {
						map = this.waterToLightMap;
						break;
					}

					case 'light-to-temperature map:': {
						map = this.lightToTemperatureMap;
						break;
					}

					case 'temperature-to-humidity map:': {
						map = this.temperatureToHumidityMap;
						break;
					}

					case 'humidity-to-location map:': {
						map = this.humidityToLocationMap;
						break;
					}

					case '': {
						break;
					}

					default: {
						const [, destination = 0, start = 0, count = 0] =
							categoryMap.exec(value)?.map(Number) ?? [];

						map.add({
							dest: range(destination, destination + count - 1),
							source: range(start, start + count - 1),
						});
					}
				}
			}
		}
	}

	isPresent(seed: number) {
		return Iterator.from(this.seeds).some((range) => range.has(seed));
	}

	lowestLocation(transform: TransformFunction) {
		const locations = [];

		const getLocationBySeed = this.locationBySeed(({source}) => source);

		for (const seed of this.seeds) {
			locations.push(getLocationBySeed(seed, transform));
		}

		return Math.min(...locations.map((range) => range.start));
	}

	firstSeedLocation(transform: TransformFunction) {
		const maxLocation = Math.max(
			...Array.from(this.seeds, (range) => range.end),
		);

		const getSeedByLocation = this.seedByLocation(({dest}) => dest);

		const location = range(0, maxLocation);
		const seed = getSeedByLocation(location, transform);

		if (this.isPresent(seed.start)) {
			return location;
		}

		throw new Error('No seed found');
	}
}

export const day = createDay({
	partOne(input: Iterable<string>) {
		const almanac = new Almanac(input, function* (seeds) {
			for (const seed of seeds) {
				const rangeStart = Number(seed);
				yield range(rangeStart, rangeStart);
			}
		});

		return almanac.lowestLocation((location, {dest, source}) => {
			const difference = location.start - source.start;
			const newStart = dest.start + difference;
			const newEnd = dest.end - difference;
			console.log({location, dest, source, newStart, newEnd});
			return range(newStart, newEnd);
		});
	},

	partTwo(input: Iterable<string>) {
		const almanac = new Almanac(input, function* (seeds) {
			for (const [start, count] of chunk(seeds, 2)) {
				const rangeStart = Number(start);
				const rangeEnd = rangeStart + Number(count) - 1;

				yield range(rangeStart, rangeEnd);
			}
		});

		return almanac.firstSeedLocation((location, {dest, source}) => {
			const difference = location.start - source.start;
			const newStart = dest.start + difference;
			const newEnd = dest.end - difference;
			return range(newStart, newEnd);
		});
	},
});
