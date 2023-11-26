import {testProp, fc, test} from '@fast-check/ava';
import {hammingDistance} from './string.js';

testProp(
	'Hamming distance associative property',
	[fc.string(), fc.string()],
	(t, a, b) => {
		fc.pre(a.length === b.length);
		t.is(hammingDistance(a, b), hammingDistance(b, a));
	},
);
