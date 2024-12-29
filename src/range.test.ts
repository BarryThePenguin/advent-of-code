import {expect, test} from 'vitest';
import {range, rangeFill, zeroFill} from './range.ts';

test('range of length 1', () => {
	expect(range(1).toArray()).toEqual([0]);
});
test('range of length 2', () => {
	expect(range(2).toArray()).toEqual([0, 1]);
});
test('range starting at 1, ending at 1', () => {
	expect(range(1, 1).toArray()).toEqual([]);
});
test('range starting at 2, ending at 2', () => {
	expect(range(2, 2).toArray()).toEqual([]);
});
test('range starting at 2, ending at 4', () => {
	expect(range(2, 4).toArray()).toEqual([2, 3]);
});
test('range starting at 1, ending at 1, incrementing by 2', () => {
	expect(range(1, 1, 2).toArray()).toEqual([]);
});
test('range starting at 1, ending at 2, incrementing by 2', () => {
	expect(range(1, 2, 2).toArray()).toEqual([1]);
});
test('range starting at 2, ending at 2, incrementing by 2', () => {
	expect(range(2, 2, 2).toArray()).toEqual([]);
});
test('range starting at 2, ending at 2, incrementing by 4', () => {
	expect(range(2, 2, 4).toArray()).toEqual([]);
});
test('range starting at 2, ending at 4, incrementing by 4', () => {
	expect(range(2, 4, 4).toArray()).toEqual([2]);
});

test('range length from object', () => {
	expect(range({length: 4}).toArray()).toEqual([0, 1, 2, 3]);
});
test('range length from array', () => {
	expect(range([1, 2, 3, 4]).toArray()).toEqual([0, 1, 2, 3]);
});
test('range length from string', () => {
	expect(range('foo').toArray()).toEqual([0, 1, 2]);
});

test('rangeFill of length 1', () => {
	expect(rangeFill(1).toArray()).toEqual([0, 1]);
});
test('rangeFill of length 2', () => {
	expect(rangeFill(2).toArray()).toEqual([0, 1, 2]);
});
test('rangeFill starting at 1, ending at 1', () => {
	expect(rangeFill(1, 1).toArray()).toEqual([1]);
});
test('rangeFill starting at 2, ending at 2', () => {
	expect(rangeFill(2, 2).toArray()).toEqual([2]);
});
test('rangeFill starting at 2, ending at 4', () => {
	expect(rangeFill(2, 4).toArray()).toEqual([2, 3, 4]);
});
test('rangeFill starting at 1, ending at 1, incrementing by 2', () => {
	expect(rangeFill(1, 1, 2).toArray()).toEqual([1]);
});
test('rangeFill starting at 1, ending at 2, incrementing by 2', () => {
	expect(rangeFill(1, 2, 2).toArray()).toEqual([1]);
});
test('rangeFill starting at 2, ending at 2, incrementing by 2', () => {
	expect(rangeFill(2, 2, 2).toArray()).toEqual([2]);
});
test('rangeFill starting at 2, ending at 2, incrementing by 4', () => {
	expect(rangeFill(2, 2, 4).toArray()).toEqual([2]);
});
test('rangeFill starting at 2, ending at 4, incrementing by 4', () => {
	expect(rangeFill(2, 4, 4).toArray()).toEqual([2]);
});

test('rangeFill length from object', () => {
	expect(rangeFill({length: 4}).toArray()).toEqual([0, 1, 2, 3, 4]);
});
test('rangeFill length from array', () => {
	expect(rangeFill([1, 2, 3, 4]).toArray()).toEqual([0, 1, 2, 3, 4]);
});
test('rangeFill length from string', () => {
	expect(rangeFill('foo').toArray()).toEqual([0, 1, 2, 3]);
});

test('zeroFill of length 1', () => {
	expect(zeroFill(1)).toEqual([0]);
});
test('zeroFill of length 2', () => {
	expect(zeroFill(2)).toEqual([0, 0]);
});
test('zeroFill of length 3', () => {
	expect(zeroFill(3)).toEqual([0, 0, 0]);
});
