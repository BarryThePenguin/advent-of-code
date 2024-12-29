import {createDay} from '../day-test.ts';

type Opening = '(' | '[' | '{' | '<';

type Closing = ')' | ']' | '}' | '>';

function parse(line: string) {
	let current = 0;
	let result: boolean | Closing = true;
	const tokens = [];

	while (result === true) {
		const char = line[current] as Opening | Closing | undefined;

		if (char === '(' || char === '[' || char === '{' || char === '<') {
			tokens.push(char);
		} else if (tokens.at(-1) === '(' && char === ')') {
			tokens.pop();
		} else if (tokens.at(-1) === '[' && char === ']') {
			tokens.pop();
		} else if (tokens.at(-1) === '{' && char === '}') {
			tokens.pop();
		} else if (tokens.at(-1) === '<' && char === '>') {
			tokens.pop();
		} else if (char === ')' || char === ']' || char === '}' || char === '>') {
			result = char;
		} else {
			result = false;
		}

		current++;
	}

	return result;
}

function autocomplete(line: string) {
	let current = 0;
	const result = [];
	const tokens = [];

	while (current < line.length) {
		const char = line[current];
		let found;

		if (char === '(' || char === '[' || char === '{' || char === '<') {
			tokens.push(char);
		} else {
			switch (char) {
				case ')': {
					found = tokens.lastIndexOf('(');
					break;
				}

				case ']': {
					found = tokens.lastIndexOf('[');
					break;
				}

				case '}': {
					found = tokens.lastIndexOf('{');
					break;
				}

				case '>': {
					found = tokens.lastIndexOf('<');
					break;
				}

				default: {
					throw new Error(`Invalid character: ${char}`);
				}
			}

			if (typeof found === 'number' && found >= 0) {
				tokens.splice(found, 1);
			}
		}

		current++;
	}

	for (const token of tokens.reverse()) {
		switch (token) {
			case '(': {
				result.push(')');

				break;
			}

			case '[': {
				result.push(']');

				break;
			}

			case '{': {
				result.push('}');

				break;
			}

			case '<': {
				result.push('>');

				break;
			}

			default: {
				throw new Error(`Invalid token: ${token}`);
			}
		}
	}

	return result.join('');
}

class Parser {
	corrupted: Closing[] = [];

	complete: string[] = [];

	constructor(input: string[]) {
		for (const line of input) {
			const result = parse(line);

			if (typeof result === 'string') {
				this.corrupted.push(result);
			} else {
				this.complete.push(autocomplete(line));
			}
		}
	}

	get score() {
		let result = 0;

		for (const token of this.corrupted) {
			switch (token) {
				case ')': {
					result += 3;
					break;
				}

				case ']': {
					result += 57;
					break;
				}

				case '}': {
					result += 1197;
					break;
				}

				case '>': {
					result += 25_137;
					break;
				}
				// No default
			}
		}

		return result;
	}

	get autocompleteScore() {
		const result = [];

		for (const line of this.complete) {
			let score = 0;
			for (const token of line) {
				score *= 5;

				switch (token) {
					case ')': {
						score += 1;
						break;
					}

					case ']': {
						score += 2;
						break;
					}

					case '}': {
						score += 3;
						break;
					}

					case '>': {
						score += 4;
						break;
					}

					default: {
						throw new Error(`Invalid token: ${token}`);
					}
				}
			}

			result.push(score);
		}

		result.sort((a, b) => a - b);

		const middle = Math.floor(result.length / 2);
		const [middleScore] = result.slice(middle, middle + 1);
		return middleScore;
	}
}

export const day = createDay({
	partOne(input: string[]) {
		const parser = new Parser(input);
		return parser.score;
	},

	partTwo(input: string[]) {
		const parser = new Parser(input);
		return parser.autocompleteScore;
	},
});
