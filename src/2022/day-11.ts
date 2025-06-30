import {ok} from 'node:assert';
import {createDay} from '../day-test.ts';
import {chunk} from '../chunk.ts';
import * as parse from '../parse.ts';

type TestInput = {
	value: number;
	true: number;
	false: number;
};

class Item {
	constructor(private value: number) {}

	add(amount: number | 'old') {
		return this.value + this.level(amount);
	}

	inspect(operation: Operation) {
		this.value = operation.operate(this);
	}

	level(amount: number | 'old') {
		return amount === 'old' ? this.value : amount;
	}

	multiply(amount: number | 'old') {
		return this.value * this.level(amount);
	}

	test(input: TestInput) {
		return this.value % input.value === 0 ? input.true : input.false;
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
		const level =
			this.operation === '*'
				? item.multiply(this.amount)
				: item.add(this.amount);

		return this.worry(level);
	}
}

class Monkey {
	inspectCount = 0;

	constructor(
		protected items: Item[],
		public operation: Operation,
		public testInput: TestInput,
	) {}

	inspectItems() {
		return [...this.items];
	}

	inspect(item: Item) {
		this.inspectCount++;
		item.inspect(this.operation);

		return item.test(this.testInput);
	}

	throwItem(item: Item, to?: Monkey) {
		this.items.splice(this.items.indexOf(item));

		if (to) {
			to.items.push(item);
		}
	}
}

const operationRegex = /new = old ([*+]) (old|\d+)/;

class KeepAway {
	monkeys: Monkey[] = [];

	constructor(
		input: Iterable<string>,
		protected worry: (this: KeepAway, level: number) => number,
	) {
		for (const [
			,
			startingItemsInput = '',
			operationInput = '',
			testInput = '',
			trueInput = '',
			falseInput = '',
		] of chunk(input, 7)) {
			const items = parse
				.integers(startingItemsInput)
				.map((item) => new Item(item))
				.toArray();

			const result = operationRegex.exec(operationInput);

			ok(result);

			const [, operation = '', amount = ''] = result;

			const [test = 0] = parse.integers(testInput);
			const [trueTest = 0] = parse.integers(trueInput);
			const [falseTest = 0] = parse.integers(falseInput);

			const monkey = new Monkey(
				items,
				new Operation(amount, operation, this.worry.bind(this)),
				{value: test, true: trueTest, false: falseTest},
			);

			this.monkeys.push(monkey);
		}
	}

	get modulo() {
		return this.monkeys.reduce(
			(accumulator, monkey) => accumulator * monkey.testInput.value,
			1,
		);
	}

	play() {
		for (const monkey of this.monkeys) {
			for (const item of monkey.inspectItems()) {
				const throwTo = monkey.inspect(item);
				monkey.throwItem(item, this.monkeys[throwTo]);
			}
		}
	}

	monkeyBusiness() {
		const [one, two] = this.monkeys.sort(
			(a, b) => b.inspectCount - a.inspectCount,
		);

		ok(one);
		ok(two);

		return one.inspectCount * two.inspectCount;
	}
}

export const day = createDay({
	partOne(input: Iterable<string>) {
		const rounds = 20;
		const game = new KeepAway(input, (level) => Math.floor(level / 3));
		for (let index = 0; index < rounds; index++) {
			game.play();
		}

		return game.monkeyBusiness();
	},

	partTwo(input: Iterable<string>) {
		const rounds = 10_000;
		const game = new KeepAway(input, function (level) {
			return level % this.modulo;
		});
		for (let index = 0; index < rounds; index++) {
			game.play();
		}

		return game.monkeyBusiness();
	},
});
