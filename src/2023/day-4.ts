import {createDay} from '../day-test.ts';
import {sum} from '../chunk.ts';
import {frequency} from '../frequency.ts';
import {type Range, range} from '../range.ts';
import * as parse from '../parse.ts';

const cardRegex = /Card\s+(\d+):\s+(\d+(?:\s*\d+)*) \|\s+(\d+(?:\s*\d+)*)/;

class Scratchcards {
	cardSize = new Map<number, number>();

	cardCopies = new Map<number, Range>();

	constructor(input: Iterable<string>) {
		for (const value of input) {
			const [, cardIdInput, winningNumbersInput = '', myNumbersInput = ''] =
				cardRegex.exec(value) ?? [];

			const myNumbers = new Set();
			const winningNumbers = new Set();

			for (const input of parse.integers(myNumbersInput)) {
				myNumbers.add(input);
			}

			for (const input of parse.integers(winningNumbersInput)) {
				winningNumbers.add(input);
			}

			const cardId = Number(cardIdInput);
			const {size} = winningNumbers.intersection(myNumbers);

			const start = cardId + 1;

			this.cardSize.set(cardId, size);
			this.cardCopies.set(cardId, range(start, start + size));
		}
	}

	points() {
		let points = 0;

		for (const size of this.cardSize.values()) {
			if (size > 0) {
				points += 2 ** (size - 1);
			}
		}

		return points;
	}

	*collect() {
		const cards = this.cardSize.keys().toArray();

		while (cards.length > 0) {
			const cardId = cards.shift();

			if (typeof cardId === 'number') {
				yield cardId;
				const copy = this.cardCopies.get(cardId);

				if (copy) {
					cards.unshift(...copy);
				}
			}
		}
	}
}

export const day = createDay({
	partOne(input: Iterable<string>) {
		const scratchCards = new Scratchcards(input);
		return scratchCards.points();
	},

	partTwo(input: Iterable<string>) {
		const scratchCards = new Scratchcards(input);
		const count = frequency(scratchCards.collect());

		return sum(count.values());
	},
});
