import {type TestFunction} from 'vitest';
import {readLines, readFile} from './read-input.ts';

type DayInput<InputOne, InputTwo, ExpectedOne, ExpectedTwo> = {
	partOne(input: InputOne): ExpectedOne;
	partTwo(input: InputTwo): ExpectedTwo;
};

export function createDay<InputOne, InputTwo, ExpectedOne, ExpectedTwo>(
	day: DayInput<InputOne, InputTwo, ExpectedOne, ExpectedTwo>,
) {
	return new Day(day);
}

class Day<InputOne, InputTwo, ExpectedOne, ExpectedTwo> {
	readonly #day: DayInput<InputOne, InputTwo, ExpectedOne, ExpectedTwo>;

	constructor(day: DayInput<InputOne, InputTwo, ExpectedOne, ExpectedTwo>) {
		this.#day = day;
	}

	readFile(inputPath: string) {
		return readFile(inputPath);
	}

	readLines(inputPath: string, split?: string) {
		return readLines(inputPath, split);
	}

	partOne(input: InputOne, expected: ExpectedOne): TestFunction {
		return ({expect}) => {
			expect(this.#day.partOne(input)).toEqual(expected);
		};
	}

	partTwo(input: InputTwo, expected: ExpectedTwo): TestFunction {
		return ({expect}) => {
			expect(this.#day.partTwo(input)).toEqual(expected);
		};
	}
}
