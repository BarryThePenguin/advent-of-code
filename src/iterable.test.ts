import test from 'ava';
import {testProp, fc} from '@fast-check/ava';
import {chunk} from './iterable.js';

test('empty', (t) => {
	t.deepEqual(Array.from(chunk([], 3)), []);
	t.deepEqual(Array.from(chunk([], 1337)), []);
});

test('fails with invalid chunk size', (t) => {
	t.throws(() => Array.from(chunk([3, 2, 1], 0)));
	t.throws(() => Array.from(chunk([3, 2, 1], -3)));
});

test('works with chunk size of 1', (t) => {
	t.deepEqual(Array.from(chunk([5, 4, 3, 2, 1], 1)), [[5], [4], [3], [2], [1]]);
});

test('works with array smaller than chunk size', (t) => {
	t.deepEqual(Array.from(chunk([1], 3)), [[1]]);
});

test('works with array of values', (t) => {
	t.deepEqual(Array.from(chunk([1, 2, 3, 4, 5], 3)), [
		[1, 2, 3],
		[4, 5],
	]);
});

test('works with exactly chunkable list', (t) => {
	t.deepEqual(Array.from(chunk([1, 2, 3, 4, 5, 6], 3)), [
		[1, 2, 3],
		[4, 5, 6],
	]);
});

test('works with chunkable list with remainder', (t) => {
	const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

	t.deepEqual(Array.from(chunk(numbers, 3)), [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
		[10],
	]);
	t.deepEqual(Array.from(chunk(numbers, 5)), [
		[1, 2, 3, 4, 5],
		[6, 7, 8, 9, 10],
	]);
	t.deepEqual(Array.from(chunk(numbers, 9999)), [numbers]);
});

testProp(
	'no chunk will be larger than the chunk size',
	[fc.array(fc.anything()), fc.integer({min: 1})],
	(t, input, chunkSize) => {
		const output = Array.from(chunk(input, chunkSize));
		fc.pre(output.length > 0);

		const lastChunk = output.pop()!;
		t.true(lastChunk.length > 0);
		t.true(lastChunk.length <= chunkSize);

		// The remaining chunks are all exactly the chunk size
		for (const chunk of output) {
			t.is(chunk.length, chunkSize);
		}
	},
);

testProp(
	'chunk chunks contain all elements, in the same order as the input',
	[fc.array(fc.anything()), fc.integer({min: 1})],
	(t, input, chunkSize) => {
		const output = Array.from(chunk(input, chunkSize));

		// Exact same elements as input array
		t.deepEqual(output.flat(), input);
	},
);
