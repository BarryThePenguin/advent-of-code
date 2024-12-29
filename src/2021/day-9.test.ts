import {test} from 'vitest';
import {day} from './day-9.ts';

const testInput = [
	'2199943210',
	'3987894921',
	'9856789892',
	'8767896789',
	'9899965678',
];

test('part one: example', day.partOne(testInput, 15));

test('part one', day.partOne(day.readLines('2021/day-9'), 465));

test('part two: example', day.partTwo(testInput, 1134));

test('part two', day.partTwo(day.readLines('2021/day-9'), 1_269_555));
