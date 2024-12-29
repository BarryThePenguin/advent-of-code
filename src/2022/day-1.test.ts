import {test} from 'vitest';
import {day} from './day-1.ts';

const testInput = [
	'1000',
	'2000',
	'3000',
	'',
	'4000',
	'',
	'5000',
	'6000',
	'',
	'7000',
	'8000',
	'9000',
	'',
	'10000',
];

test('part one: example', day.partOne(testInput, 24_000));

test('part one', day.partOne(day.readLines('2022/day-1'), 72_602));

test('part two: example', day.partTwo(testInput, 45_000));

test('part two', day.partTwo(day.readLines('2022/day-1'), 207_410));
