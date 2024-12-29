import {test} from 'vitest';
import {day} from './day-6.ts';

const testInput = ['3', '4', '3', '1', '2'];

test(
	'part one: example - 18 days',
	day.partOne({input: testInput, days: 18}, 26),
);
test(
	'part one: example - 80 days',
	day.partOne({input: testInput, days: 80}, 5934),
);

test(
	'part one',
	day.partOne({input: day.readLines('2021/day-6', ','), days: 80}, 396_210),
);

test(
	'part two: example - 256 days',
	day.partTwo({input: testInput, days: 256}, 26_984_457_539),
);

test(
	'part two',
	day.partTwo(
		{input: day.readLines('2021/day-6', ','), days: 256},
		1_770_823_541_496,
	),
);
