type Claim = {
	id: string;
	cords: {
		x: number;
		y: number;
	};
	area: {
		x: number;
		y: number;
	};
};

// #elf, @, X,X: YxY
const regex = /(#\d+) @ (\d+),(\d+): (\d+)x(\d+)/;

const parse = (input: string): Claim | undefined => {
	const [, id = '', ...numbers] = regex.exec(input) ?? [];
	const [x = 0, y = 0, a = 0, b = 0] = numbers.map(Number);

	return {id, cords: {x, y}, area: {x: a, y: b}};
};

const compile = (input: string[]) => {
	const claimed = new Map<string, string[]>();

	for (const claim of input) {
		const parsed = parse(claim);

		if (parsed) {
			const {id, cords, area} = parsed;

			const xEnd = cords.x + area.x;
			const yEnd = cords.y + area.y;

			for (let x = cords.x + 1; x <= xEnd; x++) {
				for (let y = cords.y + 1; y <= yEnd; y++) {
					const loc = `${x}x${y}`;
					const current = claimed.get(loc) ?? [];
					claimed.set(loc, [...current, id]);
				}
			}
		}
	}

	return claimed;
};

export const partOne = (input: string[]) => {
	const claimed = compile(input);
	let count = 0;

	for (const value of claimed.values()) {
		if (value.length > 1) {
			count++;
		}
	}

	return count;
};

export const partTwo = (input: string[]) => {
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
};
