type MarkedNumber = {
	number: string;
	marked: boolean;
};

type Winner = {
	board: BingoBoard;
	winningNumber: string;
};

function mark(numbers: MarkedNumber[], number: string) {
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

	get winningNumbers() {
		return this.markedNumbers.find((markedNumbers) => isWinner(markedNumbers));
	}

	addNumbers(numbers: string) {
		const rows = [];

		for (const number of numbers.trim().split(/\s+/)) {
			rows.push({number, marked: false});
		}

		for (const [index, markedNumber] of rows.entries()) {
			const column = this.columns.at(index);

			if (Array.isArray(column)) {
				column.push(markedNumber);
			} else {
				this.columns.push([markedNumber]);
			}
		}

		this.rows.push(rows);
	}

	mark(number: string) {
		for (const row of this.markedNumbers) {
			mark(row, number);
		}
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

	play(numbers: string[]): Winner | undefined {
		let winner;

		for (const number of numbers) {
			for (const board of this.boards) {
				if (typeof winner === 'undefined') {
					board.mark(number);

					if (typeof board.winningNumbers !== 'undefined') {
						winner = {board, winningNumber: number};
					}
				}
			}
		}

		return winner;
	}

	playLast(numbers: string[]): Winner | undefined {
		const winningBoards = new Map<BingoBoard, Winner>();

		for (const number of numbers) {
			for (const board of this.boards) {
				if (!winningBoards.has(board)) {
					board.mark(number);

					if (typeof board.winningNumbers !== 'undefined') {
						winningBoards.set(board, {board, winningNumber: number});
					}
				}
			}
		}

		return Array.from(winningBoards.values()).at(-1);
	}
}

export const partOne = (input: string[]) => {
	const [numbers, ...boards] = input;
	const bingo = new Bingo(boards);

	const winner = bingo.play(numbers.split(','));

	return calculateScore(winner);
};

export const partTwo = (input: string[]) => {
	const [numbers, ...boards] = input;
	const bingo = new Bingo(boards);

	const last = bingo.playLast(numbers.split(','));

	return calculateScore(last);
};
