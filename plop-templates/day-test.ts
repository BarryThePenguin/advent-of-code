import test from 'ava';
import {createDayMacro} from '../create-day-macro.js';
import {readLines} from '../read-input.js';
import * as dayOne from './day-{{day}}.js';

const {partOne, partTwo} = createDayMacro(dayOne);

const testInput = [];

test('part one: example', partOne, testInput, 24_000);

test('part one', partOne, readLines('{{year}}/day-{{day}}'), 72_602);

test('part two: example', partTwo, testInput, 45_000);

test('part two', partTwo, readLines('{{year}}/day-{{day}}'), 207_410);
