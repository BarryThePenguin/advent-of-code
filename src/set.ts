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

export function symmetricDifference<T>(...sets: Array<Set<T>>) {
  const differenceSet = new Set();

  if (sets.length > 1) {
    for (const set of sets) {
      for (const item of set) {
        if (differenceSet.has(item)) {
          differenceSet.delete(item);
        } else {
          differenceSet.add(item);
        }
      }
    }
  }

  return differenceSet;
}
