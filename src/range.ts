function rangeArgs(start: number | { length: number }, end?: number, step = 1) {
  if (typeof start !== 'number') {
    start = start.length
  }
  
  if (typeof end === 'undefined') {
    end = start
    start = 0
  }
  
  return { start, end, step}
}

export type RangeArgs = Parameters<typeof rangeArgs>

export function range(...args: RangeArgs) {
  const { start, end, step } = rangeArgs(...args)
  
  const length = Math.max(Math.ceil((end - start) / (step || 1)), 0)
  
  return Array.from({ length }, (_, k) => (k * step) + start)
}

export function rangeFill(...args: RangeArgs) {
  const { start, end, step } = rangeArgs(...args)
  
  return range(start, end + 1, step)
}

export function zeroFill(length: number | { length: number }) {
  if (typeof length !== 'number') {
    length = length.length
  }
  
  return Array.from({ length }).fill(0)
}