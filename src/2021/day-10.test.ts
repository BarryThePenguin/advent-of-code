import {test} from 'vitest';
import {day} from './day-10.ts';

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

test('part one: example', day.partOne(testInput, 26_397));

test('part one', day.partOne(day.readLines('2021/day-10'), 392_043));

test('part two: example', day.partTwo(testInput, 288_957));

test('part two', day.partTwo(day.readLines('2021/day-10'), 1_605_968_119));
