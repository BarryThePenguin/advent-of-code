import {test} from 'vitest';
import {day} from './day-2.ts';

const testInput = ['A Y', 'B X', 'C Z'];

test('part one: example', day.partOne(testInput, 15));

test('part one', day.partOne(day.readLines('2022/day-2'), 10_310));

test('part two: example', day.partTwo(testInput, 12));

test('part two', day.partTwo(day.readLines('2022/day-2'), 14_859));
