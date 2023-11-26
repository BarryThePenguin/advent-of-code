import {difference, equivalence} from '../set.js';
import {uniqueReverseMap} from '../frequency.js';

function differenceOf(diff: number, digit = '', entry = '') {
	return diff === difference(new Set(digit), new Set(entry)).size;
}

function buildEntries(input: string[], digits: Map<number, string>) {
	const entries = new Map<string, string>();

	const fiveDigit = [];
	const sixDigit = [];

	for (const entry of input) {
		const digit = digits.get(entry.length);

		if (typeof digit === 'string') {
			switch (digit) {
				case '235': {
					fiveDigit.push(entry);
					break;
				}

				case '069': {
					sixDigit.push(entry);
					break;
				}

				default: {
					entries.set(digit, entry);
					break;
				}
			}
		}
	}

	for (const entry of sixDigit) {
		if (differenceOf(1, entries.get('1'), entry)) {
			entries.set('6', entry);
		} else if (differenceOf(1, entries.get('4'), entry)) {
			entries.set('0', entry);
		} else {
			entries.set('9', entry);
		}
	}

	for (const entry of fiveDigit) {
		if (differenceOf(1, entries.get('6'), entry)) {
			entries.set('5', entry);
		} else if (differenceOf(1, entries.get('9'), entry)) {
			entries.set('3', entry);
		} else {
			entries.set('2', entry);
		}
	}

	return uniqueReverseMap(entries);
}

function decode(entry: string, entries: Map<string, string>) {
	let value = '';

	for (const entryKey of entries.keys()) {
		if (equivalence(new Set(entry), new Set(entryKey))) {
			value = entries.get(entryKey) ?? '';
		}
	}

	return value;
}

class Display {
	entries: Array<{entries: Map<string, string>; output: string[]}> = [];

	output: string[] = [];

	constructor(
		input: string[],
		protected digits: Map<number, string>,
	) {
		for (const entry of input) {
			const [patterns, output] = entry
				.split(' | ')
				.map((value) => value.split(' '));
			this.output.push(...output);
			this.entries.push({entries: buildEntries(patterns, this.digits), output});
		}
	}

	get outputCount() {
		let count = 0;

		for (const output of this.output) {
			const value = this.digits.get(output.length);

			if (typeof value === 'string') {
				count += 1;
			}
		}

		return count;
	}

	get outputValues() {
		const values = [];

		for (const {entries, output} of this.entries) {
			let value = '';

			for (const entry of output) {
				value = `${value}${decode(entry, entries)}`;
			}

			values.push(Number(value));
		}

		return values;
	}

	get outputTotal() {
		let total = 0;

		for (const value of this.outputValues) {
			total += value;
		}

		return total;
	}
}

export const partOne = (input: string[]) => {
	const digits = new Map([
		[2, '1'],
		[4, '4'],
		[3, '7'],
		[7, '8'],
	]);

	const display = new Display(input, digits);

	return display.outputCount;
};

export const partTwo = (input: string[]) => {
	const digits = new Map([
		[2, '1'],
		[4, '4'],
		[3, '7'],
		[7, '8'],
		[5, '235'],
		[6, '069'],
	]);

	const display = new Display(input, digits);

	return display.outputTotal;
};
