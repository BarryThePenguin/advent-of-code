type Claim = {
	elf: string;
	cords: {
		x: number;
		y: number;
	};
	area: {
		x: number;
		y: number;
	};
};

const parse = (input: string) => {
	// #elf, @, X,X: YxY
	const [elf, , cords, area] = input.split(' ');
	const [x, y] = cords
		.replace(':', '')
		.split(',')
		.map((number) => Number.parseInt(number, 10));
	const [a, b] = area.split('x').map((number) => Number.parseInt(number, 10));
	return {elf, cords: {x, y}, area: {x: a, y: b}};
};

const compile = (claims: Claim[]) => {
	const claimed = new Map<string, string[]>();

	for (const {elf, cords, area} of claims) {
		const xEnd = cords.x + area.x;
		const yEnd = cords.y + area.y;

		for (let x = cords.x + 1; x <= xEnd; x++) {
			for (let y = cords.y + 1; y <= yEnd; y++) {
				const loc = `${x}x${y}`;
				const current = claimed.get(loc) ?? [];
				claimed.set(loc, [...current, elf]);
			}
		}
	}

	return claimed;
};

export const partOne = (input: string[]) => {
	const claimed = compile(input.map((claim) => parse(claim)));

	return [...claimed.values()].filter((x) => x.length > 1).length;
};

export const partTwo = (input: string[]) => {
	const claimed = compile(input.map((claim) => parse(claim)));
	const elfClaims = [...claimed.values()];

	const contention = new Map<string, boolean>();

	for (const claims of elfClaims) {
		if (claims.length > 1) {
			for (const claim of claims) {
				contention.set(claim, true);
			}
		} else {
			const [claim] = claims;
			const claimed = Boolean(contention.get(claim));
			contention.set(claim, claimed);
		}
	}

	const elf = [...contention.entries()].find(([, claimed]) => !claimed);

	return elf ? elf[0] : undefined;
};
