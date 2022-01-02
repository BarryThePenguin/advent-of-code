import test from 'ava';
import readInput from '../read-input.js';
import * as dayThree from './day-3.js';

const partOne = test.macro((t, input: string[], expected: number) => {
  t.is(dayThree.partOne(input), expected);
});

const partTwo = test.macro((t, input: string[], expected?: string) => {
  t.is(dayThree.partTwo(input), expected);
});

const testInput = ['#1 @ 1,3: 4x4', '#2 @ 3,1: 4x4', '#3 @ 5,5: 2x2'];

test('example', partOne, testInput, 4);

test('day three', async (t) => {
  const input = await readInput('2018/day-3');
  const parsedInput = input.toString().split('\n');
  t.is(dayThree.partOne(parsedInput), 100_261);
});

test('example part three', partTwo, testInput, '#3');

test('day three part two', async (t) => {
  const input = await readInput('2018/day-3');
  const parsedInput = input.toString().split('\n');
  t.is(dayThree.partTwo(parsedInput), '#251');
});
