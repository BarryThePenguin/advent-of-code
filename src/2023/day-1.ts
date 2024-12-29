import {createDay} from '../day-test.ts';
import {sum} from '../chunk.ts';

const digit = /\d/;

const digits = [
	'zero',
	'one',
	'two',
	'three',
	'four',
	'five',
	'six',
	'seven',
	'eight',
	'nine',
];

const digitMap = new Map(
	digits.map((value, index) => [value, index.toString()]),
);

class Document {
	calibrationValues: number[] = [];

	constructor(
		input: string[],
		private readonly mode: 'digits' | 'words',
	) {
		for (const value of input) {
			const tokens = [...this.tokenise(value)];

			const first = tokens.at(0);
			const last = tokens.at(-1);

			if (first && last) {
				this.calibrationValues.push(Number(first + last));
			}
		}
	}

	sum() {
		return sum(this.calibrationValues);
	}

	*tokenise(value: string) {
		let token: string | undefined;
		let index = -1;
		let tokenIndex = -1;

		function startsWithToken() {
			return digits.some((digit) => token && digit.startsWith(token));
		}

		while (++index < value.length) {
			token = value.at(index) ?? '';
			tokenIndex = index;

			if (digit.test(token)) {
				yield token;
			}

			while (this.mode === 'words' && startsWithToken()) {
				tokenIndex++;
				token += value.at(tokenIndex);

				if (digitMap.has(token)) {
					yield digitMap.get(token);
				}
			}
		}
	}
}

export const day = createDay({
	partOne(input: string[]) {
		const document = new Document(input, 'digits');
		return document.sum();
	},

	partTwo(input: string[]) {
		const document = new Document(input, 'words');
		return document.sum();
	},
});
