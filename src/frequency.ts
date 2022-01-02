export function frequency<T>(sequence: T[]): Map<T, number> {
  const map = new Map<T, number>();

  for (const item of sequence) {
    const count = map.get(item) ?? 0;
    map.set(item, count + 1);
  }

  return map;
}
