import {sum} from '../chunk.ts';
import {fromGrid, type Coordinates} from '../to-grid.ts';

function* createClock(): Generator<number, number, boolean> {
	let stop = false;
	let tick = 1;

	while (!stop) {
		stop = yield tick;
		tick++;
	}

	return tick;
}

class AddxInstruction {
	complete = false;

	tick = 0;

	readonly #value: number;

	constructor(value: number) {
		this.#value = value;
	}

	update() {
		this.tick++;

		if (this.tick === 2) {
			this.complete = true;
			return this.#value;
		}

		return undefined;
	}
}

class NoopInstruction {
	complete = false;

	update() {
		this.complete = true;
	}
}

class CrtMonitor {
	pixels = new Map<Coordinates, string>();

	update(tick: number, sprite: number) {
		const pixel = (tick - 1) % 40;
		const row = Math.floor((tick - 1) / 40);

		const drawPixel =
			pixel === sprite || pixel === sprite - 1 || pixel === sprite + 1;

		this.pixels.set(`${pixel},${row}`, drawPixel ? '#' : '.');
	}
}

type Instruction = AddxInstruction | NoopInstruction;

class ClockCircuit {
	xRegister = 1;

	instructions: Instruction[] = [];

	signalStrength: number[] = [];

	clock = createClock();

	crt = new CrtMonitor();

	constructor(input: string[]) {
		let tick = this.clock.next();

		for (const instruction of input) {
			this.instructions.push(parseInstruction(instruction));
		}

		while (!tick.done) {
			if (tick.value % 40 === 20) {
				this.calculateSignalStrength(tick.value);
			}

			const [instruction] = this.instructions;

			if (instruction) {
				this.crt.update(tick.value, this.xRegister);
				const result = instruction.update();

				if (typeof result === 'number') {
					this.xRegister += result;
				}

				if (instruction.complete) {
					this.instructions.shift();
				}

				tick = this.clock.next();
			} else {
				tick = this.clock.next(true);
			}
		}
	}

	calculateSignalStrength(tick: number) {
		this.signalStrength.push(tick * this.xRegister);
	}
}

function parseInstruction(input: string) {
	const [instruction, value] = input.split(' ');

	if (instruction === 'addx') {
		return new AddxInstruction(Number(value));
	}

	return new NoopInstruction();
}

export const partOne = (input: string[]) => {
	const clock = new ClockCircuit(input);
	return sum(clock.signalStrength);
};

export const partTwo = (input: string[]) => {
	const clock = new ClockCircuit(input);
	return fromGrid(clock.crt.pixels);
};
