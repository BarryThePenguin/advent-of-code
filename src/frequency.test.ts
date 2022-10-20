import test from 'ava';
import {frequency} from './frequency.js';

test('counts the frequency of items in an array', (t) => {
	const result = frequency(['1', '1', '2', '3', '1', '4', '3']);

	t.deepEqual(
		result,
		new Map([
			['1', 3],
			['2', 1],
			['3', 2],
			['4', 1],
		]),
	);
});
