import {expect, test} from 'vitest';
import {integers, lines, words} from './parse.ts';

test('integers', () => {
	expect(integers('1 2 3').toArray()).toEqual([1, 2, 3]);
	expect(integers('1, 2, 3').toArray()).toEqual([1, 2, 3]);
	expect(integers('-1, +2, -3').toArray()).toEqual([-1, 2, -3]);
});

test('lines', () => {
	expect(lines('foo\nbar\nbaz')).toEqual(['foo', 'bar', 'baz']);
});

test('words', () => {
	expect(words('foo bar baz').toArray()).toEqual(['foo', 'bar', 'baz']);
});
