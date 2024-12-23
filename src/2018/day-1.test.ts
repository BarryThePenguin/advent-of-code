import test from 'ava';
import {createDayMacro} from '../create-day-macro.ts';
import {readLines} from '../read-input.ts';
import * as dayOne from './day-1.ts';

const {partOne, partTwo} = createDayMacro(dayOne);

test('+1, +1, +1', partOne, ['+1', '+1', '+1'], 3);
test('+1, +1, -2', partOne, ['+1', '+1', '-2'], 0);
test('-1, -2, -3', partOne, ['-1', '-2', '-3'], -6);

test('part one', partOne, readLines('2018/day-1'), 508);

test('+1, -1', partTwo, ['+1', '-1'], 0);
test('+3, +3, +4, -2, -4', partTwo, ['+3', '+3', '+4', '-2', '-4'], 10);
test('-6, +3, +8, +5, -6', partTwo, ['-6', '+3', '+8', '+5', '-6'], 5);
test('+7, +7, -2, -7, -4', partTwo, ['+7', '+7', '-2', '-7', '-4'], 14);

test('part two', partTwo, readLines('2018/day-1'), 549);
