import {test} from 'vitest';
import {day} from './day-6.ts';

const testInput = [
	{input: 'mjqjpqmgbljsphdztnvjfqwrcgsmlb', resultOne: 7, resultTwo: 19},
	{input: 'bvwbjplbgvbhsrlpgdmjqwftvncz', resultOne: 5, resultTwo: 23},
	{input: 'nppdvjthqldpwncqszvftbrmjlhg', resultOne: 6, resultTwo: 23},
	{input: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', resultOne: 10, resultTwo: 29},
	{input: 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', resultOne: 11, resultTwo: 26},
];

for (const [index, {input, resultOne}] of testInput.entries()) {
	test(`part one: example ${index}`, day.partOne(input, resultOne));
}

test('part one', day.partOne(day.readFile('2022/day-6'), 1651));

for (const [index, {input, resultTwo}] of testInput.entries()) {
	test(`part two: example ${index}`, day.partTwo(input, resultTwo));
}

test('part two', day.partTwo(day.readFile('2022/day-6'), 3837));
