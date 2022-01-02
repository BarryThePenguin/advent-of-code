import test from 'ava';
import readInput from '../read-input.js';
import * as dayOne from './day-1.js';

const partOne = test.macro((t, input: string[], expected: number) => {
  t.is(dayOne.partOne(input), expected);
});

const partTwo = test.macro((t, input: string[], expected: number) => {
  t.is(dayOne.partTwo(input), expected);
});

const testInput = [
  '199',
  '200',
  '208',
  '210',
  '200',
  '207',
  '240',
  '269',
  '260',
  '263',
];

test('example', partOne, testInput, 7);

test('part one', async (t) => {
  const input = await readInput('2021/day-1');
  const parsedInput = input.split('\n');
  t.is(dayOne.partOne(parsedInput), 1616);
});

test('example two', partTwo, testInput, 5);

test('part two', async (t) => {
  const input = await readInput('2021/day-1');
  const parsedInput = input.toString().split('\n');
  t.is(dayOne.partTwo(parsedInput), 1645);
});
