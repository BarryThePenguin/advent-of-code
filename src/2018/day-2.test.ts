import test from 'ava';
import readInput from '../read-input.js';
import * as dayTwo from './day-2.js';

const partOne = test.macro((t, input: string[], expected: number) => {
  t.is(dayTwo.partOne(input), expected);
});

const partTwo = test.macro((t, input: string[], expected?: string) => {
  t.is(dayTwo.partTwo(input), expected);
});

const testInput = [
  'abcdef',
  'bababc',
  'abbcde',
  'abcccd',
  'aabcdd',
  'abcdee',
  'ababab',
];

test('example', partOne, testInput, 12);

test('day two', async (t) => {
  const input = await readInput('2018/day-2');
  const parsedInput = input.toString().split('\n');
  t.is(dayTwo.partOne(parsedInput), 6370);
});

const partTwoTestInput = [
  'abcde',
  'fghij',
  'klmno',
  'pqrst',
  'fguij',
  'axcye',
  'wvxyz',
];

test('example part two', partTwo, partTwoTestInput, 'fgij');

test('day two part two', async (t) => {
  const input = await readInput('2018/day-2');
  const parsedInput = input.toString().split('\n');
  t.is(dayTwo.partTwo(parsedInput), 'rmyxgdlihczskunpfijqcebtv');
});
