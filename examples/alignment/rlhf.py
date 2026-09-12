"""Bradley--Terry 比较损失和奖励可加常数的不辨识性。"""
import math
r_win, r_lose = 1.2, .3
p = 1/(1+math.exp(-(r_win-r_lose)))
print("P(win preferred)=", round(p, 3), "NLL=", round(-math.log(p), 3))
print("shift invariant:", round(1/(1+math.exp(-((r_win+5)-(r_lose+5)))), 3))
