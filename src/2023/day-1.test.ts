import {test} from 'vitest';
import {day} from './day-1.ts';

const testInput = ['1abc2', 'pqr3stu8vwx', 'a1b2c3d4e5f', 'treb7uchet'];

test('part one: example', day.partOne(testInput, 142));

test('part one', day.partOne(day.readLines('2023/day-1'), 55_834));

const partTwoTestInput = [
	'two1nine',
	'eightwothree',
	'abcone2threexyz',
	'xtwone3four',
	'4nineeightseven2',
	'zoneight234',
	'7pqrstsixteen',
];

test('part two: example', day.partTwo(partTwoTestInput, 281));

test('part two', day.partTwo(day.readLines('2023/day-1'), 53_221));
