import test from 'ava';
import * as dayOne from './day-1.js';
import readInput from '../read-input.js';

const partOne = test.macro((t, input: string, expected: number) => {
  t.is(dayOne.partOne(input.split(', ')), expected);
})

const partTwo = test.macro((t, input: string, expected: number) => {
  t.is(dayOne.partTwo(input.split(', ')), expected);
})

test('+1, +1, +1', partOne, '+1, +1, +1', 3);
test('+1, +1, -2', partOne, '+1, +1, -2', 0);
test('-1, -2, -3', partOne, '-1, -2, -3', -6);

test('day one', async t => {
  const input = await readInput('2018/day-1');
  const parsedInput = input.toString().split('\n');
  t.is(dayOne.partOne(parsedInput), 508);
});

test('+1, -1', partTwo, '+1, -1', 0);
test('+3, +3, +4, -2, -4', partTwo, '+3, +3, +4, -2, -4', 10);
test('-6, +3, +8, +5, -6', partTwo, '-6, +3, +8, +5, -6', 5);
test('+7, +7, -2, -7, -4', partTwo, '+7, +7, -2, -7, -4', 14);

test('day one part two', async t => {
  const input = await readInput('2018/day-1');
  const parsedInput = input.toString().split('\n');
  t.is(dayOne.partTwo(parsedInput), 549);
});
