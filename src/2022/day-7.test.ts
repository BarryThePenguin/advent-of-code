import test from 'ava';
import {createDayMacro} from '../create-day-macro.js';
import {readLines} from '../read-input.js';
import * as dayOne from './day-7.js';

const {partOne, partTwo} = createDayMacro(dayOne);

const testInput = [
	'$ cd /',
	'$ ls',
	'dir a',
	'14848514 b.txt',
	'8504156 c.dat',
	'dir d',
	'$ cd a',
	'$ ls',
	'dir e',
	'29116 f',
	'2557 g',
	'62596 h.lst',
	'$ cd e',
	'$ ls',
	'584 i',
	'$ cd ..',
	'$ cd ..',
	'$ cd d',
	'$ ls',
	'4060174 j',
	'8033020 d.log',
	'5626152 d.ext',
	'7214296 k',
];

test('part one: example', partOne, testInput, 95_437);

test('part one', partOne, readLines('2022/day-7'), 1_490_523);

test('part two: example', partTwo, testInput, 24_933_642);

test('part two', partTwo, readLines('2022/day-7'), 12_390_492);
