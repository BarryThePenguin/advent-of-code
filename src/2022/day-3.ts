import {createDay} from '../day-test.ts';
import {chunk} from '../chunk.ts';
import {intersection} from '../set.ts';

const lowercase = Number('`'.codePointAt(0));
const uppercase = Number('&'.codePointAt(0));

function priority(char: string) {
	const value = Number(char.codePointAt(0));

	if (value < lowercase) {
		return value - uppercase;
	}

	return value - lowercase;
}

function split(value: string): [string, string] {
	const half = value.length / 2;
	const first = value.slice(0, half);
	const second = value.slice(half);
	return [first, second];
}

class Reorganizer {
	priority: number[] = [];

	constructor(input: Iterable<string>) {
		for (const backpack of input) {
			if (backpack.length > 0) {
				const [one, two] = split(backpack);
				const commonItems = [...intersection(new Set(one), new Set(two))].join(
					'',
				);
				this.priority.push(priority(commonItems));
			}
		}
	}

	get sumOfPriorities() {
		return this.priority.reduce((a, b) => a + b, 0);
	}
}

class GroupReorganizer {
	priority: number[] = [];

	constructor(input: Iterable<string>) {
		for (const backpacks of chunk(input, 3)) {
			if (backpacks.length === 3) {
				const [one, two, three] = backpacks;
				const commonItems = [
					...intersection(new Set(one), new Set(two), new Set(three)),
				].join('');
				this.priority.push(priority(commonItems));
			}
		}
	}

	get sumOfPriorities() {
		return this.priority.reduce((a, b) => a + b, 0);
	}
}

export const day = createDay({
	partOne(input: Iterable<string>) {
		const reorganizer = new Reorganizer(input);

		return reorganizer.sumOfPriorities;
	},

	partTwo(input: Iterable<string>) {
		const reorganizer = new GroupReorganizer(input);

		return reorganizer.sumOfPriorities;
	},
});
