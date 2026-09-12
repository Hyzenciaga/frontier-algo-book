"""Credit assignment over a tool trajectory; no ML libraries required."""
rewards = [0.0, -0.1, -0.1, 1.0]  # read, invalid tool, valid tool, verified task
actions = ["read", "tool[bad]", "tool[good]", "answer"]
gamma = 0.9
returns, future = [], 0.0
for reward in reversed(rewards):
    future = reward + gamma * future
    returns.append(round(future, 3))
returns.reverse()
tool_mask = [False, True, True, False]
for action, value, is_tool in zip(actions, returns, tool_mask):
    print(f"{action:10} return={value:>5} train_tool_head={is_tool}")
