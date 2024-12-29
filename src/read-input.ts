import {createReadStream, readFileSync} from 'node:fs';
import {createInterface, type Interface} from 'node:readline';
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

export class Reader {
	readonly #readline: Interface | undefined;

	constructor(inputPath: string, onLine: (line: string) => void) {
		const filePath = resolve('./input', inputPath);

		this.#readline = createInterface({
			input: createReadStream(filePath),
		});

		this.#readline.on('line', onLine);
	}

	close() {
		this.#readline?.close();
	}
}
