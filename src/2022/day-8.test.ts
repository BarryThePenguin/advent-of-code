import {test} from 'vitest';
import {day} from './day-8.ts';

const testInput = ['30373', '25512', '65332', '33549', '35390'];

test('part one: example', day.partOne(testInput, 21));

test('part one', day.partOne(day.readLines('2022/day-8'), 1688));

test('part two: example', day.partTwo(testInput, 8));

test('part two', day.partTwo(day.readLines('2022/day-8'), 410_400));
