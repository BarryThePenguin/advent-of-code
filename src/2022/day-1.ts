class CalorieCounter {
	elves: number[] = [];

	mostCalories = [0, 0, 0];

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
		if (elf > this.mostCalories[0]) {
			this.mostCalories.splice(0, 0, elf);
		} else if (elf > this.mostCalories[1]) {
			this.mostCalories.splice(1, 0, elf);
		} else if (elf > this.mostCalories[2]) {
			this.mostCalories.splice(2, 1, elf);
		}

		this.mostCalories.splice(3, this.mostCalories.length);
	}
}

export const partOne = (input: string[]) => {
	const counter = new CalorieCounter(input);
	const [mostCalories] = counter.mostCalories;
	return mostCalories;
};

export const partTwo = (input: string[]) => {
	const counter = new CalorieCounter(input);
	return counter.mostCalories.reduce((p, c) => p + c, 0);
};
