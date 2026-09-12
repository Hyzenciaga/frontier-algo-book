"""组内回报归一化；常数奖励没有学习信号。"""
import math
rewards = [1., 0., 1., 0.]; mean = sum(rewards)/len(rewards)
std = math.sqrt(sum((x-mean)**2 for x in rewards)/len(rewards))
advantages = [(x-mean)/(std+1e-8) for x in rewards]
print("mean=", mean, "advantages=", [round(x, 3) for x in advantages])
