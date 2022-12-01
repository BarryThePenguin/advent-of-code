import {frequency} from '../frequency.js';
import {rangeFill} from '../range.js';

function maxKey<K, V>(map: Map<K, V>) {
	let max = 0;

	for (const key of map.keys()) {
		if (typeof key === 'string') {
			max = Math.max(max, Number(key));
		}

		if (typeof key === 'number') {
			max = Math.max(max, key);
		}
	}

	return max;
}

class SubPosition {
	positions: Map<string, number>;

	constructor(input: string[]) {
		this.positions = frequency(input);
	}

	get cost() {
		const cost = new Map();

		for (const position of this.positions.keys()) {
			let fuelCost = 0;
			const pos = Number(position);

			for (const [distance, count] of this.positions) {
				const dis = Number(distance);
				fuelCost += Math.abs(dis - pos) * count;
			}

			cost.set(position, fuelCost);
		}

		return cost;
	}

	get compoundCost() {
		const cost = new Map();
		const moveCost = new Map();

		const maxPosition = maxKey(this.positions);

		for (const position of rangeFill(1, maxPosition)) {
			let fuelCost = 0;

			for (const [distance, count] of this.positions) {
				const dis = Number(distance);
				const moves = Math.abs(dis - position);

				if (!moveCost.has(moves)) {
					let cost = 0;

					for (const unit of rangeFill(1, moves)) {
						cost += unit;
					}

					moveCost.set(moves, cost);
				}

				fuelCost += moveCost.get(moves) * count;
			}

			cost.set(position, fuelCost);
		}

		return cost;
	}
}

export const partOne = (input: string[]) => {
	const positions = new SubPosition(input);

	return Math.min(...positions.cost.values());
};

export const partTwo = (input: string[]) => {
	const positions = new SubPosition(input);

	return Math.min(...positions.compoundCost.values());
};
