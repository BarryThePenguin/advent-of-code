import test from 'ava';
import {createDayMacro} from '../create-day-macro.ts';
import {readLines} from '../read-input.ts';
import * as dayOne from './day-4.ts';

const {partOne, partTwo} = createDayMacro(dayOne);

const testInput = [
	'2-4,6-8',
	'2-3,4-5',
	'5-7,7-9',
	'2-8,3-7',
	'6-6,4-6',
	'2-6,4-8',
];

test('part one: example', partOne, testInput, 2);

test('part one', partOne, readLines('2022/day-4'), 588);

test('part two: example', partTwo, testInput, 4);

test('part two', partTwo, readLines('2022/day-4'), 911);
