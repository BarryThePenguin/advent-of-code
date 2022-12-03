import test from 'ava';
import {
	difference,
	symmetricDifference,
	intersection,
	union,
	relativeComplement,
	equivalence,
} from './set.js';

test('difference', (t) => {
	const x = new Set([1, 2, 3]);
	const y = new Set([4, 3, 2]);
	const z = new Set([3, 4, 5]);
	const w = new Set([1, 6, 7]);
	t.deepEqual(difference(x), new Set());
	t.deepEqual(difference(x, y), new Set([1]));
	t.deepEqual(difference(x, z), new Set([1, 2]));
	t.deepEqual(difference(x, y, z), new Set([1]));
	t.deepEqual(difference(x, y, z, w), new Set([]));
});

test('relativeComplement', (t) => {
	const x = new Set([1, 2, 3]);
	const y = new Set([4, 3, 2]);
	t.deepEqual(relativeComplement(x), new Set(x));
	t.deepEqual(relativeComplement(x, y), new Set([1]));
	t.deepEqual(relativeComplement(y, x), new Set([4]));
});

test('symmetricDifference', (t) => {
	const x = new Set([1, 2, 3]);
	const y = new Set([4, 3, 2]);
	const z = new Set([3, 4, 5]);
	const w = new Set([1, 6, 7]);

	t.deepEqual(symmetricDifference(x), new Set());
	t.deepEqual(symmetricDifference(x, y), new Set([1, 4]));
	t.deepEqual(symmetricDifference(x, z), new Set([1, 2, 4, 5]));
	t.deepEqual(symmetricDifference(x, y, z), new Set([1, 3, 5]));
	t.deepEqual(symmetricDifference(x, y, z, w), new Set([3, 5, 6, 7]));
});

test('union', (t) => {
	const x = new Set([1, 2, 3]);
	const y = new Set([2, 3, 4]);
	const z = new Set([4, 5, 6]);
	t.deepEqual(union(x), new Set([1, 2, 3]));
	t.deepEqual(union(x, y), new Set([1, 2, 3, 4]));
	t.deepEqual(union(x, y, z), new Set([1, 2, 3, 4, 5, 6]));
});

test('intersection', (t) => {
	const x = new Set([1, 2, 3]);
	const y = new Set([2, 3, 4]);
	const z = new Set([3, 4, 5]);
	t.deepEqual(intersection(x), new Set([1, 2, 3]));
	t.deepEqual(intersection(x, y), new Set([2, 3]));
	t.deepEqual(intersection(x, y, z), new Set([3]));
});

test('equivalence', (t) => {
	const x = new Set([1, 2, 3]);
	const y = new Set([3, 1, 2]);
	const z = new Set([2, 3, 1]);
	const w = new Set([1, 2, 3, 4]);

	t.true(equivalence(x));
	t.true(equivalence(x, y));
	t.true(equivalence(x, y, z));
	t.false(equivalence(x, w));
	t.false(equivalence(x, y, w));
	t.false(equivalence(x, y, z, w));
});
