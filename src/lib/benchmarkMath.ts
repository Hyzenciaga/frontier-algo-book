/** Choose r observations without replacement. Input is bounded by the teaching UI. */
export function choose(n: number, r: number): number {
  if (r > n) return 0;
  let result = 1;
  for (let i = 1; i <= Math.min(r, n - r); i++) result = result * (n - i + 1) / i;
  return result;
}

export function passMetrics(n: number, c: number, k: number) {
  if (![n, c, k].every(Number.isInteger) || n < 1 || c < 0 || c > n || k < 1 || k > n) {
    throw new RangeError('Require integers with 0 ≤ c ≤ n and 1 ≤ k ≤ n.');
  }
  return {passAtK: 1 - choose(n - c, k) / choose(n, k), passAllK: choose(c, k) / choose(n, k)};
}
