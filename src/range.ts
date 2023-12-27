function rangeArgs(start: number | {length: number}, end?: number, step = 1) {
	if (typeof start !== 'number') {
		start = start.length;
	}

	if (end === undefined) {
		end = start;
		start = 0;
	}

	return {start, end, step};
}

export type RangeArgs = Parameters<typeof rangeArgs>;

export class Range implements Iterable<number> {
	constructor(
		public readonly start: number,
		public readonly end: number,
		public readonly step: number,
	) {}

	*[Symbol.iterator](): Iterator<number> {
		let k = 0;

		while (k < this.length) {
			yield k * this.step + this.start;
			k++;
		}
	}

	get length() {
		return Math.max(Math.ceil((this.end - this.start) / this.step), 0);
	}

	includes(value: number) {
		return this.start <= value && value <= this.end;
	}
}

export function range(...args: RangeArgs) {
	const {start, end, step} = rangeArgs(...args);

	return new Range(start, end, step);
}

export function rangeFill(...args: RangeArgs) {
	const {start, end, step} = rangeArgs(...args);

	return range(start, end + 1, step);
}

export function* zeroFill(length: number | {length: number}) {
	if (typeof length !== 'number') {
		length = length.length;
	}

	let k = 0;

	while (k < length) {
		yield 0;
		k++;
	}
}
