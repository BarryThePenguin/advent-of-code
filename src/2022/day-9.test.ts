import test from 'ava';
import {createDayMacro} from '../create-day-macro.ts';
import {readLines} from '../read-input.ts';
import * as dayOne from './day-9.ts';

const {partOne, partTwo} = createDayMacro(dayOne);

const testOneInput = ['R 4', 'U 4', 'L 3', 'D 1', 'R 4', 'D 1', 'L 5', 'R 2'];

const testTwoInput = [
	'R 5',
	'U 8',
	'L 8',
	'D 3',
	'R 17',
	'D 10',
	'L 25',
	'U 20',
];

test('part one: example', partOne, testOneInput, 13);

test('part one', partOne, readLines('2022/day-9'), 5878);

test('part two: example', partTwo, testTwoInput, 36);

test('part two', partTwo, readLines('2022/day-9'), 2405);
