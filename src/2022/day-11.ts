import {chunk} from '../chunk.js';

class Item {
	constructor(public value: number) {}

	inspect(operation: Operation) {
		this.value = operation.operate(this);
	}
}

class Operation {
	amount: 'old' | number;

	constructor(
		amount: string,
		protected operation: string,
		protected worry: (level: number) => number,
	) {
		this.amount = amount === 'old' ? amount : Number(amount);
	}

	operate(item: Item) {
		let level = this.amount === 'old' ? item.value : this.amount;

		level = this.operation === '*' ? item.value * level : item.value + level;

		return this.worry(level);
	}
}

class Test {
	constructor(
		public testInput: number,
		protected trueResult: number,
		protected falseResult: number,
	) {}

	worry(level: number) {
		return level % this.testInput === 0 ? this.trueResult : this.falseResult;
	}
}

class Monkey {
	inspectCount = 0;

	constructor(
		protected items: Item[],
		public operation: Operation,
		public test: Test,
	) {}

	inspectItems() {
		return [...this.items];
	}

	inspect(item: Item) {
		this.inspectCount++;
		item.inspect(this.operation);
	}

	throwItem(item: Item) {
		this.items.splice(this.items.indexOf(item));

		return {
			to(monkey: Monkey) {
				monkey.items.push(item);
			},
		};
	}
}

class KeepAway {
	monkeys: Monkey[] = [];

	constructor(
		input: string[],
		protected worry: (this: KeepAway, level: number) => number,
	) {
		for (const [
			monkeyInput,
			startingItemsInput,
			operationInput,
			testInput,
			trueInput,
			falseInput,
		] of chunk(input, 7)) {
			const [, startingItems] = startingItemsInput.split('Starting items: ');
			const [, operationAmount] = operationInput.split('Operation: new = old ');
			const [operation, amount] = operationAmount.split(' ');

			const [, input] = testInput.split('Test: divisible by ');
			const [, trueTest] = trueInput.split('If true: throw to monkey ');
			const [, falseTest] = falseInput.split('If false: throw to monkey ');

			const items = startingItems
				.split(', ')
				.map((item) => new Item(Number(item)));

			const monkey = new Monkey(
				items,
				new Operation(amount, operation, this.worry.bind(this)),
				new Test(Number(input), Number(trueTest), Number(falseTest)),
			);

			this.monkeys.push(monkey);
		}
	}

	get modulo() {
		return this.monkeys.reduce(
			(accumulator, monkey) => accumulator * monkey.test.testInput,
			1,
		);
	}

	play() {
		for (const monkey of this.monkeys) {
			for (const item of monkey.inspectItems()) {
				monkey.inspect(item);

				const throwTo = this.test(monkey, item);
				monkey.throwItem(item).to(throwTo);
			}
		}
	}

	test(monkey: Monkey, item: Item) {
		const throwTo = monkey.test.worry(item.value);
		return this.monkeys[throwTo];
	}

	monkeyBusiness() {
		const [one, two] = this.monkeys.sort(
			(a, b) => b.inspectCount - a.inspectCount,
		);

		return one.inspectCount * two.inspectCount;
	}
}

export const partOne = (input: string[]) => {
	const rounds = 20;
	const game = new KeepAway(input, function (level) {
		return Math.floor(level / 3);
	});
	for (let index = 0; index < rounds; index++) {
		game.play();
	}

	return game.monkeyBusiness();
};

export const partTwo = (input: string[]) => {
	const rounds = 10_000;
	const game = new KeepAway(input, function (level) {
		return level % this.modulo;
	});
	for (let index = 0; index < rounds; index++) {
		game.play();
	}

	return game.monkeyBusiness();
};
