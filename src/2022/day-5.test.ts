import test from 'ava';
import {createDayMacro} from '../create-day-macro.ts';
import {readLines} from '../read-input.ts';
import * as dayOne from './day-5.ts';

const {partOne, partTwo} = createDayMacro(dayOne);

const testInput = [
	'    [D]    ',
	'[N] [C]    ',
	'[Z] [M] [P]',
	' 1   2   3 ',
	'',
	'move 1 from 2 to 1',
	'move 3 from 1 to 3',
	'move 2 from 2 to 1',
	'move 1 from 1 to 2',
];

test('part one: example', partOne, testInput, 'CMZ');

test('part one', partOne, readLines('2022/day-5'), 'FCVRLMVQP');

test('part two: example', partTwo, testInput, 'MCD');

test('part two', partTwo, readLines('2022/day-5'), 'RWLWGJGFD');
