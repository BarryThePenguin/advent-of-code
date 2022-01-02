import test from 'ava';
import * as daySeven from './day-7.js';
import readInput from '../read-input.js';

const partOne = test.macro((t, input: string[], expected: number) => {
  t.is(daySeven.partOne(input), expected);
})

const partTwo = test.macro((t, input: string[], expected: number) => {
  t.is(daySeven.partTwo(input), expected);
})

const testInput = [
  '16','1','2','0','4','2','7','1','2','14'
]

test('example', partOne, testInput, 37);

test('part one', async t => {
  const input = await readInput('2021/day-7');
  const parsedInput = input.split(',');
  t.is(daySeven.partOne(parsedInput), 344605);
});

test('example two', partTwo, testInput, 168);

test('part two', async t => {
  const input = await readInput('2021/day-7');
  const parsedInput = input.split(',');
  t.is(daySeven.partTwo(parsedInput), 93699985);
});
