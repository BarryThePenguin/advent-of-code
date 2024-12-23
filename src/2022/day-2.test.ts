import test from 'ava';
import {createDayMacro} from '../create-day-macro.ts';
import {readLines} from '../read-input.ts';
import * as dayOne from './day-2.ts';

const {partOne, partTwo} = createDayMacro(dayOne);

const testInput = ['A Y', 'B X', 'C Z'];

test('part one: example', partOne, testInput, 15);

test('part one', partOne, readLines('2022/day-2'), 10_310);

test('part two: example', partTwo, testInput, 12);

test('part two', partTwo, readLines('2022/day-2'), 14_859);
