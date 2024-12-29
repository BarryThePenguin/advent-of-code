import {test} from 'vitest';
import {day} from './day-11.ts';

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

test('part one: example', day.partOne(testInput, 1656));

test('part one', day.partOne(day.readLines('2021/day-11'), 1747));

test('part two: example', day.partTwo(testInput, 195));

test('part two', day.partTwo(day.readLines('2021/day-11'), 505));
