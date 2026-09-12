"""离散三词策略的 SFT 梯度下降；不是实际 LLM。"""
import math

def step(logits, target, lr):
    z = sum(math.exp(x) for x in logits)
    p = [math.exp(x) / z for x in logits]
    loss = -math.log(p[target])
    grad = [q - (i == target) for i, q in enumerate(p)]
    return [x - lr * g for x, g in zip(logits, grad)], loss, p

logits, target = [1.0, 0.0, -1.0], 0
updated, before, p_before = step(logits, target, .5)
_, after, p_after = step(updated, target, 0.0)
print("before", round(before, 3), [round(x, 3) for x in p_before])
print("after ", round(after, 3), [round(x, 3) for x in p_after])
assert after < before
