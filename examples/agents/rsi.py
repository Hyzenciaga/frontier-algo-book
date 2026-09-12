"""Toy acceptance gate: accept progress, reject regressions and small gains."""
candidates = [("cache-v1", 88, 86), ("overfit-fast", 98, 72),
              ("cache-v2", 93, 89), ("planner-v3", 96, 92)]
baseline = 80
accepted = []
for name, train_score, holdout_score in candidates:
    improves = holdout_score >= baseline + 5
    print(f"{name:11} train={train_score} holdout={holdout_score} accept={improves}")
    if improves:
        baseline = holdout_score
        accepted.append(name)
print("accepted:", accepted, "baseline:", baseline)
assert accepted == ["cache-v1", "planner-v3"] and baseline == 92
