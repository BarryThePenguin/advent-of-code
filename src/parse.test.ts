import test from 'ava';
import {integers, lines, words} from './parse.ts';

test('integers', (t) => {
	t.deepEqual([...integers('1 2 3')], [1, 2, 3]);
	t.deepEqual([...integers('1, 2, 3')], [1, 2, 3]);
	t.deepEqual([...integers('-1, +2, -3')], [-1, 2, -3]);
});

test('lines', (t) => {
	t.deepEqual(lines('foo\nbar\nbaz'), ['foo', 'bar', 'baz']);
});

test('words', (t) => {
	t.deepEqual([...words('foo bar baz')], ['foo', 'bar', 'baz']);
});
