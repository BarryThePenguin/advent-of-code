type Chunkable<T> = {
	length: number;

	slice(start?: number, end?: number): T;
};

export function* chunk<T>(
	items: Chunkable<T>,
	chunkSize = items.length,
): Generator<T> {
	let start = 0;

	while (start < items.length) {
		yield items.slice(start, (start += chunkSize));
	}
}

export function entries<T>(items: Iterable<T> | ArrayLike<T>) {
	return Array.from(items).entries();
}

export function sum(items: Iterable<number>) {
	return Array.from(items).reduce((a, b) => a + b, 0);
}
