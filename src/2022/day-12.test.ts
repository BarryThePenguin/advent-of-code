import test from 'ava';
import {createDayMacro} from '../create-day-macro.js';
import {readLines} from '../read-input.js';
import * as dayOne from './day-12.js';

const {partOne, partTwo} = createDayMacro(dayOne);

const testInput = ['Sabqponm', 'abcryxxl', 'accszExk', 'acctuvwj', 'abdefghi'];

test('part one: example', partOne, testInput, 31);

test('part one', partOne, readLines('2022/day-12'), 447);

test('part two: example', partTwo, testInput, 29);

test('part two', partTwo, readLines('2022/day-12'), 446);
