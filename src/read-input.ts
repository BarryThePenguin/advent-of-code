import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';

export default async function readInput(inputPath: string) {
  const filePath = resolve('./input', inputPath);
  return readFile(filePath, 'utf8');
}
