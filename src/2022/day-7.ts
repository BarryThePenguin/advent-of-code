import {createDay} from '../day-test.ts';
import {sum} from '../chunk.ts';

const commandRegex = /^\$ (cd|ls) (.+)$/;
const fileRegex = /^(\d+) (.+)$/;

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
			const [, command, ...arguments_] = commandRegex.exec(line) ?? [];

			if (command === 'cd') {
				const [name = ''] = arguments_;

				if (name === '/') {
					currentDirectory = new Directory(name);
					this.root = currentDirectory;
				} else if (name === '..') {
					currentDirectory = currentDirectory?.parent;
				} else {
					currentDirectory = new Directory(name, currentDirectory);
				}
			} else {
				const [, size, name] = fileRegex.exec(line) ?? [];

				if (size && name) {
					currentDirectory?.addNode(new File(name, Number(size)));
				}
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

		const [directory] = [...directories].sort((a, b) => a - b);

		return directory;
	}
}

export const day = createDay({
	partOne(input: string[]) {
		const terminal = new Terminal(input);
		const directories = terminal.filterDirectories(
			(directory) => directory.size <= 100_000,
		);
		return sum(directories);
	},

	partTwo(input: string[]) {
		const terminal = new Terminal(input);
		return terminal.findFreeSpace();
	},
});
