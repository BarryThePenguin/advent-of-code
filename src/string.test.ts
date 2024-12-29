import {test, fc} from '@fast-check/vitest';
import {hammingDistance} from './string.ts';

test.prop([fc.string(), fc.string()])(
	'Hamming distance associative property',
	(a, b) => {
		fc.pre(a.length === b.length);
		return hammingDistance(a, b) === hammingDistance(b, a);
	},
);
