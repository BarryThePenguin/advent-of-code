import test from 'ava';
import {createDayMacro} from '../create-day-macro.js';
import {readLines} from '../read-input.js';
import * as daySeven from './day-7.js';

const {partOne, partTwo} = createDayMacro(daySeven);

const testInput = ['16', '1', '2', '0', '4', '2', '7', '1', '2', '14'];

test('part one: example', partOne, testInput, 37);

test('part one', partOne, readLines('2021/day-7', ','), 344_605);

test('part two: example', partTwo, testInput, 168);

test('part two', partTwo, readLines('2021/day-7', ','), 93_699_985);
