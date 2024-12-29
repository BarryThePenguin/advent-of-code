import {test} from 'vitest';
import {day} from './day-7.ts';

const testInput = ['16', '1', '2', '0', '4', '2', '7', '1', '2', '14'];

test('part one: example', day.partOne(testInput, 37));

test('part one', day.partOne(day.readLines('2021/day-7', ','), 344_605));

test('part two: example', day.partTwo(testInput, 168));

test('part two', day.partTwo(day.readLines('2021/day-7', ','), 93_699_985));
