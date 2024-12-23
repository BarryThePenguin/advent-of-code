import test from 'ava';
import {createDayMacro} from '../create-day-macro.ts';
import {readLines} from '../read-input.ts';
import * as dayOne from './day-14.ts';

const {partOne, partTwo} = createDayMacro(dayOne);

const testInput = [
	'498,4 -> 498,6 -> 496,6',
	'503,4 -> 502,4 -> 502,9 -> 494,9',
];

test('part one: example', partOne, testInput, 24);

test('part one', partOne, readLines('2022/day-14'), 638);

test('part two: example', partTwo, testInput, 93);

test('part two', partTwo, readLines('2022/day-14'), 31_722);
