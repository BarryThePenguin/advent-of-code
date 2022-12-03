import test from 'ava';
import {createDayMacro} from '../create-day-macro.js';
import {readLines} from '../read-input.js';
import * as dayOne from './day-9.js';

const {partOne, partTwo} = createDayMacro(dayOne);

const testInput = [
	'2199943210',
	'3987894921',
	'9856789892',
	'8767896789',
	'9899965678',
];

test('part one: example', partOne, testInput, 15);

test('part one', partOne, readLines('2021/day-9'), 465);

test('part two: example', partTwo, testInput, 1134);

test('part two', partTwo, readLines('2021/day-9'), 1_269_555);
