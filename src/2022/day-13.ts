import {createDay} from '../day-test.ts';
import {chunk, sum} from '../chunk.ts';

function comparePacket(left: unknown, right: unknown): number {
	if (typeof left === 'number' && typeof right === 'number') {
		return left - right;
	}

	if (Array.isArray(left) && Array.isArray(right)) {
		const {length} = left.length > right.length ? left : right;

		for (let index = 0; index < length; index++) {
			if (left.length === index) {
				return -1;
			}

			if (right.length === index) {
				return 1;
			}

			const result = comparePacket(left[index], right[index]);

			if (result !== 0) {
				return result;
			}
		}

		return 0;
	}

	if (typeof left === 'number') {
		return comparePacket([left], right);
	}

	if (typeof right === 'number') {
		return comparePacket(left, [right]);
	}

	return 0;
}

class Packet {
	left: unknown[];

	right: unknown[];

	constructor(left = '', right = '') {
		this.left = JSON.parse(left) as unknown[];
		this.right = JSON.parse(right) as unknown[];
	}

	correct() {
		const result = comparePacket(this.left, this.right);

		if (result < 0) {
			return result;
		}

		if (result > 0) {
			return false;
		}

		return false;
	}
}

class DistressSignal {
	packets: Packet[] = [];

	constructor(input: Iterable<string>) {
		for (const [left, right] of chunk(input, 3)) {
			this.packets.push(new Packet(left, right));
		}
	}

	*compare() {
		for (const [index, packet] of this.packets.entries()) {
			if (packet.correct()) {
				yield index + 1;
			}
		}
	}

	sort(...dividers: unknown[]) {
		const packets = this.packets.flatMap((packet) => [
			packet.left,
			packet.right,
		]);
		return [...packets, ...dividers].sort(comparePacket);
	}
}

export const day = createDay({
	partOne(input: Iterable<string>) {
		const signal = new DistressSignal(input);
		return sum(signal.compare());
	},

	partTwo(input: Iterable<string>) {
		const firstDivider = [[2]];
		const secondDivider = [[6]];
		const signal = new DistressSignal(input);
		const packets = signal.sort(firstDivider, secondDivider);
		const firstIndex = packets.indexOf(firstDivider) + 1;
		const secondIndex = packets.indexOf(secondDivider) + 1;

		return firstIndex * secondIndex;
	},
});
