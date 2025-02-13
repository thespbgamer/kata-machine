export default function two_crystal_balls(breaks: boolean[]): number {
  let found: number = -1;

  const jumpAmount = Math.floor(Math.sqrt(breaks.length));

  let i = jumpAmount;
  if (i >= 1) {
    for (; i < breaks.length; i += jumpAmount) {
      if (breaks[i]) {
        break;
      }
    }

    i -= jumpAmount;

    for (let j = 0; j < jumpAmount && i < breaks.length; ++j, ++i) {
      if (breaks[i]) {
        found = i;
        break;
      }
    }
  } else {
    found = -2;
  }

  return found;
}
