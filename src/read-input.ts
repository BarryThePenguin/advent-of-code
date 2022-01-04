import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';

export function readInput(inputPath: string) {
  const filePath = resolve('./input', inputPath);
  return readFileSync(filePath, 'utf8');
}

export function readLines(inputPath: string, split = '\n') {
  const input = readInput(inputPath);
  return input.split(split);
}
