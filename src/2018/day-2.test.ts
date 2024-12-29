import {test} from 'vitest';
import {day} from './day-2.ts';

const testInput = [
	'abcdef',
	'bababc',
	'abbcde',
	'abcccd',
	'aabcdd',
	'abcdee',
	'ababab',
];

test('part one: example', day.partOne(testInput, 12));

test('part one', day.partOne(day.readLines('2018/day-2'), 6370));

const partTwoTestInput = [
	'abcde',
	'fghij',
	'klmno',
	'pqrst',
	'fguij',
	'axcye',
	'wvxyz',
];

test('part two: example', day.partTwo(partTwoTestInput, 'fgij'));

test(
	'part two',
	day.partTwo(day.readLines('2018/day-2'), 'rmyxgdlihczskunpfijqcebtv'),
);
