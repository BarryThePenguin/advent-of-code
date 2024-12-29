import {test} from 'vitest';
import {day} from './day-2.ts';

const testInput = [
	'forward 5',
	'down 5',
	'forward 8',
	'up 3',
	'down 8',
	'forward 2',
];

test('part one: example', day.partOne(testInput, 150));

test('part one', day.partOne(day.readLines('2021/day-2'), 1_804_520));

test('part two: example', day.partTwo(testInput, 900));

test('part two', day.partTwo(day.readLines('2021/day-2'), 1_971_095_320));
