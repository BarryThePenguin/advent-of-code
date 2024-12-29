import {test} from 'vitest';
import {day} from './day-3.ts';

const testInput = ['#1 @ 1,3: 4x4', '#2 @ 3,1: 4x4', '#3 @ 5,5: 2x2'];

test('part one: example', day.partOne(testInput, 4));

test('part one', day.partOne(day.readLines('2018/day-3'), 100_261));

test('part two: example', day.partTwo(testInput, '#3'));

test('part two', day.partTwo(day.readLines('2018/day-3'), '#251'));
