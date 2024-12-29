import {test} from 'vitest';
import {day} from './day-7.ts';

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

test('part one: example', day.partOne(testInput, 95_437));

test('part one', day.partOne(day.readLines('2022/day-7'), 1_490_523));

test('part two: example', day.partTwo(testInput, 24_933_642));

test('part two', day.partTwo(day.readLines('2022/day-7'), 12_390_492));
