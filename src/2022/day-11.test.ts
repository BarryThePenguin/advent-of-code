import test from 'ava';
import {createDayMacro} from '../create-day-macro.js';
import {readLines} from '../read-input.js';
import * as dayOne from './day-11.js';

const {partOne, partTwo} = createDayMacro(dayOne);

const testInput = [
	'Monkey 0:',
	'  Starting items: 79, 98',
	'  Operation: new = old * 19',
	'  Test: divisible by 23',
	'    If true: throw to monkey 2',
	'    If false: throw to monkey 3',
	'',
	'Monkey 1:',
	'  Starting items: 54, 65, 75, 74',
	'  Operation: new = old + 6',
	'  Test: divisible by 19',
	'    If true: throw to monkey 2',
	'    If false: throw to monkey 0',
	'',
	'Monkey 2:',
	'  Starting items: 79, 60, 97',
	'  Operation: new = old * old',
	'  Test: divisible by 13',
	'    If true: throw to monkey 1',
	'    If false: throw to monkey 3',
	'',
	'Monkey 3:',
	'  Starting items: 74',
	'  Operation: new = old + 3',
	'  Test: divisible by 17',
	'    If true: throw to monkey 0',
	'    If false: throw to monkey 1',
];

test('part one: example', partOne, testInput, 10_605);

test('part one', partOne, readLines('2022/day-11'), 62_491);

test('part two: example', partTwo, testInput, 2_713_310_158);

test('part two', partTwo, readLines('2022/day-11'), 17_408_399_184);
