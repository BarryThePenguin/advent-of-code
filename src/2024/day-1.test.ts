import {test} from 'vitest';
import {day} from './day-1.js';

const testInput = ['3   4', '4   3', '2   5', '1   3', '3   9', '3   3'];

test('part one: example', day.partOne(testInput, 11));

test('part one', day.partOne(day.readLines('2024/day-1'), 2_756_096));

test('part two: example', day.partTwo(testInput, 31));

test('part two', day.partTwo(day.readLines('2024/day-1'), 23_117_829));
