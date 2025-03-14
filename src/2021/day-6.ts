import {createDay} from '../day-test.ts';
import {frequency} from '../frequency.ts';

function createFish(fish = new Map<string, number>()): Map<string, number> {
	return new Map([
		['0', fish.get('1') ?? 0],
		['1', fish.get('2') ?? 0],
		['2', fish.get('3') ?? 0],
		['3', fish.get('4') ?? 0],
		['4', fish.get('5') ?? 0],
		['5', fish.get('6') ?? 0],
		['6', fish.get('7') ?? 0],
		['7', fish.get('8') ?? 0],
	]);
}

class School {
	fish = createFish();

	get count() {
		let count = 0;

		for (const fishCount of this.fish.values()) {
			count += fishCount;
		}

		return count;
	}

	constructor(fish: Iterable<string>) {
		this.fish = frequency(fish);
	}

	nextDay() {
		const reproduceCount = this.fish.get('0');

		this.fish = createFish(this.fish);

		const count = this.fish.get('6');

		if (typeof reproduceCount === 'number') {
			if (typeof count === 'number') {
				this.fish.set('6', reproduceCount + count);
			}

			this.fish.set('8', reproduceCount);
		}
	}
}

export const day = createDay({
	partOne({input, days}: {input: Iterable<string>; days: number}) {
		const school = new School(input);

		for (let i = 0; i < days; i++) {
			school.nextDay();
		}

		return school.count;
	},

	partTwo({input, days}: {input: Iterable<string>; days: number}) {
		const school = new School(input);

		for (let i = 0; i < days; i++) {
			school.nextDay();
		}

		return school.count;
	},
});
