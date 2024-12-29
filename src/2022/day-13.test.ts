import {test} from 'vitest';
import {day} from './day-13.ts';

const testInput = [
	'[1,1,3,1,1]',
	'[1,1,5,1,1]',
	'',
	'[[1],[2,3,4]]',
	'[[1],4]',
	'',
	'[9]',
	'[[8,7,6]]',
	'',
	'[[4,4],4,4]',
	'[[4,4],4,4,4]',
	'',
	'[7,7,7,7]',
	'[7,7,7]',
	'',
	'[]',
	'[3]',
	'',
	'[[[]]]',
	'[[]]',
	'',
	'[1,[2,[3,[4,[5,6,7]]]],8,9]',
	'[1,[2,[3,[4,[5,6,0]]]],8,9]',
];

test('part one: example', day.partOne(testInput, 13));

test('part one', day.partOne(day.readLines('2022/day-13'), 4643));

test('part two: example', day.partTwo(testInput, 140));

test('part two', day.partTwo(day.readLines('2022/day-13'), 21_614));
