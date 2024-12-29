import {expect, test} from 'vitest';
import {chunk} from './chunk.ts';

test.for<[number[], number, number[][]]>([
	[[], 0, []],
	[[], 4, []],
])(
	'should return empty array if empty array is passed as first arg',
	([input, chunkSize, expected]) => {
		expect(chunk(input, chunkSize).toArray()).toEqual(expected);
	},
);

test.for<[number[], number, number[][]]>([
	[
		[1, 2, 3, 4, 5, 6, 7, 8, 9],
		3,
		[
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		],
	],
	[
		[100, 100, 100, 200, 300, 400],
		2,
		[
			[100, 100],
			[100, 200],
			[300, 400],
		],
	],
])(
	'splits array into groups of n size if array length divisible by n',
	([input, chunkSize, expected]) => {
		expect(chunk(input, chunkSize).toArray()).toEqual(expected);
	},
);

test.for<[number[], number, number[][]]>([
	[[1, 2, 3, 4, 5, 6, 7, 8, 9], 2, [[1, 2], [3, 4], [5, 6], [7, 8], [9]]],
	[
		[100, 100, 100, 200, 300, 400],
		4,
		[
			[100, 100, 100, 200],
			[300, 400],
		],
	],
])(
	'splits array into groups of n size plus a trailing array of length < n',
	([input, chunkSize, expected]) => {
		expect(chunk(input, chunkSize).toArray()).toEqual(expected);
	},
);
