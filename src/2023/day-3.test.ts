import test from 'ava';
import {createDayMacro} from '../create-day-macro.ts';
import {readLines} from '../read-input.ts';
import * as dayOne from './day-3.ts';

const {partOne, partTwo} = createDayMacro(dayOne);

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

test('part one: example', partOne, testInput, 4361);

test('part one', partOne, readLines('2023/day-3'), 540_212);

test('part two: example', partTwo, testInput, 467_835);

test('part two', partTwo, readLines('2023/day-3'), 87_605_697);
