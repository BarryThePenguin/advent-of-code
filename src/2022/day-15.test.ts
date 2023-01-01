import test from 'ava';
import {createDayMacro} from '../create-day-macro.js';
import {readLines} from '../read-input.js';
import * as dayOne from './day-15.js';

const {partOne, partTwo} = createDayMacro(dayOne);

const testInput = [
	'Sensor at x=2, y=18: closest beacon is at x=-2, y=15',
	'Sensor at x=9, y=16: closest beacon is at x=10, y=16',
	'Sensor at x=13, y=2: closest beacon is at x=15, y=3',
	'Sensor at x=12, y=14: closest beacon is at x=10, y=16',
	'Sensor at x=10, y=20: closest beacon is at x=10, y=16',
	'Sensor at x=14, y=17: closest beacon is at x=10, y=16',
	'Sensor at x=8, y=7: closest beacon is at x=2, y=10',
	'Sensor at x=2, y=0: closest beacon is at x=2, y=10',
	'Sensor at x=0, y=11: closest beacon is at x=2, y=10',
	'Sensor at x=20, y=14: closest beacon is at x=25, y=17',
	'Sensor at x=17, y=20: closest beacon is at x=21, y=22',
	'Sensor at x=16, y=7: closest beacon is at x=15, y=3',
	'Sensor at x=14, y=3: closest beacon is at x=15, y=3',
	'Sensor at x=20, y=1: closest beacon is at x=15, y=3',
];

test('part one: example', partOne, {input: testInput, row: 10}, 26);

test(
	'part one',
	partOne,
	{input: readLines('2022/day-15'), row: 2_000_000},
	5_688_618,
);

test('part two: example', partTwo, {input: testInput, max: 20}, 56_000_011);

test(
	'part two',
	partTwo,
	{input: readLines('2022/day-15'), max: 4_000_000},
	12_625_383_204_261,
);
