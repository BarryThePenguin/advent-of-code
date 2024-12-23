import {equal} from 'node:assert/strict';
import {entries} from './chunk.ts';

export function hammingDistance(stringOne: string, stringTwo = ''): number {
	equal(stringOne.length, stringTwo.length, 'Strings must be the same length');

	let distance = 0;

	for (const [index, char] of entries(stringOne)) {
		if (stringTwo.charAt(index) !== char) {
			distance += 1;
		}
	}

	return distance;
}

export function union(stringOne: string, stringTwo = ''): string[] {
	const diff = [];

	for (const [index, char] of entries(stringOne)) {
		if (stringTwo.charAt(index) === char) {
			diff.push(char);
		}
	}

	return diff;
}
