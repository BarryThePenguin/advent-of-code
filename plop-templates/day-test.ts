import {test} from 'vitest';
import {day} from './day-{{day}}.js';

const testInput = [];

test('part one: example', day.partOne(testInput, 24_000));

test('part one', day.partOne(day.readLines('{{year}}/day-{{day}}'), 72_602));

test('part two: example', day.partTwo(testInput, 45_000));

test('part two', day.partTwo(day.readLines('{{year}}/day-{{day}}'), 207_410));
