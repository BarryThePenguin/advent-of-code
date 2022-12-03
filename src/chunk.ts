export function chunk<T>(items: T[], chunkSize = items.length): T[][] {
	let start = 0;

	return Array.from({
		*[Symbol.iterator]() {
			while (start < items.length) {
				yield items.slice(start, (start += chunkSize));
			}
		},
	});
}
