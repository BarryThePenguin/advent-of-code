import {test} from 'vitest';
import {day} from './day-4.ts';

const testInput = [
	'2-4,6-8',
	'2-3,4-5',
	'5-7,7-9',
	'2-8,3-7',
	'6-6,4-6',
	'2-6,4-8',
];

test('part one: example', day.partOne(testInput, 2));

test('part one', day.partOne(day.readLines('2022/day-4'), 588));

test('part two: example', day.partTwo(testInput, 4));

test('part two', day.partTwo(day.readLines('2022/day-4'), 911));
