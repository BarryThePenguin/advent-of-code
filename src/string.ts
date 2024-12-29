import {equal} from 'node:assert/strict';
import {range} from './range.ts';

export function hammingDistance(stringOne: string, stringTwo = ''): number {
	equal(stringOne.length, stringTwo.length, 'Strings must be the same length');

	let distance = 0;

	for (const index of range(stringOne)) {
		if (stringOne.charAt(index) !== stringTwo.charAt(index)) {
			distance += 1;
		}
	}

	return distance;
}

export function* union(stringOne: string, stringTwo = '') {
	for (const index of range(stringOne)) {
		if (stringOne.charAt(index) === stringTwo.charAt(index)) {
			yield stringOne.charAt(index);
		}
	}
}
