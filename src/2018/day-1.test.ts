import {test} from 'vitest';
import {day} from './day-1.ts';

test('+1, +1, +1', day.partOne(['+1', '+1', '+1'], 3));

test('+1, +1, -2', day.partOne(['+1', '+1', '-2'], 0));
test('-1, -2, -3', day.partOne(['-1', '-2', '-3'], -6));

test('part one', day.partOne(day.readLines('2018/day-1'), 508));

test('+1, -1', day.partTwo(['+1', '-1'], 0));
test('+3, +3, +4, -2, -4', day.partTwo(['+3', '+3', '+4', '-2', '-4'], 10));
test('-6, +3, +8, +5, -6', day.partTwo(['-6', '+3', '+8', '+5', '-6'], 5));
test('+7, +7, -2, -7, -4', day.partTwo(['+7', '+7', '-2', '-7', '-4'], 14));

test('part two', day.partTwo(day.readLines('2018/day-1'), 549));
