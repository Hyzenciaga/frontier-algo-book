"""两动作离散策略的一次 DPO 更新；不是实际 LLM。"""
import math

def sigmoid(x): return 1 / (1 + math.exp(-x))
def loss_and_grad(logit_gap, ref_gap, beta):
    margin = beta * (logit_gap - ref_gap)
    loss = math.log1p(math.exp(-margin))
    # d loss / d logit_gap；梯度下降应扩大 chosen--rejected 差。
    return loss, -beta * sigmoid(-margin), margin

logit_gap, ref_gap, beta = -0.4, -0.1, .2
before, grad, margin_before = loss_and_grad(logit_gap, ref_gap, beta)
updated = logit_gap - .8 * grad
after, _, margin_after = loss_and_grad(updated, ref_gap, beta)
print("before", round(before, 4), "margin", round(margin_before, 3))
print("after ", round(after, 4), "margin", round(margin_after, 3))
assert after < before and margin_after > margin_before
