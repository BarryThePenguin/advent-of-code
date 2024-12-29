import {expect, test} from 'vitest';
import {difference, intersection, equivalence} from './set.ts';

test('difference', () => {
	const x = new Set([1, 2, 3]);
	const y = new Set([4, 3, 2]);
	const z = new Set([3, 4, 5]);
	const w = new Set([1, 6, 7]);
	expect(difference(x)).toEqual(new Set());
	expect(difference(x, y)).toEqual(new Set([1]));
	expect(difference(x, z)).toEqual(new Set([1, 2]));
	expect(difference(x, y, z)).toEqual(new Set([1]));
	expect(difference(x, y, z, w)).toEqual(new Set([]));
});

test('intersection', () => {
	const x = new Set([1, 2, 3]);
	const y = new Set([2, 3, 4]);
	const z = new Set([3, 4, 5]);
	expect(intersection(x)).toEqual(new Set([1, 2, 3]));
	expect(intersection(x, y)).toEqual(new Set([2, 3]));
	expect(intersection(x, y, z)).toEqual(new Set([3]));
});

test('equivalence', () => {
	const x = new Set([1, 2, 3]);
	const y = new Set([3, 1, 2]);
	const z = new Set([2, 3, 1]);
	const w = new Set([1, 2, 3, 4]);

	expect(equivalence(x)).toBe(true);
	expect(equivalence(x, y)).toBe(true);
	expect(equivalence(x, y, z)).toBe(true);
	expect(equivalence(x, w)).toBe(false);
	expect(equivalence(x, y, w)).toBe(false);
	expect(equivalence(x, y, z, w)).toBe(false);
});
