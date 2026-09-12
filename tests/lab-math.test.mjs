import test from 'node:test';
import assert from 'node:assert/strict';
import {preferenceStats, groupAdvantages} from '../src/lib/labMath.ts';

test('DPO has equal preference probability and log(2) loss at zero margin', () => {
  const stats = preferenceStats(0, 0.5);
  assert.equal(stats.probability, 0.5);
  assert.equal(stats.loss, Math.log(2));
  assert.equal(stats.gradient, -0.25);
});
test('increasing the chosen relative margin lowers DPO loss across all UI beta values', () => {
  for (let beta = 0.1; beta <= 2; beta += 0.1) {
    for (let margin = -4; margin < 4; margin += 0.1) {
      assert.ok(preferenceStats(margin + 0.1, beta).loss < preferenceStats(margin, beta).loss);
    }
  }
});
test('displayed DPO derivative agrees with a numerical derivative', () => {
  for (const margin of [-4, 0, 0.8, 4]) {
    const h = 1e-5;
    const numerical = (preferenceStats(margin + h, 0.5).loss - preferenceStats(margin - h, 0.5).loss) / (2 * h);
    assert.ok(Math.abs(numerical - preferenceStats(margin, 0.5).gradient) < 1e-8);
  }
});
test('a binary balanced reward group gives +1/-1 advantages', () => {
  assert.deepEqual(groupAdvantages([1, 0, 1, 0]).advantages, [1, -1, 1, -1]);
});
test('equal rewards have no relative learning signal and never produce NaN', () => {
  for (const reward of [0, 1, 4]) assert.deepEqual(groupAdvantages(Array(4).fill(reward)).advantages, [0, 0, 0, 0]);
});
test('group advantages are unchanged by positive scaling and constant offsets', () => {
  const a = groupAdvantages([0, 1, 1, 3]).advantages;
  const b = groupAdvantages([5, 7, 7, 11]).advantages;
  a.forEach((value, i) => assert.ok(Math.abs(value - b[i]) < 1e-12));
  assert.ok(Math.abs(a.reduce((sum, x) => sum + x, 0)) < 1e-12);
});
