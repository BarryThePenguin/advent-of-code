export function* chunk<T>(
	iterator: Iterator<T> | Iterable<T>,
	chunkSize: number,
): Generator<T[]> {
	let buffer = [];

	for (const element of Iterator.from(iterator)) {
		buffer.push(element);
		if (buffer.length === chunkSize) {
			yield buffer;
			buffer = [];
		}
	}

	if (buffer.length > 0) {
		yield buffer;
	}
}

export function* windows<T>(
	iterator: Iterator<T> | Iterable<T>,
	windowSize: number,
): Generator<T[]> {
	const buffer = [];

	for (const element of Iterator.from(iterator)) {
		if (buffer.length === windowSize) {
			buffer.shift();
		}

		buffer.push(element);

		if (buffer.length === windowSize) {
			yield buffer.slice();
		}
	}
}

export function entries<T>(
	items: Iterator<T> | Iterable<T>,
): ArrayIterator<[number, T]> {
	return Iterator.from(items).toArray().entries();
}

export function keys<T>(
	items: Iterator<T> | Iterable<T>,
): ArrayIterator<number> {
	return Iterator.from(items).toArray().keys();
}

export function sum(items: Iterator<number> | Iterable<number>) {
	return Iterator.from(items).reduce((a, b) => a + b, 0);
}

export function* walk<T>(items: Iterator<T> | Iterable<T>) {
	let previous;

	for (const current of Iterator.from(items)) {
		yield {previous, current};
		previous = current;
	}
}
