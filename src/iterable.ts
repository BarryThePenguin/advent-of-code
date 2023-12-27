export function* chunk<T>(
	iterable: Iterable<T>,
	chunkSize: number,
): Iterable<T[]> {
	if (chunkSize < 1) {
		throw new Error(`Invalid chunk size: ${chunkSize}`);
	}

	const it = iter(iterable);

	for (;;) {
		const chunk = Array.from(take(it, chunkSize));

		if (chunk.length > 0) {
			yield chunk;
		}

		if (chunk.length < chunkSize) {
			return;
		}
	}
}

export function* take<T>(iterable: Iterable<T>, n: number): Iterable<T> {
	const it = iter(iterable);
	let count = n;
	do {
		const s = it.next();
		if (s.done) {
			// Iterable exhausted, quit early
			return;
		}

		yield s.value;

		count--;
	} while (count > 0);
}

export function iter<T>(iterable: Iterable<T>): IterableIterator<T> {
	class SelfIter implements IterableIterator<T> {
		readonly #iterator: Iterator<T>;

		constructor(orig: Iterable<T>) {
			this.#iterator = orig[Symbol.iterator]();
		}

		[Symbol.iterator]() {
			return this;
		}

		next() {
			return this.#iterator.next();
		}
	}
	return new SelfIter(iterable);
}

export function* flatten<T>(...iterables: Array<Iterable<T>>): Iterable<T> {
	for (const iterable of iterables) {
		for (const item of iterable) {
			yield item;
		}
	}
}
