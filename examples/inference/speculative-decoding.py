"""Exact speculative sampling on a fixed one-token vocabulary.

This is a distributional experiment, not a language-model benchmark.
"""
from random import Random

TOKENS = ("A", "B", "C")
P = (0.30, 0.50, 0.20)  # target distribution
Q = (0.40, 0.20, 0.40)  # draft distribution; deliberately different


def draw(weights, rng):
    point, total = rng.random(), 0.0
    for token, weight in zip(TOKENS, weights):
        total += weight
        if point < total:
            return token
    return TOKENS[-1]  # protects against floating-point roundoff


def speculative_one_token(rng):
    draft = draw(Q, rng)
    index = TOKENS.index(draft)
    if rng.random() < min(1.0, P[index] / Q[index]):
        return draft, True
    residual = [max(p - q, 0.0) for p, q in zip(P, Q)]
    mass = sum(residual)
    return draw([x / mass for x in residual], rng), False


def main():
    rng, trials = Random(7), 100_000
    counts = dict.fromkeys(TOKENS, 0)
    accepted = 0
    for _ in range(trials):
        token, ok = speculative_one_token(rng)
        counts[token] += 1
        accepted += ok
    print("target   ", dict(zip(TOKENS, P)))
    print("observed ", {t: round(counts[t] / trials, 4) for t in TOKENS})
    print("accepted ", round(accepted / trials, 4))


if __name__ == "__main__":
    main()
