"""PPO clipped surrogate 在正、负优势下的逐样本目标。"""
def clip(x, lo, hi): return max(lo, min(x, hi))
for ratio, advantage in [(1.35, 2.0), (1.35, -2.0), (.7, 2.0)]:
    unclipped = ratio*advantage; clipped = clip(ratio,.8,1.2)*advantage
    print(ratio, advantage, "objective=", min(unclipped, clipped))
