"""DFlash mechanisms: one block forward, attention visibility, position loss."""
from math import exp


def visible(query, key, block_of, context_count=1):
    return key < context_count or block_of[query] == block_of[key]


def weighted_ce(losses, gamma):
    weights = [exp(-position / gamma) for position in range(len(losses))]
    return sum(w * loss for w, loss in zip(weights, losses)) / sum(weights), weights


def main():
    # 0 is injected target-context KV; 1..3 and 4..6 are distinct blocks.
    block_of = (None, 0, 0, 0, 1, 1, 1)
    for query in (1, 2, 4):
        seen = [key for key in range(len(block_of)) if visible(query, key, block_of)]
        print(f"query {query} can attend to {seen}")
    assert visible(1, 3, block_of) and not visible(1, 4, block_of)
    loss, weights = weighted_ce([1.2, 1.2, 1.2], gamma=3)
    print("position weights:", [round(w, 3) for w in weights], "weighted CE:", round(loss, 3))
    print("One clean anchor plus B-1 masks is decoded in one forward pass.")


if __name__ == "__main__":
    main()
