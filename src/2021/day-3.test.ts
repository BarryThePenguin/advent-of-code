import test from 'ava';
import {createDayMacro} from '../create-day-macro.js';
import {readLines} from '../read-input.js';
import * as dayThree from './day-3.js';

const {partOne, partTwo} = createDayMacro(dayThree);

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
];

test('part one: example', partOne, testInput, 198);

test('part one', partOne, readLines('2021/day-3'), 775_304);

test('part two: example', partTwo, testInput, 230);

test('part two', partTwo, readLines('2021/day-3'), 1_370_737);
