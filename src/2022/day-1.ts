class CalorieCounter {
	elves: number[] = [];

	topThree: readonly [number, number, number] = [0, 0, 0];

	constructor(input: string[]) {
		let elf = 0;

		for (const calories of input) {
			if (calories === '') {
				this.elves.push(elf);
				this.inTopThree(elf);

				elf = 0;
			} else {
				elf += Number(calories);
			}
		}

		this.elves.push(elf);
		this.inTopThree(elf);
	}

	inTopThree(elf: number) {
		const [first, second, third] = this.topThree;

		if (elf > first) {
			this.topThree = [elf, first, second];
		} else if (elf > second) {
			this.topThree = [first, elf, second];
		} else if (elf > third) {
			this.topThree = [first, second, elf];
		}
	}
}

export const partOne = (input: string[]) => {
	const counter = new CalorieCounter(input);
	const [mostCalories] = counter.topThree;
	return mostCalories;
};

export const partTwo = (input: string[]) => {
	const counter = new CalorieCounter(input);
	return counter.topThree.reduce((p, c) => p + c, 0);
};
