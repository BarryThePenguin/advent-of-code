import {createDay} from '../day-test.ts';
import * as parse from '../parse.ts';

class Report {
	readonly safe: boolean;

	readonly #input: number[];

	constructor(input: Iterable<number>) {
		this.#input = [...input];

		const [first = 0, ...rest] = this.#input;

		this.safe = this.isSafe(first, ...rest);
	}

	*problemDampener() {
		for (const index of this.#input.keys()) {
			const report = new Report(this.#input.toSpliced(index, 1));

			if (report.safe) {
				yield report;
			}
		}
	}

	isSafe(previous: number, ...rest: number[]) {
		const safePositive = new Set([1, 2, 3]);
		const safeNegative = new Set([-1, -2, -3]);

		for (const level of rest) {
			const difference = level - previous;
			safeNegative.add(difference);
			safePositive.add(difference);

			previous = level;
		}

		return safeNegative.size === 3 || safePositive.size === 3;
	}
}

class RedNosedReports {
	readonly #safeReports: Report[] = [];

	readonly #unsafeReports: Report[] = [];

	constructor(input: Iterable<string>) {
		for (const line of input) {
			const report = new Report(parse.integers(line));

			if (report.safe) {
				this.#safeReports.push(report);
			} else {
				this.#unsafeReports.push(report);
			}
		}
	}

	get safeCount() {
		return this.#safeReports.length;
	}

	applyProblemDampener() {
		for (const unsafeReport of this.#unsafeReports) {
			const safeReport = unsafeReport
				.problemDampener()
				.find((problem) => problem.safe);

			if (safeReport) {
				this.#safeReports.push(safeReport);
			}
		}
	}
}

export const day = createDay({
	partOne(input: Iterable<string>) {
		const reports = new RedNosedReports(input);

		return reports.safeCount;
	},

	partTwo(input: Iterable<string>) {
		const reports = new RedNosedReports(input);

		reports.applyProblemDampener();

		return reports.safeCount;
	},
});
