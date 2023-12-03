import test from 'ava';
import {createDayMacro} from '../create-day-macro.js';
import {readLines} from '../read-input.js';
import * as dayOne from './day-1.js';

const {partOne, partTwo} = createDayMacro(dayOne);

const testInput = ['1abc2', 'pqr3stu8vwx', 'a1b2c3d4e5f', 'treb7uchet'];

test('part one: example', partOne, testInput, 142);

test('part one', partOne, readLines('2023/day-1'), 55_834);

const partTwoTestInput = [
	'two1nine',
	'eightwothree',
	'abcone2threexyz',
	'xtwone3four',
	'4nineeightseven2',
	'zoneight234',
	'7pqrstsixteen',
];

test('part two: example', partTwo, partTwoTestInput, 281);

test('part two', partTwo, readLines('2023/day-1'), 53_221);
