import {test} from 'vitest';
import {day} from './day-2.js';

const testInput = [
	'7 6 4 2 1',
	'1 2 7 8 9',
	'9 7 6 2 1',
	'1 3 2 4 5',
	'8 6 4 4 1',
	'1 3 6 7 9',
];

test('part one: example', day.partOne(testInput, 2));

test('part one', day.partOne(day.readLines('2024/day-2'), 564));

test('part two: example', day.partTwo(testInput, 4));

test('part two', day.partTwo(day.readLines('2024/day-2'), 604));
