import {sum} from '../chunk.js';

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

class Game {
	cubes: Cube[] = [];

	constructor(input: string[]) {
		for (const role of input) {
			const cubes = role.split(', ');

			for (const cube of cubes) {
				const [number, colour] = cube.split(' ');
				this.cubes.push(new Cube(Number(number), colour));
			}
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

class CubeConundrum {
	games = new Map<string, Game>();

	constructor(input: string[]) {
		for (const value of input) {
			const [idInput, gameInput] = value.split(': ');
			const id = idInput.replace('Game ', '');

			this.games.set(id, new Game(gameInput.split('; ')));
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

export const partOne = (input: string[]) => {
	const game = new CubeConundrum(input);
	return sum(game.possible({red: 12, green: 13, blue: 14}));
};

export const partTwo = (input: string[]) => {
	const game = new CubeConundrum(input);

	return sum(game.fewest());
};
