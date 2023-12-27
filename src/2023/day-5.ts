import {chunk} from '../iterable.js';
import {range, type Range} from '../range.js';

type MapInput = {
	dest: Range;
	source: Range;
};

type TransformFn = (location: number, input: MapInput) => number;

type FindFn = (input: MapInput) => Range;

function compose(...maps: GardenMap[]) {
	return (findFn: FindFn) => (location: number, transformFn: TransformFn) => {
		let result = location;

		for (const map of maps) {
			const entry = map.get(result, findFn);
			if (entry) {
				result = transformFn(result, entry);
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

	get(location: number, fn: FindFn) {
		return this.map.find((entry) => {
			const range = fn(entry);
			return range.includes(location);
		});
	}
}

class Almanac {
	seeds: Range[] = [];

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
		input: string[],
		parseSeeds: (seeds: string[]) => Iterable<Range>,
	) {
		let map = this.seedToSoilMap;

		const [seeds, ...otherInput] = input;

		const [, seedsInput] = seeds.split(': ');
		this.seeds = Array.from(parseSeeds(seedsInput.split(' ')));

		for (const value of otherInput) {
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
					const [dest, start, count] = value.split(' ').map(Number);

					map.add({
						dest: range(dest, dest + count - 1),
						source: range(start, start + count - 1),
					});
				}
			}
		}
	}

	isPresent(seed: number) {
		return this.seeds.some((range) => range.includes(seed));
	}

	lowestLocation(fn: TransformFn) {
		const locations = [];

		const getLocationBySeed = this.locationBySeed(({source}) => source);

		for (const seed of this.seeds) {
			locations.push(getLocationBySeed(seed.start, fn));
		}

		return Math.min(...locations);
	}

	firstSeedLocation(fn: TransformFn) {
		const maxLocation = Math.max(...this.seeds.map((range) => range.end));

		const getSeedByLocation = this.seedByLocation(({dest}) => dest);

		for (const location of range(0, maxLocation)) {
			const seed = getSeedByLocation(location, fn);

			if (this.isPresent(seed)) {
				return location;
			}
		}

		throw new Error('No seed found');
	}
}

export const partOne = (input: string[]) => {
	const almanac = new Almanac(input, function* (seeds) {
		for (const seed of seeds) {
			const rangeStart = Number(seed);
			yield range(rangeStart, rangeStart);
		}
	});

	return almanac.lowestLocation((location, {dest, source}) => {
		const difference = location - source.start;
		const newLocation = dest.start + difference;
		return newLocation;
	});
};

export const partTwo = (input: string[]) => {
	const almanac = new Almanac(input, function* (seeds) {
		for (const [start, count] of chunk(seeds, 2)) {
			const rangeStart = Number(start);
			const rangeEnd = rangeStart + Number(count) - 1;

			yield range(rangeStart, rangeEnd);
		}
	});

	return almanac.firstSeedLocation((location, {dest, source}) => {
		const difference = location - dest.start;
		const newLocation = source.start + difference;
		return newLocation;
	});
};
