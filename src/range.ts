function rangeArguments(
	start: {length: number} | number = 0,
	end?: number,
	step = 1,
) {
	if (typeof start !== 'number') {
		start = start.length;
	}

	if (end === undefined) {
		end = start;
		start = 0;
	}

	return {start, end, step};
}

export type RangeArguments = Parameters<typeof rangeArguments>;

export class Range implements ReadonlySet<number> {
	readonly #start: number;

	readonly #end: number;

	readonly #step: number;

	constructor(start: number, end: number, step: number) {
		this.#start = start;
		this.#end = end;
		this.#step = step;
	}

	get [Symbol.toStringTag]() {
		return 'Range';
	}

	*[Symbol.iterator](): SetIterator<number> {
		let k = 0;

		while (k < this.size) {
			yield k * this.#step + this.#start;
			k++;
		}
	}

	get start() {
		return this.#start;
	}

	get end() {
		return this.#end;
	}

	forEach(
		callbackfn: (
			value: number,
			value2: number,
			set: ReadonlySet<number>,
		) => void,
		thisArgument?: unknown,
	): void {
		for (const value of this) {
			callbackfn.call(thisArgument, value, value, this);
		}
	}

	entries(): SetIterator<[number, number]> {
		throw new Error('Method not implemented.');
	}

	keys(): SetIterator<number> {
		return this[Symbol.iterator]();
	}

	values(): SetIterator<number> {
		return this[Symbol.iterator]();
	}

	union<U>(other: ReadonlySetLike<U>): Set<number | U> {
		const set = new Set(this);
		return set.union(other);
	}

	difference<U>(other: ReadonlySetLike<U>): Set<number> {
		const set = new Set(this);
		return set.difference(other);
	}

	symmetricDifference<U>(other: ReadonlySetLike<U>): Set<number | U> {
		const set = new Set(this);
		return set.symmetricDifference(other);
	}

	isDisjointFrom(other: ReadonlySetLike<unknown>): boolean {
		const set = new Set(this);
		return set.isDisjointFrom(other);
	}

	has(value: number): boolean {
		return this.#start <= value && value <= this.#end;
	}

	get size(): number {
		return Math.max(Math.ceil((this.#end - this.#start) / this.#step), 0);
	}

	intersection<U>(other: ReadonlySetLike<U>): Set<number & U> {
		const set = new Set(this);
		return set.intersection(other);
	}

	isSubsetOf(other: ReadonlySetLike<unknown>): boolean {
		const set = new Set(this);
		return set.isSubsetOf(other);
	}

	isSupersetOf(other: ReadonlySetLike<unknown>): boolean {
		const set = new Set(this);
		return set.isSupersetOf(other);
	}

	toArray() {
		return [...this];
	}

	overlap(...ranges: Range[]): Range {
		let overlap = new Range(0, 0, 1);

		for (const other of ranges) {
			const start = Math.max(this.#start, other.#start);
			const end = Math.min(this.#end, other.#end);

			if (start < end) {
				overlap = new Range(start, end, this.#step);
			}
		}

		return overlap;
	}
}

export function intersects(
	first: ReadonlySet<number>,
	second: ReadonlySetLike<number>,
): boolean {
	return first.intersection(second).size > 0;
}

export function range(...arguments_: RangeArguments) {
	const {start, end, step} = rangeArguments(...arguments_);

	return new Range(start, end, step);
}

export function rangeFill(...arguments_: RangeArguments) {
	const {start, end, step} = rangeArguments(...arguments_);

	return range(start, end + 1, step);
}

export function zeroFill(length: {length: number} | number = 1): number[] {
	if (typeof length === 'number') {
		return Array.from({length}, () => 0);
	}

	return Array.from(length, () => 0);
}
