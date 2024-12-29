import {test} from 'vitest';
import {day} from './day-9.ts';

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

test('part one: example', day.partOne(testOneInput, 13));

test('part one', day.partOne(day.readLines('2022/day-9'), 5878));

test('part two: example', day.partTwo(testTwoInput, 36));

test('part two', day.partTwo(day.readLines('2022/day-9'), 2405));
