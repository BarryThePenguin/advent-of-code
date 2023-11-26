import {chunk, entries} from '../chunk.js';

class Crate {
	constructor(public label: string) {}
}

class Stack {
	crates: Crate[] = [];

	get topCrate() {
		return this.crates.at(-1)?.label;
	}

	push(...crates: Crate[]) {
		return this.crates.push(...crates);
	}

	pop(count = -1) {
		return this.crates.splice(count);
	}
}

class CargoCrane {
	stacks = new Map<string, Stack>();

	constructor(input: string[], model?: string) {
		const middle = input.indexOf('');
		const crates = input.slice(0, middle).reverse();
		const stacks = crates.shift() ?? '';

		for (const stack of stacks.replaceAll(/\s/g, '')) {
			this.stacks.set(stack, new Stack());
		}

		for (const {index, crate} of parseCrates(crates)) {
			const stack = this.stacks.get(index);

			stack?.push(crate);
		}

		const instructions = input.slice(middle + 1);

		for (const {count, from, to} of parseInstructions(instructions)) {
			const fromStack = this.stacks.get(from);
			const toStack = this.stacks.get(to);

			if (model === '9001') {
				const popFrom = fromStack?.pop(-count);
				if (popFrom) {
					toStack?.push(...popFrom);
				}
			} else {
				for (let index = 0; index < count; index++) {
					const popFrom = fromStack?.pop();
					if (popFrom) {
						toStack?.push(...popFrom);
					}
				}
			}
		}
	}

	topCrates() {
		const result = [];

		for (const stack of this.stacks.values()) {
			result.push(stack.topCrate);
		}

		return result.join('');
	}
}

function* parseCrates(input: string[]) {
	for (const row of input) {
		for (const [index, crateInput] of entries(chunk(row, 4))) {
			const label = crateInput.replaceAll(/[[\]\s]?/g, '');

			if (label !== '') {
				yield {index: String(index + 1), crate: new Crate(label)};
			}
		}
	}
}

const instructionRegex = /^move (\d+) from (\d+) to (\d+)$/;

function* parseInstructions(input: string[]) {
	for (const instruction of input) {
		const result = instructionRegex.exec(instruction);
		if (result) {
			const count = Number(result.at(1));
			const from = result.at(2) ?? '';
			const to = result.at(3) ?? '';

			yield {count, from, to};
		}
	}
}

export const partOne = (input: string[]) => {
	const crane = new CargoCrane(input);
	return crane.topCrates();
};

export const partTwo = (input: string[]) => {
	const crane = new CargoCrane(input, '9001');
	return crane.topCrates();
};
