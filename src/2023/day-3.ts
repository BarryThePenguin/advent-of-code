import {sum} from '../chunk.js';
import {Grid, toCoordinates} from '../to-grid.js';

class Character {
	static digit = /\d/;
	static symbol = /[^.\w\s]/;

	constructor(
		public x: number,
		public y: number,
		public value: string,
	) {}

	get coordinates() {
		return toCoordinates(this.x, this.y);
	}

	get isDigit() {
		return Character.digit.test(this.value);
	}

	get isSymbol() {
		return Character.symbol.test(this.value);
	}

	get isGear() {
		return this.value === '*';
	}
}

class Schematic extends Grid<Character> {
	constructor(input: string[]) {
		super(
			Grid.coordinatesFrom(input, function (x, y, value) {
				return new Character(x, y, value);
			}),
		);
	}

	*findPartNumber() {
		let found = false;
		let partNumber = '';

		for (const character of this.grid.values()) {
			if (character.isDigit) {
				const up = this.adjacentUp(character);
				const down = this.adjacentDown(character);
				const left = this.adjacentLeft(character);
				const right = this.adjacentRight(character);
				const upLeft = this.adjacentUpLeft(character);
				const upRight = this.adjacentUpRight(character);
				const downLeft = this.adjacentDownLeft(character);
				const downRight = this.adjacentDownRight(character);

				partNumber += character.value;

				found ||= [
					up,
					down,
					left,
					right,
					upLeft,
					upRight,
					downLeft,
					downRight,
				].some((direction) => direction?.isSymbol);
			} else if (found && partNumber) {
				yield Number(partNumber);

				found = false;
				partNumber = '';
			} else {
				found = false;
				partNumber = '';
			}
		}
	}

	*findGearRatios() {
		let found: Character | undefined;
		let partNumber = '';

		const ratios = new Map<Character, string[]>();

		for (const character of this.grid.values()) {
			if (character.isDigit) {
				const up = this.adjacentUp(character);
				const down = this.adjacentDown(character);
				const left = this.adjacentLeft(character);
				const right = this.adjacentRight(character);
				const upLeft = this.adjacentUpLeft(character);
				const upRight = this.adjacentUpRight(character);
				const downLeft = this.adjacentDownLeft(character);
				const downRight = this.adjacentDownRight(character);

				partNumber += character.value;

				found ||= [
					up,
					down,
					left,
					right,
					upLeft,
					upRight,
					downLeft,
					downRight,
				].find((direction) => direction?.isGear);
			} else if (found && partNumber) {
				const partNumbers = ratios.get(found) ?? [];
				partNumbers.push(partNumber);
				ratios.set(found, partNumbers);

				found = undefined;
				partNumber = '';
			} else {
				found = undefined;
				partNumber = '';
			}
		}

		for (const [_, ratio] of ratios) {
			const [a, b] = ratio;

			if (a && b) {
				yield Number(a) * Number(b);
			}
		}

		return ratios;
	}
}

export const partOne = (input: string[]) => {
	const schematic = new Schematic(input);
	return sum(schematic.findPartNumber());
};

export const partTwo = (input: string[]) => {
	const schematic = new Schematic(input);
	return sum(schematic.findGearRatios());
};
