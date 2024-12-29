import {test} from 'vitest';
import {day} from './day-3.ts';

const testInput = [
	'vJrwpWtwJgWrhcsFMMfFFhFp',
	'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
	'PmmdzqPrVvPwwTWBwg',
	'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
	'ttgJtRGJQctTZtZT',
	'CrZsJsPPZsGzwwsLwLmpwMDw',
];

test('part one: example', day.partOne(testInput, 157));

test('part one', day.partOne(day.readLines('2022/day-3'), 8053));

test('part two: example', day.partTwo(testInput, 70));

test('part two', day.partTwo(day.readLines('2022/day-3'), 2425));
