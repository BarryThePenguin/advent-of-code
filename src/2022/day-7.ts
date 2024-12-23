import {sum} from '../chunk.ts';

const startsWithNumber = /^\d+/;

const isCommand = (line: string) => line.startsWith('$');

const isDirectory = (line: string) => line.startsWith('dir');

const isFile = (line: string) => startsWithNumber.test(line);

class File {
	constructor(
		public name: string,
		public size: number,
	) {}
}

class Directory {
	nodes = new Map<string, Node>();

	constructor(
		public name: string,
		public parent?: Directory,
	) {
		parent?.addNode(this);
	}

	get size() {
		let size = 0;

		for (const node of this.nodes.values()) {
			size += node.size;
		}

		return size;
	}

	*[Symbol.iterator](): IterableIterator<Node> {
		for (const node of this.nodes.values()) {
			yield node;

			if (node instanceof Directory) {
				yield* node;
			}
		}
	}

	addNode(node: Node) {
		this.nodes.set(node.name, node);
	}
}

type Node = Directory | File;

class Terminal {
	root?: Directory;

	constructor(input: string[]) {
		let currentDirectory: Directory | undefined;

		for (const line of input) {
			if (isCommand(line)) {
				const {command, args} = parseCommand(line);

				if (command === 'cd') {
					const name = args[0];

					if (name === '/') {
						currentDirectory = new Directory(name);
						this.root = currentDirectory;
					} else if (name === '..') {
						currentDirectory = currentDirectory?.parent;
					} else {
						currentDirectory = new Directory(name, currentDirectory);
					}
				}
			} else if (isFile(line)) {
				const {name, size} = parseFile(line);
				currentDirectory?.addNode(new File(name, size));
			}
		}
	}

	*filterDirectories(filter: (directory: Directory) => boolean) {
		if (this.root) {
			for (const node of this.root) {
				if (node instanceof Directory && filter(node)) {
					yield node.size;
				}
			}
		}
	}

	findFreeSpace() {
		const usedSpace = this.root?.size ?? 0;
		const totalSpace = 70_000_000;
		const unusedSpace = totalSpace - usedSpace;
		const target = 30_000_000;

		const directories = this.filterDirectories(
			(directory) => directory.size + unusedSpace >= target,
		);

		const [directory] = Array.from(directories).sort((a, b) => a - b);

		return directory;
	}
}

function parseCommand(line: string) {
	const [, command, ...arguments_] = line.split(' ');
	return {command, args: arguments_};
}

function parseFile(line: string) {
	const [size, name] = line.split(' ');
	return {size: Number(size), name};
}

export const partOne = (input: string[]) => {
	const terminal = new Terminal(input);
	const directories = terminal.filterDirectories(
		(directory) => directory.size <= 100_000,
	);
	return sum(directories);
};

export const partTwo = (input: string[]) => {
	const terminal = new Terminal(input);
	return terminal.findFreeSpace();
};
