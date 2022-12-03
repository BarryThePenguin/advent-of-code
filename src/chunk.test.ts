import test from 'ava';
import {chunk} from './chunk.js';

test('should return empty array if empty array is passed as first arg', (t) => {
	t.deepEqual(chunk([]), []);
	t.deepEqual(chunk([], 4), []);
});

test('if only array is passed as argument, treat n as the length of array', (t) => {
	t.deepEqual(chunk([1, 2, 3, 4, 5, 6, 7, 8, 9]), [
		[1, 2, 3, 4, 5, 6, 7, 8, 9],
	]);
	t.deepEqual(chunk([100, 100, 100, 200, 300, 400]), [
		[100, 100, 100, 200, 300, 400],
	]);
});

test('splits array into groups of n size if array length divisible by n', function (t) {
	t.deepEqual(chunk([1, 2, 3, 4, 5, 6, 7, 8, 9], 3), [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
	]);
	t.deepEqual(chunk([100, 100, 100, 200, 300, 400], 2), [
		[100, 100],
		[100, 200],
		[300, 400],
	]);
});

test('splits array into groups of n size plus a trailing array of length < n', function (t) {
	t.deepEqual(chunk([1, 2, 3, 4, 5, 6, 7, 8, 9], 2), [
		[1, 2],
		[3, 4],
		[5, 6],
		[7, 8],
		[9],
	]);
	t.deepEqual(chunk([100, 100, 100, 200, 300, 400], 4), [
		[100, 100, 100, 200],
		[300, 400],
	]);
});
