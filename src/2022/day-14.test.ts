import {test} from 'vitest';
import {day} from './day-14.ts';

const testInput = [
	'498,4 -> 498,6 -> 496,6',
	'503,4 -> 502,4 -> 502,9 -> 494,9',
];

test('part one: example', day.partOne(testInput, 24));

test('part one', day.partOne(day.readLines('2022/day-14'), 638));

test('part two: example', day.partTwo(testInput, 93));

test('part two', day.partTwo(day.readLines('2022/day-14'), 31_722));
