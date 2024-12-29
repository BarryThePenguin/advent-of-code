import {test} from 'vitest';
import {day} from './day-5.ts';

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

test('part one: example', day.partOne(testInput, 'CMZ'));

test('part one', day.partOne(day.readLines('2022/day-5'), 'FCVRLMVQP'));

test('part two: example', day.partTwo(testInput, 'MCD'));

test('part two', day.partTwo(day.readLines('2022/day-5'), 'RWLWGJGFD'));
