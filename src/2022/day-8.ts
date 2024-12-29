import {createDay} from '../day-test.ts';
import {toCoordinates, Grid} from '../to-grid.ts';

class Tree {
	constructor(
		public x: number,
		public y: number,
		public height: number,
	) {}

	get coordinates() {
		return toCoordinates(this.x, this.y);
	}
}

class TreeHouse extends Grid<Tree> {
	get trees() {
		return this.grid;
	}

	constructor(input: string[]) {
		super(
			Grid.coordinatesFrom(input, function (x, y, value) {
				return new Tree(x, y, Number(value));
			}),
		);
	}

	isVisible(tree: Tree) {
		const upRow = this.getAdjacentRow(tree, (item) => this.adjacentUp(item));
		const downRow = this.getAdjacentRow(tree, (item) =>
			this.adjacentDown(item),
		);
		const leftRow = this.getAdjacentRow(tree, (item) =>
			this.adjacentLeft(item),
		);
		const rightRow = this.getAdjacentRow(tree, (item) =>
			this.adjacentRight(item),
		);

		const visibleUp = upRow.every((row) => tree.height > row.height);
		const visibleDown = downRow.every((row) => tree.height > row.height);
		const visibleLeft = leftRow.every((row) => tree.height > row.height);
		const visibleRight = rightRow.every((row) => tree.height > row.height);

		return visibleUp || visibleDown || visibleLeft || visibleRight;
	}

	*getAdjacentRow(tree: Tree, adjacent: (item: Tree) => Tree | undefined) {
		let current: Tree | undefined = tree;

		while (current !== undefined) {
			current = adjacent(current);

			if (current) {
				yield current;
			}
		}
	}

	*findVisibleTrees() {
		for (const tree of this.trees.values()) {
			if (this.isVisible(tree)) {
				yield tree;
			}
		}
	}

	viewingDistance(tree: Tree, row: Generator<Tree>) {
		let count = 0;

		for (const rowTree of row) {
			count++;

			if (rowTree.height >= tree.height) {
				return count;
			}
		}

		return count;
	}

	*calculateScenicScore() {
		for (const tree of this.trees.values()) {
			const upRow = this.getAdjacentRow(tree, (item) => this.adjacentUp(item));
			const downRow = this.getAdjacentRow(tree, (item) =>
				this.adjacentDown(item),
			);
			const leftRow = this.getAdjacentRow(tree, (item) =>
				this.adjacentLeft(item),
			);
			const rightRow = this.getAdjacentRow(tree, (item) =>
				this.adjacentRight(item),
			);

			const upDistance = this.viewingDistance(tree, upRow);
			const downDistance = this.viewingDistance(tree, downRow);
			const leftDistance = this.viewingDistance(tree, leftRow);
			const rightDistance = this.viewingDistance(tree, rightRow);

			yield upDistance * downDistance * leftDistance * rightDistance;
		}
	}
}

export const day = createDay({
	partOne(input: string[]) {
		const treeHouse = new TreeHouse(input);
		const trees = treeHouse.findVisibleTrees();
		return trees.toArray().length;
	},

	partTwo(input: string[]) {
		const treeHouse = new TreeHouse(input);
		const score = treeHouse.calculateScenicScore();
		const [topScore] = score.toArray().sort((a, b) => b - a);
		return topScore;
	},
});
