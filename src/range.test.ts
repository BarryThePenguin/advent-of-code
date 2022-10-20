import test from 'ava';
import {range, rangeFill, zeroFill, RangeArgs} from './range.js';

const rangeMacro = test.macro(
	(t, [start, end, increment]: RangeArgs, expected: number[]) => {
		t.deepEqual(range(start, end, increment), expected);
	},
);

const rangeFillMacro = test.macro(
	(t, [start, end, increment]: RangeArgs, expected: number[]) => {
		t.deepEqual(rangeFill(start, end, increment), expected);
	},
);

const zeroFillMacro = test.macro(
	(t, length: RangeArgs[0], expected: number[]) => {
		t.deepEqual(zeroFill(length), expected);
	},
);

test('range of length 1', rangeMacro, [1], [0]);
test('range of length 2', rangeMacro, [2], [0, 1]);
test('range starting at 1, ending at 1', rangeMacro, [1, 1], []);
test('range starting at 2, ending at 2', rangeMacro, [2, 2], []);
test('range starting at 2, ending at 4', rangeMacro, [2, 4], [2, 3]);
test(
	'range starting at 1, ending at 1, incrementing by 2',
	rangeMacro,
	[1, 1, 2],
	[],
);
test(
	'range starting at 1, ending at 2, incrementing by 2',
	rangeMacro,
	[1, 2, 2],
	[1],
);
test(
	'range starting at 2, ending at 2, incrementing by 2',
	rangeMacro,
	[2, 2, 2],
	[],
);
test(
	'range starting at 2, ending at 2, incrementing by 4',
	rangeMacro,
	[2, 2, 4],
	[],
);
test(
	'range starting at 2, ending at 4, incrementing by 4',
	rangeMacro,
	[2, 4, 4],
	[2],
);

test('range length from object', rangeMacro, [{length: 4}], [0, 1, 2, 3]);
test('range length from array', rangeMacro, [[1, 2, 3, 4]], [0, 1, 2, 3]);
test('range length from string', rangeMacro, ['foo'], [0, 1, 2]);

test('rangeFill of length 1', rangeFillMacro, [1], [0, 1]);
test('rangeFill of length 2', rangeFillMacro, [2], [0, 1, 2]);
test('rangeFill starting at 1, ending at 1', rangeFillMacro, [1, 1], [1]);
test('rangeFill starting at 2, ending at 2', rangeFillMacro, [2, 2], [2]);
test('rangeFill starting at 2, ending at 4', rangeFillMacro, [2, 4], [2, 3, 4]);
test(
	'rangeFill starting at 1, ending at 1, incrementing by 2',
	rangeFillMacro,
	[1, 1, 2],
	[1],
);
test(
	'rangeFill starting at 1, ending at 2, incrementing by 2',
	rangeFillMacro,
	[1, 2, 2],
	[1],
);
test(
	'rangeFill starting at 2, ending at 2, incrementing by 2',
	rangeFillMacro,
	[2, 2, 2],
	[2],
);
test(
	'rangeFill starting at 2, ending at 2, incrementing by 4',
	rangeFillMacro,
	[2, 2, 4],
	[2],
);
test(
	'rangeFill starting at 2, ending at 4, incrementing by 4',
	rangeFillMacro,
	[2, 4, 4],
	[2],
);

test(
	'rangeFill length from object',
	rangeFillMacro,
	[{length: 4}],
	[0, 1, 2, 3, 4],
);
test(
	'rangeFill length from array',
	rangeFillMacro,
	[[1, 2, 3, 4]],
	[0, 1, 2, 3, 4],
);
test('rangeFill length from string', rangeFillMacro, ['foo'], [0, 1, 2, 3]);

test('zeroFill of length 1', zeroFillMacro, 1, [0]);
test('zeroFill of length 2', zeroFillMacro, 2, [0, 0]);
test('zeroFill of length 3', zeroFillMacro, 3, [0, 0, 0]);
