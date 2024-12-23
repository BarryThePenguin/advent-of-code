import {sum} from '../chunk.ts';
import {frequency} from '../frequency.ts';
import {range} from '../range.ts';
import {intersection} from '../set.ts';

const digit = /\d+/g;
const whitespace = /\s+/g;

class Scratchcards {
	cardSize = new Map<number, number>();

	cardCopies = new Map<number, number[]>();

	constructor(input: string[]) {
		for (const value of input) {
			const [winningInput, myNumbersInput] = value.split(' | ');
			const myNumbers = Array.from(myNumbersInput.matchAll(digit), (m) =>
				Number(m[0]),
			);
			const [cardIdInput, winningNumbersInput] = winningInput.split(': ');
			const [, cardNumberInput] = cardIdInput.split(whitespace);
			const winningNumbers = Array.from(
				winningNumbersInput.matchAll(digit),
				(m) => Number(m[0]),
			);

			const cardId = Number(cardNumberInput);
			const {size} = intersection(new Set(winningNumbers), new Set(myNumbers));

			const start = cardId + 1;

			this.cardSize.set(cardId, size);
			this.cardCopies.set(cardId, Array.from(range(start, start + size)));
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
		const cards = Array.from(this.cardSize.keys());

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

export const partOne = (input: string[]) => {
	const scratchCards = new Scratchcards(input);
	return scratchCards.points();
};

export const partTwo = (input: string[]) => {
	const scratchCards = new Scratchcards(input);
	const count = frequency(scratchCards.collect());

	return sum(count.values());
};
