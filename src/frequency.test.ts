import {expect, test} from 'vitest';
import {frequency} from './frequency.ts';

test('counts the frequency of items in an array', () => {
	expect(frequency(['1', '1', '2', '3', '1', '4', '3'])).toEqual(
		new Map([
			['1', 3],
			['2', 1],
			['3', 2],
			['4', 1],
		]),
	);
});
