import {createDay} from '../day-test.ts';
import * as parse from '../parse.ts';

type MarkedNumber = {
	number: number;
	marked: boolean;
};

type Winner = {
	board: BingoBoard;
	winningNumber: number;
};

function mark(numbers: MarkedNumber[], number: number) {
	for (const markedNumber of numbers.filter(
		(markedNumber) => !markedNumber.marked,
	)) {
		markedNumber.marked = markedNumber.number === number;
	}
}

function isWinner(numbers: MarkedNumber[]) {
	return numbers.every(({marked}) => marked);
}

function calculateScore(winner?: Winner) {
	if (winner) {
		const winningNumbers = winner.board.unmarkedNumbers.reduce(
			(score, {number}) => score + Number(number),
			0,
		);
		const winningNumber = Number(winner.winningNumber);

		if (typeof winningNumbers === 'number') {
			return winningNumbers * winningNumber;
		}
	}

	return undefined;
}

class BingoBoard {
	rows: MarkedNumber[][] = [];

	columns: MarkedNumber[][] = [];

	get markedNumbers() {
		return [...this.rows, ...this.columns];
	}

	get unmarkedNumbers() {
		const unmarkedNumbers = [];

		for (const markedNumbers of this.rows) {
			unmarkedNumbers.push(
				...markedNumbers.filter((markedNumber) => !markedNumber.marked),
			);
		}

		return unmarkedNumbers;
	}

	addNumbers(numbers: string) {
		const rows = [];

		for (const number of parse.integers(numbers)) {
			rows.push({number, marked: false});
		}

		for (const [index, markedNumber] of rows.entries()) {
			const column = this.columns.at(index);

			if (column) {
				column.push(markedNumber);
			} else {
				this.columns.push([markedNumber]);
			}
		}

		this.rows.push(rows);
	}

	mark(number: number) {
		let winningNumber;

		for (const row of this.markedNumbers) {
			mark(row, number);

			if (isWinner(row)) {
				winningNumber = number;
			}
		}

		return winningNumber;
	}
}

class Bingo {
	boards: BingoBoard[] = [];

	constructor(boards: string[]) {
		let board = new BingoBoard();
		for (const numbers of boards) {
			if (numbers === '') {
				this.boards.push(board);
				board = new BingoBoard();
			} else {
				board.addNumbers(numbers);
			}
		}

		this.boards.push(board);
	}

	play(numbers: Iterable<number>): Winner | undefined {
		let winner;

		for (const number of numbers) {
			for (const board of this.boards) {
				if (!winner) {
					const winningNumber = board.mark(number);

					if (winningNumber) {
						winner = {board, winningNumber};
					}
				}
			}
		}

		return winner;
	}

	playLast(numbers: Iterable<number>): Winner | undefined {
		const winningBoards = new Map<BingoBoard, Winner>();

		for (const number of numbers) {
			for (const board of this.boards) {
				if (!winningBoards.has(board)) {
					const winningNumber = board.mark(number);

					if (winningNumber) {
						winningBoards.set(board, {board, winningNumber});
					}
				}
			}
		}

		const winners = [...winningBoards.values()];

		return winners.at(-1);
	}
}

export const day = createDay({
	partOne(input: string[]) {
		const [numbers = '', ...boards] = input;
		const bingo = new Bingo(boards);

		const winner = bingo.play(parse.integers(numbers));

		return calculateScore(winner);
	},

	partTwo(input: string[]) {
		const [numbers = '', ...boards] = input;
		const bingo = new Bingo(boards);

		const last = bingo.playLast(parse.integers(numbers));

		return calculateScore(last);
	},
});
