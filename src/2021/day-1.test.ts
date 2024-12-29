import {test} from 'vitest';
import {day} from './day-1.ts';

const testInput = [
	'199',
	'200',
	'208',
	'210',
	'200',
	'207',
	'240',
	'269',
	'260',
	'263',
];

test('part one: example', day.partOne(testInput, 7));

test('part one', day.partOne(day.readLines('2021/day-1'), 1616));

test('part two: example', day.partTwo(testInput, 5));

test('part two', day.partTwo(day.readLines('2021/day-1'), 1645));
