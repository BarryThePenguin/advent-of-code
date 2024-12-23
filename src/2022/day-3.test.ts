import test from 'ava';
import {createDayMacro} from '../create-day-macro.ts';
import {readLines} from '../read-input.ts';
import * as dayOne from './day-3.ts';

const {partOne, partTwo} = createDayMacro(dayOne);

const testInput = [
	'vJrwpWtwJgWrhcsFMMfFFhFp',
	'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
	'PmmdzqPrVvPwwTWBwg',
	'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
	'ttgJtRGJQctTZtZT',
	'CrZsJsPPZsGzwwsLwLmpwMDw',
];

test('part one: example', partOne, testInput, 157);

test('part one', partOne, readLines('2022/day-3'), 8053);

test('part two: example', partTwo, testInput, 70);

test('part two', partTwo, readLines('2022/day-3'), 2425);
