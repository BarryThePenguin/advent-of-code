import test from 'ava';
import {createDayMacro} from '../create-day-macro.ts';
import {readLines} from '../read-input.ts';
import * as dayTwo from './day-2.ts';

const {partOne, partTwo} = createDayMacro(dayTwo);

const testInput = [
	'forward 5',
	'down 5',
	'forward 8',
	'up 3',
	'down 8',
	'forward 2',
];

test('part one: example', partOne, testInput, 150);

test('part one', partOne, readLines('2021/day-2'), 1_804_520);

test('part two: example', partTwo, testInput, 900);

test('part two', partTwo, readLines('2021/day-2'), 1_971_095_320);
