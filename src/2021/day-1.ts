import {createDay} from '../day-test.ts';

class Measurements {
	measurements: number[] = [];

	add(...measurements: string[]) {
		for (const measurement of measurements) {
			this.measurements.push(Number(measurement));
		}

		return this;
	}

	addWindow(...measurements: string[]) {
		let window = 0;

		for (const depth of measurements) {
			window += Number(depth);
		}

		this.measurements.push(window);
	}

	countIncrease() {
		let count = 0;

		for (const [index, depth] of this.measurements.entries()) {
			const previous = this.measurements.at(index - 1);

			if (typeof previous === 'number' && depth > previous) {
				count += 1;
			}
		}

		return count;
	}
}

export const day = createDay({
	partOne(input: string[]) {
		const measurements = new Measurements();

		return measurements.add(...input).countIncrease();
	},

	partTwo(input: string[]) {
		const measurements = new Measurements();

		for (const [index, depth] of input.entries()) {
			const first = input.at(index - 2);
			const second = input.at(index - 1);

			if (typeof first === 'string' && typeof second === 'string') {
				measurements.addWindow(first, second, depth);
			}
		}

		return measurements.countIncrease();
	},
});
