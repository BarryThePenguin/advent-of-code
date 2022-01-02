import test from 'ava';
import readInput from '../read-input.js';
import * as dayFive from './day-5.js';

const partOne = test.macro((t, input: string[], expected: number) => {
  t.is(dayFive.partOne(input), expected);
});

const partTwo = test.macro((t, input: string[], expected: number) => {
  t.is(dayFive.partTwo(input), expected);
});

const testInput = [
  '0,9 -> 5,9',
  '8,0 -> 0,8',
  '9,4 -> 3,4',
  '2,2 -> 2,1',
  '7,0 -> 7,4',
  '6,4 -> 2,0',
  '0,9 -> 2,9',
  '3,4 -> 1,4',
  '0,0 -> 8,8',
  '5,5 -> 8,2',
];

test('example', partOne, testInput, 5);

test('part one', async (t) => {
  const input = await readInput('2021/day-5');
  const parsedInput = input.split('\n');
  t.is(dayFive.partOne(parsedInput), 5585);
});

test('example two', partTwo, testInput, 12);

test('part two', async (t) => {
  const input = await readInput('2021/day-5');
  const parsedInput = input.split('\n');
  t.is(dayFive.partTwo(parsedInput), 17_193);
});
