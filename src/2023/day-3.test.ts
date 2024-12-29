import {test} from 'vitest';
import {day} from './day-3.ts';

const testInput = [
	'467..114..',
	'...*......',
	'..35..633.',
	'......#...',
	'617*......',
	'.....+.58.',
	'..592.....',
	'......755.',
	'...$.*....',
	'.664.598..',
];

test('part one: example', day.partOne(testInput, 4361));

test('part one', day.partOne(day.readLines('2023/day-3'), 540_212));

test('part two: example', day.partTwo(testInput, 467_835));

test('part two', day.partTwo(day.readLines('2023/day-3'), 87_605_697));
