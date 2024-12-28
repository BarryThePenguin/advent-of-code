import {entries, keys} from '../chunk.ts';
import {zeroFill} from '../range.ts';

class Report {
	static generate(input: string[]) {
		const [entry] = input;
		const report = new Report(entry);

		for (const item of input) {
			for (const [index, bit] of entries(item)) {
				if (bit === '0' || bit === '1') {
					const value = report.get(bit, index);
					report.set(bit, index, value + 1);
				}
			}
		}

		return report;
	}

	zeros: number[];
	ones: number[];

	private constructor(entry: string | undefined) {
		this.zeros = zeroFill(entry);
		this.ones = zeroFill(entry);
	}

	[Symbol.iterator]() {
		return zip(this.zeros, this.ones);
	}

	set(bit: '0' | '1', index: number, count: number) {
		if (bit === '0') {
			this.zeros[index] = count;
		}

		if (bit === '1') {
			this.ones[index] = count;
		}
	}

	get(bit: '0' | '1', index: number) {
		return (bit === '0' ? this.zeros[index] : this.ones[index]) ?? 0;
	}

	at(index: number): [number, number] {
		return [this.zeros[index] ?? 0, this.ones[index] ?? 0];
	}
}

class Diagnostic {
	report: Report;

	get gammaRate() {
		return this.run((report) => {
			let result = '';

			for (const [zeros, ones] of report) {
				const next = ones > zeros ? 1 : 0;
				result = `${result}${next}`;
			}

			return result;
		});
	}

	get epsilonRate() {
		return this.run((report) => {
			let result = '';

			for (const [zeros, ones] of report) {
				const next = zeros > ones ? 1 : 0;
				result = `${result}${next}`;
			}

			return result;
		});
	}

	get powerConsumption() {
		return this.gammaRate * this.epsilonRate;
	}

	get oxygenGeneratorRating() {
		let {input} = this;
		const [entry = ''] = this.input;

		return this.run(() => {
			for (const index of keys(entry)) {
				if (input.length > 1) {
					const [zeros, ones] = Report.generate(input).at(index);
					const filter = ones >= zeros ? '1' : '0';
					input = input.filter((item) => item.charAt(index) === filter);
				}
			}

			return input[0] ?? '';
		});
	}

	get co2ScrubberRating() {
		let {input} = this;
		const [entry = ''] = input;

		return this.run(() => {
			for (const index of keys(entry)) {
				if (input.length > 1) {
					const [zeros, ones] = Report.generate(input).at(index);
					const filter = ones >= zeros ? '0' : '1';
					input = input.filter((item) => item.charAt(index) === filter);
				}
			}

			return input[0] ?? '';
		});
	}

	get lifeSupportRating() {
		return this.oxygenGeneratorRating * this.co2ScrubberRating;
	}

	constructor(protected input: string[]) {
		this.report = Report.generate(input);
	}

	run(run: (report: Report) => string) {
		return this.fromBinary(run(this.report));
	}

	fromBinary(result: string) {
		return Number.parseInt(result, 2);
	}
}

function* zip<T>(a: Iterable<T>, b: Iterable<T>): Generator<[T, T]> {
	const iteratorA = a[Symbol.iterator]();
	const iteratorB = b[Symbol.iterator]();

	let nextA = iteratorA.next();
	let nextB = iteratorB.next();

	while (!nextA.done && !nextB.done) {
		yield [nextA.value, nextB.value];
		nextA = iteratorA.next();
		nextB = iteratorB.next();
	}
}

export const partOne = (input: string[]) => {
	const diagnostic = new Diagnostic(input);
	return diagnostic.powerConsumption;
};

export const partTwo = (input: string[]) => {
	const diagnostic = new Diagnostic(input);
	return diagnostic.lifeSupportRating;
};
