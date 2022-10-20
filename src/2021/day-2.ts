class Dive {
	static parse(command: string) {
		const [direction, units] = command.split(' ');

		return {direction, units: Number.parseInt(units, 10)};
	}

	aim = 0;

	horizontal = 0;

	depth = 0;

	depthTwo = 0;

	constructor(input: string[]) {
		for (const command of input) {
			const {direction, units} = Dive.parse(command);

			if (direction === 'forward') {
				this.horizontal += units;
				this.depthTwo += this.aim * units;
			}

			if (direction === 'down') {
				this.depth -= units;
				this.aim += units;
			}

			if (direction === 'up') {
				this.depth += units;
				this.aim -= units;
			}
		}
	}

	get position() {
		const {horizontal, depth} = this;
		return {horizontal, depth};
	}

	get positionTwo() {
		const {horizontal, depthTwo} = this;
		return {horizontal, depth: depthTwo};
	}
}

export const partOne = (input: string[]) => {
	const dive = new Dive(input);
	const {horizontal, depth} = dive.position;

	return horizontal * Math.abs(depth);
};

export const partTwo = (input: string[]) => {
	const dive = new Dive(input);
	const {horizontal, depth} = dive.positionTwo;

	return horizontal * Math.abs(depth);
};
