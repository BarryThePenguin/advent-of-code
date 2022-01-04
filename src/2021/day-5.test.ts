import test from 'ava';
import {createDayMacro} from '../create-day-macro.js';
import {readLines} from '../read-input.js';
import * as dayFive from './day-5.js';

const {partOne, partTwo} = createDayMacro(dayFive);

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

test('part one: example', partOne, testInput, 5);

test('part one', partOne, readLines('2021/day-5'), 5585);

test('part two: example', partTwo, testInput, 12);

test('part two', partTwo, readLines('2021/day-5'), 17_193);
