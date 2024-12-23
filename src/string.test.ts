import {testProp, fc} from '@fast-check/ava';
import {hammingDistance} from './string.ts';

testProp(
	'Hamming distance associative property',
	[fc.string(), fc.string()],
	(t, a, b) => {
		fc.pre(a.length === b.length);
		t.is(hammingDistance(a, b), hammingDistance(b, a));
	},
);
