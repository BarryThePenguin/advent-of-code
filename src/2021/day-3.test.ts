import test from 'ava';
import * as dayThree from './day-3.js';
import readInput from '../read-input.js';

const partOne = test.macro((t, input: string[], expected: number) => {
  t.is(dayThree.partOne(input), expected);
})

const partTwo = test.macro((t, input: string[], expected: number) => {
  t.is(dayThree.partTwo(input), expected);
})

const testInput = [
  '00100',
  '11110',
  '10110',
  '10111',
  '10101',
  '01111',
  '00111',
  '11100',
  '10000',
  '11001',
  '00010',
  '01010',
]

test('example', partOne, testInput, 198);

test('part one', async t => {
  const input = await readInput('2021/day-3');
  const parsedInput = input.split('\n');
  t.is(dayThree.partOne(parsedInput), 775304);
});

test('example two', partTwo, testInput, 230);

test('part two', async t => {
  const input = await readInput('2021/day-3');
  const parsedInput = input.split('\n');
  t.is(dayThree.partTwo(parsedInput), 1370737);
});
