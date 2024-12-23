import test from 'ava';
import {createDayMacro} from '../create-day-macro.ts';
import {readLines} from '../read-input.ts';
import * as dayOne from './day-13.ts';

const {partOne, partTwo} = createDayMacro(dayOne);

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

test('part one: example', partOne, testInput, 13);

test('part one', partOne, readLines('2022/day-13'), 4643);

test('part two: example', partTwo, testInput, 140);

test('part two', partTwo, readLines('2022/day-13'), 21_614);
