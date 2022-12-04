import test from 'ava';
import {createDayMacro} from '../create-day-macro.js';
import {readLines} from '../read-input.js';
import * as dayOne from './day-10.js';

const {partOne, partTwo} = createDayMacro(dayOne);

const testInput = [
	'[({(<(())[]>[[{[]{<()<>>',
	'[(()[<>])]({[<{<<[]>>(',
	'{([(<{}[<>[]}>{[]{[(<()>',
	'(((({<>}<{<{<>}{[]{[]{}',
	'[[<[([]))<([[{}[[()]]]',
	'[{[{({}]{}}([{[{{{}}([]',
	'{<[[]]>}<{[{[{[]{()[[[]',
	'[<(<(<(<{}))><([]([]()',
	'<{([([[(<>()){}]>(<<{{',
	'<{([{{}}[<[[[<>{}]]]>[]]',
];

test('part one: example', partOne, testInput, 26_397);

test('part one', partOne, readLines('2021/day-10'), 392_043);

test('part two: example', partTwo, testInput, 288_957);

test('part two', partTwo, readLines('2021/day-10'), 1_605_968_119);
