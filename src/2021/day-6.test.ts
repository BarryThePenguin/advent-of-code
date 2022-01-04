import test from 'ava';
import {createDayMacro} from '../create-day-macro.js';
import {readLines} from '../read-input.js';
import * as daySix from './day-6.js';

const {partOne, partTwo} = createDayMacro(daySix);

const testInput = ['3', '4', '3', '1', '2'];

test('part one: example - 18 days', partOne, {input: testInput, days: 18}, 26);
test(
  'part one: example - 80 days',
  partOne,
  {input: testInput, days: 80},
  5934,
);

test(
  'part one',
  partOne,
  {input: readLines('2021/day-6', ','), days: 80},
  396_210,
);

test(
  'part two: example - 256 days',
  partTwo,
  {input: testInput, days: 256},
  26_984_457_539,
);

test(
  'part two',
  partTwo,
  {input: readLines('2021/day-6', ','), days: 256},
  1_770_823_541_496,
);
