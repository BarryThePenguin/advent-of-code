import test from 'ava';
import {difference, symmetricDifference} from './set.js';

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
