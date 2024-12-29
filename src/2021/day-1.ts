import {windows} from '../chunk.ts';
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
	partOne(input: Iterable<string>) {
		const measurements = new Measurements();

		return measurements.add(...input).countIncrease();
	},

	partTwo(input: Iterable<string>) {
		const measurements = new Measurements();

		for (const window of windows(input, 3)) {
			measurements.addWindow(...window);
		}

		return measurements.countIncrease();
	},
});
