import {test} from 'vitest';
import {day} from './day-3.ts';

const testInput = [
	'00100',
	'11110',
	'10110',
	'10111',
	'10101',
	'01111',
	'00111',
	'11100',
	'10000',
	'11001',
	'00010',
	'01010',
];

test('part one: example', day.partOne(testInput, 198));

test('part one', day.partOne(day.readLines('2021/day-3'), 775_304));

test('part two: example', day.partTwo(testInput, 230));

test('part two', day.partTwo(day.readLines('2021/day-3'), 1_370_737));
