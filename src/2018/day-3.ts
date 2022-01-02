type Claim = {
  elf: string,
  cords: {
    x: number
    y: number
  },
  area: {
    x: number
    y: number
  }
}

const parse = (input: string) => {
  // #elf, @, X,X: YxY
  const [elf, , cords, area] = input.split(' ');
  const [x, y] = cords
    .replace(':', '')
    .split(',')
    .map(Number);
  const [a, b] = area.split('x').map(Number);
  return {elf, cords: {x, y}, area: {x: a, y: b}};
};

const compile = (claims: Claim[]) => {
  const claimed = new Map();

  for (const {elf, cords, area} of claims) {
    const xEnd = cords.x + area.x;
    const yEnd = cords.y + area.y;

    for (let x = cords.x + 1; x <= xEnd; x++) {
      for (let y = cords.y + 1; y <= yEnd; y++) {
        const loc = `${x}x${y}`;
        if (claimed.has(loc)) {
          claimed.set(loc, [...claimed.get(loc), elf]);
        } else {
          claimed.set(loc, [elf]);
        }
      }
    }
  }

  return claimed;
};

export const partOne = (input: string[]) => {
  const claimed = compile(input.map(parse));

  return [...claimed.values()].filter(x => x.length > 1).length;
};

export const partTwo = (input: string[]) => {
  const claimed = compile(input.map(parse));
  const elfClaims = [...claimed.values()];
  
  const contention = new Map<string, boolean>()
  
  for (let claims of elfClaims) {
    if (claims.length > 1) {
      for (let claim of claims) {
        contention.set(claim, true)
      }
    } else {
      const [claim] = claims
      const claimed = contention.get(claim) ? true : false
      contention.set(claim, claimed)
    }
  }

  const elf = [...contention.entries()].find(([, claimed]) => claimed === false);
  
  return elf ? elf[0] : undefined;
};
