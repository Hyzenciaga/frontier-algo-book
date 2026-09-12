from math import comb


def metrics(results, k):
    n, c = len(results), sum(results)
    if not 1 <= k <= n:
        raise ValueError("k must be between 1 and number of trials")
    denom = comb(n, k)
    return (1 - comb(n - c, k) / denom, comb(c, k) / denom)


tasks = [
    [1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
    [1] * 10,
    [0] * 10,
]
for k in [1, 3, 5]:
    scores = [metrics(task, k) for task in tasks]
    at_k = sum(s[0] for s in scores) / len(scores)
    all_k = sum(s[1] for s in scores) / len(scores)
    print(f"k={k}: pass@k={at_k:.4f}, pass^k={all_k:.4f}")

assert metrics([1] * 10, 3) == (1.0, 1.0)
assert metrics([0] * 10, 3) == (0.0, 0.0)
