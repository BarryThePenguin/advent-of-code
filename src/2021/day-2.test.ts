import test from 'ava';
import readInput from '../read-input.js';
import * as dayTwo from './day-2.js';

const partOne = test.macro((t, input: string[], expected: number) => {
  t.is(dayTwo.partOne(input), expected);
});

const partTwo = test.macro((t, input: string[], expected: number) => {
  t.is(dayTwo.partTwo(input), expected);
});

const testInput = [
  'forward 5',
  'down 5',
  'forward 8',
  'up 3',
  'down 8',
  'forward 2',
];

test('example', partOne, testInput, 150);

test('part one', async (t) => {
  const input = await readInput('2021/day-2');
  const parsedInput = input.split('\n');
  t.is(dayTwo.partOne(parsedInput), 1_804_520);
});

test('example two', partTwo, testInput, 900);

test('part two', async (t) => {
  const input = await readInput('2021/day-2');
  const parsedInput = input.split('\n');
  t.is(dayTwo.partTwo(parsedInput), 1_971_095_320);
});
