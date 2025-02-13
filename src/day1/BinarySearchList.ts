export default function bs_list(haystack: number[], needle: number): boolean {
  let found: boolean = false;

  let low = 0;
  let high = haystack.length;

  do {
    const midpoint = Math.floor(low + (high - low) / 2);
    const value = haystack[midpoint];

    if (value === needle) {
      found = true;
      break;
    } else if (value > needle) {
      high = midpoint;
    } else {
      low = midpoint + 1;
    }
  } while (low < high);

  return found;
}
