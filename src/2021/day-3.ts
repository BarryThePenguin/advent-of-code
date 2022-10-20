import {zeroFill} from '../range.js';

class Diagnostic {
	static generate(report: string[]) {
		const [entry] = report;

		const zeros = zeroFill(entry);
		const ones = zeroFill(entry);

		for (const item of report) {
			for (const [index, bit] of item.split('').entries()) {
				if (bit === '0') {
					zeros[index] += 1;
				}

				if (bit === '1') {
					ones[index] += 1;
				}
			}
		}

		return {zeros, ones};
	}

	report: string[];

	zeros: number[];

	ones: number[];

	get gammaRate() {
		let result = '';

		for (const [index, bit] of this.ones.entries()) {
			const next = bit > this.zeros[index] ? 1 : 0;
			result = `${result}${next}`;
		}

		return Number.parseInt(result, 2);
	}

	get epsilonRate() {
		let result = '';

		for (const [index, bit] of this.zeros.entries()) {
			const next = bit > this.ones[index] ? 1 : 0;
			result = `${result}${next}`;
		}

		return Number.parseInt(result, 2);
	}

	get powerConsumption() {
		return this.gammaRate * this.epsilonRate;
	}

	get oxygenGeneratorRating() {
		let report = this.report;
		const [entry] = report;

		for (const [index] of entry.split('').entries()) {
			if (report.length > 1) {
				const {zeros, ones} = Diagnostic.generate(report);
				const filter = ones[index] >= zeros[index] ? '1' : '0';
				report = report.filter((item) => item.charAt(index) === filter);
			}
		}

		return Number.parseInt(report[0], 2);
	}

	get co2ScrubberRating() {
		let report = this.report;
		const [entry] = report;

		for (const [index] of entry.split('').entries()) {
			if (report.length > 1) {
				const {zeros, ones} = Diagnostic.generate(report);
				const filter = zeros[index] <= ones[index] ? '0' : '1';
				report = report.filter((item) => item.charAt(index) === filter);
			}
		}

		return Number.parseInt(report[0], 2);
	}

	get lifeSupportRating() {
		return this.oxygenGeneratorRating * this.co2ScrubberRating;
	}

	constructor(report: string[]) {
		this.report = report;

		const {zeros, ones} = Diagnostic.generate(report);

		this.zeros = zeros;
		this.ones = ones;
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
