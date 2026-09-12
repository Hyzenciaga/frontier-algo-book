"""Toy EAGLE-style feature drafting: shapes and a tiny candidate tree only."""
from math import exp

VOCAB = ("春", "天", "雨", "。")
W = ((1.0, -.3, .2), (-.2, .9, .1), (.1, .2, .8), (-.4, -.2, .6))


def softmax(xs):
    peak = max(xs); e = [exp(x - peak) for x in xs]
    return [x / sum(e) for x in e]


def logits(feature):
    return [sum(w * h for w, h in zip(row, feature)) for row in W]


def top2(feature):
    ranked = sorted(zip(softmax(logits(feature)), VOCAB), reverse=True)
    return [token for _, token in ranked[:2]]


def predict_feature(feature, previous_token):
    # A learned EAGLE head would consume target features and a shifted token.
    token_bias = [0.08 * (VOCAB.index(previous_token) + 1), 0.0, -0.03]
    return [0.85 * h + b for h, b in zip(feature, token_bias)]


def main():
    target_feature = [0.4, 0.6, 0.2]  # [hidden], a fabricated final hidden state
    first = top2(predict_feature(target_feature, "春"))
    tree = {token: top2(predict_feature(target_feature, token)) for token in first}
    print("draft tree:", tree)
    print("Every branch still needs target-model verification.")


if __name__ == "__main__":
    main()
