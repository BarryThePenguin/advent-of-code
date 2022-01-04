import test from 'ava';
import {createDayMacro} from '../create-day-macro.js';
import {readLines} from '../read-input.js';
import * as dayOne from './day-1.js';

const {partOne, partTwo} = createDayMacro(dayOne);

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

test('part one: example', partOne, testInput, 7);

test('part one', partOne, readLines('2021/day-1'), 1616);

test('part two: example', partTwo, testInput, 5);

test('part two', partTwo, readLines('2021/day-1'), 1645);
