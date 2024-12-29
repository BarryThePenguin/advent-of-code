import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import * as parse from './parse.ts';

export function readFile(inputPath: string) {
	const filePath = resolve('./input', inputPath);
	return readFileSync(filePath, 'utf8');
}

export function readLines(inputPath: string, split = '\n') {
	const input = readFile(inputPath);
	return parse.lines(input, split);
}
