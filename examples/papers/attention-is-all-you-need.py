"""Standard-library Transformer walkthrough: mask, multi-head, PE, FFN, encode/decode.

Weights are deterministic toy matrices. This explains data flow, not model quality.
"""
from math import exp, sin, cos, sqrt


def matmul(a, b):
    return [[sum(a[i][k] * b[k][j] for k in range(len(b))) for j in range(len(b[0]))]
            for i in range(len(a))]


def transpose(a): return [list(col) for col in zip(*a)]
def add(a, b): return [[x + y for x, y in zip(row, other)] for row, other in zip(a, b)]


def softmax(row):
    peak = max(row); e = [exp(x - peak) for x in row]
    return [x / sum(e) for x in e]


def attention(q, k, v, causal=False):
    scores = matmul(q, transpose(k))
    for i, row in enumerate(scores):
        for j in range(len(row)):
            row[j] = row[j] / sqrt(len(q[0])) if not causal or j <= i else -1e9
    weights = [softmax(row) for row in scores]
    return matmul(weights, v), weights


def positional_encoding(length, width):
    return [[sin(pos / 10000 ** (2 * (i // 2) / width)) if i % 2 == 0
             else cos(pos / 10000 ** (2 * (i // 2) / width)) for i in range(width)]
            for pos in range(length)]


def ffn(x):
    # width 2 -> hidden 3 -> width 2, with ReLU
    w1, w2 = ((1.0, -.5, .2), (.3, .8, -.4)), ((.7, .1), (-.2, .5), (.4, -.3))
    hidden = [[max(0.0, z) for z in row] for row in matmul(x, w1)]
    return matmul(hidden, w2)


def multi_head(x, heads=2, causal=False):
    # Pedagogical degeneration: WQ=WK=WV select one coordinate per head; WO=I.
    outputs, maps = [], []
    for h in range(heads):
        column = [[row[h]] for row in x]
        out, weights = attention(column, column, column, causal)
        outputs.append(out); maps.append(weights)
    return [[outputs[h][i][0] for h in range(heads)] for i in range(len(x))], maps


def main():
    pe4 = positional_encoding(2, 4)
    assert pe4[1][0] == sin(1.0) and pe4[1][1] == cos(1.0)
    assert pe4[1][2] == sin(1 / 100.0) and pe4[1][3] == cos(1 / 100.0)
    source = add([[.2, .7], [.5, .1], [.9, .3]], positional_encoding(3, 2))
    encoded, _ = multi_head(source)                    # encoder self-attention
    memory = add(encoded, ffn(encoded))                # residual-style toy block
    target = add([[.4, .2], [.6, .5]], positional_encoding(2, 2))
    decoded, maps = multi_head(target, causal=True)    # decoder masked self-attention
    altered = [row[:] for row in target]
    altered[1] = [999.0, -999.0]  # a future value/key must not affect position 0
    assert multi_head(altered, causal=True)[0][0] == decoded[0]
    cross, _ = attention(decoded, memory, memory)      # decoder cross-attention
    print("causal attention row 0:", [round(x, 3) for x in maps[0][0]])
    print("encoder memory shape:", len(memory), "x", len(memory[0]))
    print("cross-attended decoder:", [[round(x, 3) for x in row] for row in cross])
    print("Generation repeats decoder work one new token at a time; cache reuses prior K/V.")


if __name__ == "__main__":
    main()
