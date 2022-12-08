import test from 'ava';
import {createDayMacro} from '../create-day-macro.js';
import {readInput} from '../read-input.js';
import * as dayOne from './day-6.js';

const {partOne, partTwo} = createDayMacro(dayOne);

const testInput = [
	{input: 'mjqjpqmgbljsphdztnvjfqwrcgsmlb', resultOne: 7, resultTwo: 19},
	{input: 'bvwbjplbgvbhsrlpgdmjqwftvncz', resultOne: 5, resultTwo: 23},
	{input: 'nppdvjthqldpwncqszvftbrmjlhg', resultOne: 6, resultTwo: 23},
	{input: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', resultOne: 10, resultTwo: 29},
	{input: 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', resultOne: 11, resultTwo: 26},
];

for (const [index, {input, resultOne}] of testInput.entries()) {
	test(`part one: example ${index}`, partOne, input, resultOne);
}

test('part one', partOne, readInput('2022/day-6'), 1651);

for (const [index, {input, resultTwo}] of testInput.entries()) {
	test(`part two: example ${index}`, partTwo, input, resultTwo);
}

test('part two', partTwo, readInput('2022/day-6'), 3837);
