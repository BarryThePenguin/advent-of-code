export function intersection<T>(
	first: ReadonlySet<T>,
	...sets: Array<ReadonlySetLike<T>>
) {
	let intersectionSet = first;

	for (const set of sets) {
		intersectionSet = intersectionSet.intersection(set);
	}

	return intersectionSet;
}

export function equivalence<T>(
	first: ReadonlySet<T>,
	...sets: Array<ReadonlySetLike<T>>
) {
	for (const set of sets) {
		if (!first.isSubsetOf(set) || !first.isSupersetOf(set)) {
			return false;
		}
	}

	return true;
}

export function difference<T>(
	first: ReadonlySet<T>,
	...sets: Array<ReadonlySetLike<T>>
) {
	let differenceSet: ReadonlySet<T> = new Set<T>();

	if (sets.length > 0) {
		differenceSet = first;
	}

	for (const set of sets) {
		differenceSet = differenceSet.difference(set);
	}

	return differenceSet;
}

export function superset<T>(
	first: ReadonlySet<T>,
	second: ReadonlySetLike<T>,
): boolean {
	return first.isSupersetOf(second);
}
