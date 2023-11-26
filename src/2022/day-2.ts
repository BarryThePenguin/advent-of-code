enum Play {
	Rock = 1,
	Paper = 2,
	Scissors = 3,
}

enum Score {
	Lose = 0,
	Draw = 3,
	Win = 6,
}

class GameOne {
	rounds: number[] = [];

	constructor(
		input: string[],
		protected plays: Map<string, number>,
	) {
		for (const round of input) {
			const play = plays.get(round);
			if (play !== undefined) {
				this.rounds.push(play);
			}
		}
	}

	get score() {
		return this.rounds.reduce((a, b) => a + b, 0);
	}
}

/**
 * A - Rock - X
 * B - Paper - Y
 * C - Scissors - Z
 *
 * Score
 *
 * Rock - 1
 * Paper - 2
 * Scissors - 3
 *
 * Lose - 0
 * Draw - 3
 * Win 6
 */
export const partOne = (input: string[]) => {
	const plays = new Map([
		['A X', Play.Rock + Score.Draw],
		['A Y', Play.Paper + Score.Win],
		['A Z', Play.Scissors + Score.Lose],
		['B X', Play.Rock + Score.Lose],
		['B Y', Play.Paper + Score.Draw],
		['B Z', Play.Scissors + Score.Win],
		['C X', Play.Rock + Score.Win],
		['C Y', Play.Paper + Score.Lose],
		['C Z', Play.Scissors + Score.Draw],
	]);

	const game = new GameOne(input, plays);
	return game.score;
};

/**
 * A - Rock
 * B - Paper
 * C - Scissors
 *
 * X - Lose
 * Y - Draw
 * Z - Win
 *
 * Score
 *
 * Rock - 1
 * Paper - 2
 * Scissors - 3
 *
 * Lose - 0
 * Draw - 3
 * Win 6
 */
export const partTwo = (input: string[]) => {
	const plays = new Map([
		['A X', Play.Scissors + Score.Lose],
		['A Y', Play.Rock + Score.Draw],
		['A Z', Play.Paper + Score.Win],
		['B X', Play.Rock + Score.Lose],
		['B Y', Play.Paper + Score.Draw],
		['B Z', Play.Scissors + Score.Win],
		['C X', Play.Paper + Score.Lose],
		['C Y', Play.Scissors + Score.Draw],
		['C Z', Play.Rock + Score.Win],
	]);

	const game = new GameOne(input, plays);
	return game.score;
};
