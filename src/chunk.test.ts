import test from 'ava';
import {chunk} from './chunk.ts';

const testChunk = test.macro(
	(
		t,
		inputs: Array<{input: unknown[]; chunkSize?: number; expected: unknown[]}>,
	) => {
		for (const {input, chunkSize, expected} of inputs) {
			t.deepEqual(Array.from(chunk(input, chunkSize)), expected);
		}
	},
);

test(
	'should return empty array if empty array is passed as first arg',
	testChunk,
	[
		{input: [], expected: []},
		{input: [], chunkSize: 4, expected: []},
	],
);

test(
	'if only array is passed as argument, treat n as the length of array',
	testChunk,
	[
		{
			input: [1, 2, 3, 4, 5, 6, 7, 8, 9],
			expected: [[1, 2, 3, 4, 5, 6, 7, 8, 9]],
		},
		{
			input: [100, 100, 100, 200, 300, 400],
			expected: [[100, 100, 100, 200, 300, 400]],
		},
	],
);

test(
	'splits array into groups of n size if array length divisible by n',
	testChunk,
	[
		{
			input: [1, 2, 3, 4, 5, 6, 7, 8, 9],
			chunkSize: 3,
			expected: [
				[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9],
			],
		},
		{
			input: [100, 100, 100, 200, 300, 400],
			chunkSize: 2,
			expected: [
				[100, 100],
				[100, 200],
				[300, 400],
			],
		},
	],
);

test(
	'splits array into groups of n size plus a trailing array of length < n',
	testChunk,
	[
		{
			input: [1, 2, 3, 4, 5, 6, 7, 8, 9],
			chunkSize: 2,
			expected: [[1, 2], [3, 4], [5, 6], [7, 8], [9]],
		},
		{
			input: [100, 100, 100, 200, 300, 400],
			chunkSize: 4,
			expected: [
				[100, 100, 100, 200],
				[300, 400],
			],
		},
	],
);
