import {createDay} from '../day-test.ts';
import * as parse from '../parse.ts';
import {range} from '../range.ts';

function* location(x = 0, y = 0, a = 0, b = 0) {
	const xRange = range(x, x + a);
	const yRange = range(y, y + b);

	for (const x of xRange) {
		for (const y of yRange) {
			yield `${x}x${y}`;
		}
	}
}

const compile = (input: string[]) => {
	const claimed = new Map<string, string[]>();

	for (const claim of input) {
		const [id, ...range] = parse.integers(claim);

		for (const loc of location(...range)) {
			const current = claimed.get(loc) ?? [];
			claimed.set(loc, [...current, `#${id}`]);
		}
	}

	return claimed;
};

export const day = createDay({
	partOne(input: string[]) {
		const claimed = compile(input);
		let count = 0;

		for (const value of claimed.values()) {
			if (value.length > 1) {
				count++;
			}
		}

		return count;
	},

	partTwo(input: string[]) {
		const claimed = compile(input);
		const elfClaims = [...claimed.values()];

		const contention = new Map<string, boolean>();

		for (const claims of elfClaims) {
			const [firstClaim] = claims;

			if (claims.length > 1) {
				for (const claim of claims) {
					contention.set(claim, true);
				}
			} else if (firstClaim) {
				const claimed = Boolean(contention.get(firstClaim));
				contention.set(firstClaim, claimed);
			}
		}

		const claim = [...contention.entries()].find(([, claimed]) => !claimed);

		return claim ? claim[0] : undefined;
	},
});
