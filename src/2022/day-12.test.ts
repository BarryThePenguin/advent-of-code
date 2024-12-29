import {test} from 'vitest';
import {day} from './day-12.ts';

const testInput = ['Sabqponm', 'abcryxxl', 'accszExk', 'acctuvwj', 'abdefghi'];

test('part one: example', day.partOne(testInput, 31));

test('part one', day.partOne(day.readLines('2022/day-12'), 447));

test('part two: example', day.partTwo(testInput, 29));

test('part two', day.partTwo(day.readLines('2022/day-12'), 446));
