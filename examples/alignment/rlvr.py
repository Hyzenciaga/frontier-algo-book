"""结果验证器的二元奖励与 pass@k。"""
import math
p, k = .18, 8
print("pass@%d=" % k, round(1-(1-p)**k, 4))
for answer in ["42", " 42 ", "forty two"]:
    print(repr(answer), int(answer.strip() == "42"))
