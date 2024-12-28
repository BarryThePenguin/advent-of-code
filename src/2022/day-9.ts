import {ok} from 'node:assert/strict';
import {walk} from '../chunk.ts';
import {type Coordinates, fromCoordinates, toCoordinates} from '../to-grid.ts';

const instructionRegex = /([RLUD]) (\d+)/;

enum Direction {
	Right = 'R',
	Left = 'L',
	Up = 'U',
	Down = 'D',
}

function isDirection(value: string): value is Direction {
	return Object.values(Direction).includes(value as Direction);
}

class Section {
	coordinates: Coordinates = '0,0';
}

class Rope {
	head = new Section();

	sections: Section[] = [this.head];

	tailVisited = new Set<Coordinates>(['0,0']);

	constructor(input: string[], tailCount: number) {
		for (let index = 0; index < tailCount; index++) {
			this.sections.push(new Section());
		}

		for (const instruction of input) {
			const [, direction = '', count = ''] =
				instructionRegex.exec(instruction) ?? [];
			ok(isDirection(direction));

			for (let step = 0; step < Number(count); step++) {
				this.moveHead(direction);

				for (const {previous = this.head, current} of walk(this.sections)) {
					if (!isAdjacent(previous, current)) {
						const moved = this.moveSection(previous, current);
						current.coordinates = moved;
					}
				}

				const tail = this.sections.at(-1);

				if (tail) {
					this.tailVisited.add(tail.coordinates);
				}
			}
		}
	}

	moveHead(direction: Direction) {
		let {x, y} = fromCoordinates(this.head.coordinates);

		switch (direction) {
			case Direction.Up: {
				y++;
				break;
			}

			case Direction.Down: {
				y--;
				break;
			}

			case Direction.Left: {
				x--;
				break;
			}

			case Direction.Right: {
				x++;
				break;
			}

			// No default
		}

		this.head.coordinates = toCoordinates(x, y);
		return this.head;
	}

	moveSection(previous: Section, current: Section) {
		const next = fromCoordinates(previous.coordinates);
		let {x, y} = fromCoordinates(current.coordinates);

		if (next.x > x) {
			x++;
		} else if (next.x < x) {
			x--;
		}

		if (next.y > y) {
			y++;
		} else if (next.y < y) {
			y--;
		}

		return toCoordinates(x, y);
	}
}

function isAdjacent(previous: Section, current: Section) {
	const {x, y} = fromCoordinates(current.coordinates);
	const up = toCoordinates(x, y + 1);
	const down = toCoordinates(x, y - 1);
	const left = toCoordinates(x - 1, y);
	const right = toCoordinates(x + 1, y);
	const upLeft = toCoordinates(x - 1, y + 1);
	const upRight = toCoordinates(x + 1, y + 1);
	const downLeft = toCoordinates(x - 1, y - 1);
	const downRight = toCoordinates(x + 1, y - 1);

	return [
		current.coordinates,
		up,
		down,
		left,
		right,
		upLeft,
		upRight,
		downLeft,
		downRight,
	].includes(previous.coordinates);
}

export const partOne = (input: string[]) => {
	const rope = new Rope(input, 1);
	return rope.tailVisited.size;
};

export const partTwo = (input: string[]) => {
	const rope = new Rope(input, 9);
	return rope.tailVisited.size;
};
