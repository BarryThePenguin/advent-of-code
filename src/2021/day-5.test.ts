import {test} from 'vitest';
import {day} from './day-5.ts';

const testInput = [
	'0,9 -> 5,9',
	'8,0 -> 0,8',
	'9,4 -> 3,4',
	'2,2 -> 2,1',
	'7,0 -> 7,4',
	'6,4 -> 2,0',
	'0,9 -> 2,9',
	'3,4 -> 1,4',
	'0,0 -> 8,8',
	'5,5 -> 8,2',
];

test('part one: example', day.partOne(testInput, 5));

test('part one', day.partOne(day.readLines('2021/day-5'), 5585));

test('part two: example', day.partTwo(testInput, 12));

test('part two', day.partTwo(day.readLines('2021/day-5'), 17_193));
