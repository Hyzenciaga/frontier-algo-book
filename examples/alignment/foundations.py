"""枚举序列策略、回报与 KL 正则（仅标准库）。"""
import math

ref = {"short": .70, "long": .30}; reward = {"short": .2, "long": 1.0}; beta = .5
z = sum(ref[a] * math.exp(reward[a] / beta) for a in ref)
policy = {a: ref[a] * math.exp(reward[a] / beta) / z for a in ref}
kl = sum(policy[a] * math.log(policy[a] / ref[a]) for a in ref)
print(policy, "KL=", round(kl, 4))
