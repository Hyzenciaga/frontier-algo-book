/** A scalar slice of the DPO loss, not a model training simulation. */
export function preferenceStats(margin: number, beta: number) {
  const z = beta * margin;
  return {probability: 1 / (1 + Math.exp(-z)), loss: Math.log1p(Math.exp(-z)), gradient: -beta / (1 + Math.exp(z))};
}

/** Population standard deviation; a constant group has zero relative signal. */
export function groupAdvantages(rewards: number[]) {
  const mean = rewards.reduce((a, b) => a + b, 0) / rewards.length;
  const std = Math.sqrt(rewards.reduce((a, b) => a + (b - mean) ** 2, 0) / rewards.length);
  return {mean, std, advantages: rewards.map(r => std === 0 ? 0 : (r - mean) / std)};
}
