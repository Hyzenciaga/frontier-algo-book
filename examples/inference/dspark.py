"""Toy prefix scheduler: expected progress per artificial latency, not a DSpark benchmark."""
CONFIDENCE = (.94, .86, .72, .43, .21)

def choose_prefix(load):
    survival, progress = 1.0, 1.0  # includes correction or bonus token
    best_len, best_rate = 0, 1.0
    for length, c in enumerate(CONFIDENCE, 1):
        survival *= c
        progress += survival
        latency = 1 + .1 * length + load * .12 * length ** 2
        rate = progress / latency
        if rate > best_rate:
            best_len, best_rate = length, rate
    return best_len

for load in (.2, 1.0):
    print("load:", load, "prefix:", choose_prefix(load))
assert choose_prefix(.2) == 3 and choose_prefix(1.0) == 2
