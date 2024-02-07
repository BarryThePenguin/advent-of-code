import test from 'ava';
import {createDayMacro} from '../create-day-macro.js';
import {readLines} from '../read-input.js';
import * as dayOne from './day-5.js';

const {partOne, partTwo} = createDayMacro(dayOne);

const testInput = [
	'seeds: 79 14 55 13',
	'',
	'seed-to-soil map:',
	'50 98 2',
	'52 50 48',
	'',
	'soil-to-fertilizer map:',
	'0 15 37',
	'37 52 2',
	'39 0 15',
	'',
	'fertilizer-to-water map:',
	'49 53 8',
	'0 11 42',
	'42 0 7',
	'57 7 4',
	'',
	'water-to-light map:',
	'88 18 7',
	'18 25 70',
	'',
	'light-to-temperature map:',
	'45 77 23',
	'81 45 19',
	'68 64 13',
	'',
	'temperature-to-humidity map:',
	'0 69 1',
	'1 0 69',
	'',
	'humidity-to-location map:',
	'60 56 37',
	'56 93 4',
];

test.skip('part one: example', partOne, testInput, 35);

test.skip('part one', partOne, readLines('2023/day-5'), 510_109_797);

// test.skip('part two: example', partTwo, testInput, 46);

// test.skip('part two', partTwo, readLines('2023/day-5'), 9_622_622);
