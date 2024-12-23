import test from 'ava';
import {createDayMacro} from '../create-day-macro.ts';
import {readLines} from '../read-input.ts';
import * as dayThree from './day-3.ts';

const {partOne, partTwo} = createDayMacro(dayThree);

const testInput = ['#1 @ 1,3: 4x4', '#2 @ 3,1: 4x4', '#3 @ 5,5: 2x2'];

test('part one: example', partOne, testInput, 4);

test('part one', partOne, readLines('2018/day-3'), 100_261);

test('part two: example', partTwo, testInput, '#3');

test('part two', partTwo, readLines('2018/day-3'), '#251');
