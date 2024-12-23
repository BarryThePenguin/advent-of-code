import test from 'ava';
import {createDayMacro} from '../create-day-macro.ts';
import {readLines} from '../read-input.ts';
import * as dayOne from './day-11.ts';

const {partOne, partTwo} = createDayMacro(dayOne);

const testInput = [
	'5483143223',
	'2745854711',
	'5264556173',
	'6141336146',
	'6357385478',
	'4167524645',
	'2176841721',
	'6882881134',
	'4846848554',
	'5283751526',
];

test('part one: example', partOne, testInput, 1656);

test('part one', partOne, readLines('2021/day-11'), 1747);

test('part two: example', partTwo, testInput, 195);

test('part two', partTwo, readLines('2021/day-11'), 505);
