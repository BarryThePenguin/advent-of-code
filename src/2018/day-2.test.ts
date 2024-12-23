import test from 'ava';
import {createDayMacro} from '../create-day-macro.ts';
import {readLines} from '../read-input.ts';
import * as dayTwo from './day-2.ts';

const {partOne, partTwo} = createDayMacro(dayTwo);

const testInput = [
	'abcdef',
	'bababc',
	'abbcde',
	'abcccd',
	'aabcdd',
	'abcdee',
	'ababab',
];

test('part one: example', partOne, testInput, 12);

test('part one', partOne, readLines('2018/day-2'), 6370);

const partTwoTestInput = [
	'abcde',
	'fghij',
	'klmno',
	'pqrst',
	'fguij',
	'axcye',
	'wvxyz',
];

test('part two: example', partTwo, partTwoTestInput, 'fgij');

test('part two', partTwo, readLines('2018/day-2'), 'rmyxgdlihczskunpfijqcebtv');
