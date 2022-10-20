export function frequency<T>(sequence: T[]): Map<T, number> {
	const map = new Map<T, number>();

	for (const item of sequence) {
		const count = map.get(item) ?? 0;
		map.set(item, count + 1);
	}

	return map;
}

export function reverseMap<K, V>(map: Map<K, V>): Map<V, K[]> {
	const reverse = new Map<V, K[]>();

	for (const [k, v] of map) {
		const value = reverse.get(v) ?? [];
		reverse.set(v, [...value, k]);
	}

	return reverse;
}

export function uniqueReverseMap<K, V>(map: Map<K, V>): Map<V, K> {
	const reverse = new Map<V, K>();

	for (const [k, v] of map) {
		if (!reverse.has(v)) {
			reverse.set(v, k);
		}
	}

	return reverse;
}

export function countFrequency<T>(sequence: T[]): Map<number, T[]> {
	return reverseMap(frequency(sequence));
}
