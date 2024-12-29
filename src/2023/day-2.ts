import {createDay} from '../day-test.ts';
import {sum} from '../chunk.ts';

type Combination = {
	red: number;
	green: number;
	blue: number;
};

class Cube {
	constructor(
		public number: number,
		public colour: string,
	) {}
}

const cubeRegex = /(\d+) (\w+)/g;

class Game {
	cubes: Cube[] = [];

	constructor(input: string) {
		const cubes = input.matchAll(cubeRegex);

		for (const [, number, colour = ''] of cubes) {
			this.cubes.push(new Cube(Number(number), colour));
		}
	}

	combination() {
		let red = 0;
		let green = 0;
		let blue = 0;

		for (const cube of this.cubes) {
			if (cube.colour === 'red') {
				red = Math.max(red, cube.number);
			}

			if (cube.colour === 'green') {
				green = Math.max(green, cube.number);
			}

			if (cube.colour === 'blue') {
				blue = Math.max(blue, cube.number);
			}
		}

		return {red, green, blue};
	}
}

const gameRegex = /Game (\d+): (.+)/;

class CubeConundrum {
	games = new Map<string, Game>();

	constructor(input: Iterable<string>) {
		for (const value of input) {
			const result = gameRegex.exec(value);

			if (result) {
				const [, id = '', gameInput = ''] = result;
				this.games.set(id, new Game(gameInput));
			}
		}
	}

	*possible(combination: Combination) {
		for (const [id, game] of this.games) {
			const {blue, green, red} = game.combination();

			if (
				red <= combination.red &&
				green <= combination.green &&
				blue <= combination.blue
			) {
				yield Number(id);
			}
		}
	}

	*fewest() {
		for (const game of this.games.values()) {
			const {blue, green, red} = game.combination();
			yield blue * green * red;
		}
	}
}

export const day = createDay({
	partOne(input: Iterable<string>) {
		const game = new CubeConundrum(input);
		return sum(game.possible({red: 12, green: 13, blue: 14}));
	},

	partTwo(input: Iterable<string>) {
		const game = new CubeConundrum(input);

		return sum(game.fewest());
	},
});
