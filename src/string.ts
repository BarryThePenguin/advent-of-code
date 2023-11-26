import {equal} from 'node:assert/strict';

export function hammingDistance(stringOne: string, stringTwo = ''): number {
	equal(stringOne.length, stringTwo.length, 'Strings must be the same length');

	let distance = 0;

	for (const [index, char] of Array.from(stringOne).entries()) {
		if (stringTwo.charAt(index) !== char) {
			distance += 1;
		}
	}

	return distance;
}

export function union(stringOne: string, stringTwo = ''): string[] {
	const diff = [];

	for (const [index, char] of Array.from(stringOne).entries()) {
		if (stringTwo.charAt(index) === char) {
			diff.push(char);
		}
	}

	return diff;
}

export function intersection(stringOne = '', stringTwo = ''): string {
	const intersect = new Set([...stringOne, ...stringTwo]);

	for (const char of intersect) {
		if (!(stringOne.includes(char) && stringTwo.includes(char))) {
			intersect.delete(char);
		}
	}

	return Array.from(intersect).join('');
}
