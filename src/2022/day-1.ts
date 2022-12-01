class CalorieCounter {
	elves: number[] = [];

	topThree = [0, 0, 0];

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

		this.inTopThree(elf);
	}

	inTopThree(elf: number) {
		if (elf > this.topThree[0]) {
			this.topThree.splice(0, 0, elf);
		} else if (elf > this.topThree[1]) {
			this.topThree.splice(1, 0, elf);
		} else if (elf > this.topThree[2]) {
			this.topThree.splice(2, 1, elf);
		}

		this.topThree.splice(3, this.topThree.length);
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
