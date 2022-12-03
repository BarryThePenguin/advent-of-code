export function union<T>(...sets: Array<Iterable<T>>) {
	return new Set(sets.flatMap((set) => Array.from(set)));
}

export function intersection<T>(first: Set<T>, ...sets: Array<Set<T>>) {
	let intersectionSet = first;

	for (const set of sets) {
		intersectionSet = new Set(
			Array.from(intersectionSet).filter((value) => set.has(value)),
		);
	}

	return intersectionSet;
}

export function relativeComplement<T>(first: Set<T>, ...sets: Array<Set<T>>) {
	let complementSet = first;

	for (const set of sets) {
		complementSet = new Set(
			Array.from(complementSet).filter((value) => !set.has(value)),
		);
	}

	return complementSet;
}

export function equivalence<T>(first: Set<T>, ...sets: Array<Set<T>>) {
	if (sets.length === 0) {
		return true;
	}

	const unionSet = union(first, ...sets);

	return (
		unionSet.size === first.size && sets.every((set) => set.size === first.size)
	);
}

export function difference<T>(...sets: Array<Set<T>>) {
	let differenceSet = new Set();

	if (sets.length > 1) {
		const [first, ...rest] = sets;
		differenceSet = new Set(first);
		for (const set of rest) {
			for (const item of set) {
				if (differenceSet.has(item)) {
					differenceSet.delete(item);
				}
			}
		}
	}

	return differenceSet;
}

export function symmetricDifference<T>(
	first?: Set<T>,
	second?: Set<T>,
	...rest: Array<Set<T>>
) {
	let result = new Set<T>();

	if (first && second) {
		result = union(
			relativeComplement(first, second),
			relativeComplement(second, first),
		);
	}

	if (rest.length > 0) {
		result = symmetricDifference(result, ...rest);
	}

	return result;
}
