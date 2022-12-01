import test from 'ava';
import {createDayMacro} from '../create-day-macro.js';
import {readLines} from '../read-input.js';
import * as dayOne from './day-1.js';

const {partOne, partTwo} = createDayMacro(dayOne);

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

test('part one: example', partOne, testInput, 24_000);

test('part one', partOne, readLines('2022/day-1'), 72_602);

test('part two: example', partTwo, testInput, 45_000);

test('part two', partTwo, readLines('2022/day-1'), 207_410);
