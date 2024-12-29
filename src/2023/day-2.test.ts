import {test} from 'vitest';
import {day} from './day-2.ts';

const testInput = [
	'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
	'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
	'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
	'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
	'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
];

test('part one: example', day.partOne(testInput, 8));

test('part one', day.partOne(day.readLines('2023/day-2'), 2406));

test('part two: example', day.partTwo(testInput, 2286));

test('part two', day.partTwo(day.readLines('2023/day-2'), 78_375));
