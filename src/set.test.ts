import test from 'ava';
import {difference, intersection, equivalence} from './set.ts';

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
