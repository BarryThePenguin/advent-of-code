import test from 'ava';
import * as daySix from './day-6.js';
import readInput from '../read-input.js';

const partOne = test.macro((t, [input, days]: [string[], number], expected: number) => {
  t.is(daySix.partOne(input, days), expected);
})

const partTwo = test.macro((t, [input, days]: [string[], number], expected: number) => {
  t.is(daySix.partTwo(input, days), expected);
})

const testInput = [
  '3',
  '4',
  '3',
  '1',
  '2',
]

test('example 18 days', partOne, [testInput, 18], 26);
test('example 80 days', partOne, [testInput, 80], 5934);

test('part one', async t => {
  const input = await readInput('2021/day-6');
  const parsedInput = input.split(',');
  t.is(daySix.partOne(parsedInput, 80), 396210);
});

test('example two 256 days', partTwo, [testInput, 256], 26984457539);

test('part two', async t => {
  const input = await readInput('2021/day-6');
  const parsedInput = input.split(',');
  t.is(daySix.partTwo(parsedInput, 256), 1770823541496);
});
