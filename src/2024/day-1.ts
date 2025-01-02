import {sum, zip} from '../chunk.ts';
import {createDay} from '../day-test.ts';
import {frequency} from '../frequency.ts';
import * as parse from '../parse.ts';

class Lists {
	static fromInput(input: Iterable<string>) {
		const lists = new Lists();

		for (const lint of input) {
			const [left, right] = parse.integers(lint);

			lists.push(left, right);
		}

		return lists;
	}

	readonly #left: number[] = [];

	readonly #right: number[] = [];

	push(left?: number, right?: number) {
		if (left) {
			this.#left.push(left);
		}

		if (right) {
			this.#right.push(right);
		}
	}

	reconcile() {
		const left = this.#left
			.values()
			.toArray()
			.toSorted((a, b) => a - b);

		const right = this.#right
			.values()
			.toArray()
			.toSorted((a, b) => a - b);

		const difference = zip(left, right).map(([left, right]) =>
			Math.abs(left - right),
		);

		return sum(difference);
	}

	*similarity() {
		const right = frequency(this.#right);

		for (const left of this.#left) {
			const count = right.get(left) ?? 0;
			yield left * count;
		}
	}

	get similarityScore() {
		return sum(this.similarity());
	}
}

export const day = createDay({
	partOne(input: Iterable<string>) {
		const lists = Lists.fromInput(input);
		return lists.reconcile();
	},

	partTwo(input: Iterable<string>) {
		const {similarityScore} = Lists.fromInput(input);

		return similarityScore;
	},
});
