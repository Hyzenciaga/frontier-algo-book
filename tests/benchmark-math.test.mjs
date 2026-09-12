import test from 'node:test';
import assert from 'node:assert/strict';
import {passMetrics} from '../src/lib/benchmarkMath.ts';

test('single attempt equals observed success rate', () => {
  for (let c = 0; c <= 10; c++) {
    const m = passMetrics(10, c, 1);
    assert.ok(Math.abs(m.passAtK - c / 10) < 1e-12);
    assert.ok(Math.abs(m.passAllK - c / 10) < 1e-12);
  }
});
test('seven successes out of ten yields the documented three-attempt example', () => {
  const m = passMetrics(10, 7, 3);
  assert.equal(m.passAllK, 35 / 120);
  assert.equal(m.passAtK, 119 / 120);
});
test('estimators agree with exhaustive subsets and preserve opposite monotonicity', () => {
  const n = 8, c = 5;
  let prevAt = 0, prevAll = 1;
  for (let k = 1; k <= n; k++) {
    let count = 0, at = 0, all = 0;
    for (let mask = 0; mask < 2 ** n; mask++) {
      const bits = Array.from({length:n}, (_,i) => Boolean(mask & (1 << i)));
      if (bits.filter(Boolean).length !== k) continue;
      const successes = bits.filter((selected,i) => selected && i < c).length;
      count++; if (successes > 0) at++; if (successes === k) all++;
    }
    const m = passMetrics(n,c,k);
    assert.ok(Math.abs(m.passAtK - at/count) < 1e-12);
    assert.ok(Math.abs(m.passAllK - all/count) < 1e-12);
    assert.ok(m.passAtK >= prevAt && m.passAllK <= prevAll);
    prevAt = m.passAtK; prevAll = m.passAllK;
  }
});
test('handles all-failure/all-success groups and rejects unobservable k', () => {
  assert.deepEqual(passMetrics(10,0,10),{passAtK:0,passAllK:0});
  assert.deepEqual(passMetrics(10,10,10),{passAtK:1,passAllK:1});
  for (const args of [[10,11,2],[10,5,11],[0,0,1],[10,2.5,2]]) assert.throws(() => passMetrics(...args),RangeError);
});
