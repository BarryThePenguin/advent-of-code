import {testProp, fc} from '@fast-check/ava';
import {hammingDistance} from './string.js';

testProp(
	'difference',
	[fc.string(), fc.string()],
	(t, x, y) => {
		fc.pre(x.length === y.length);
		t.is(hammingDistance(x, y), hammingDistance(y, x));
	},
	{verbose: true},
);
