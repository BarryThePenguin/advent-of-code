import test from 'ava';
import {createDayMacro} from '../create-day-macro.js';
import {readLines} from '../read-input.js';
import * as dayOne from './day-8.js';

const {partOne, partTwo} = createDayMacro(dayOne);

const testInput = ['30373', '25512', '65332', '33549', '35390'];

test('part one: example', partOne, testInput, 21);

test('part one', partOne, readLines('2022/day-8'), 1688);

test('part two: example', partTwo, testInput, 8);

test('part two', partTwo, readLines('2022/day-8'), 410_400);
