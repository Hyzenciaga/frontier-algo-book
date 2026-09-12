# 可运行教学示例

使用 Python 3.10+ 标准库，无需 API key、模型下载或 GPU。

```bash
python3 examples/alignment/sft.py
python3 examples/alignment/dpo.py
python3 examples/papers/attention-is-all-you-need.py
python3 examples/benchmarks/tau-bench.py
npm run check:examples
```

每个脚本与 `content/` 下同名章节对应。网页的代码块可能只展示关键步骤，下载链接指向完整脚本；运行前先读章节中的符号、简化假设和预期结果。

| 目录 | 学习目标 |
| --- | --- |
| `alignment/` | 交叉熵与 KL、SFT/DPO 的小策略更新、PPO 裁剪、GRPO 组内优势、奖励与验证 |
| `agents/` | 学生访问状态上的蒸馏、上下文经验合并、轨迹信用分配、候选验收 |
| `inference/` | 概率校正、草稿结构、并行块和验证前缀调度 |
| `papers/` | Transformer 的注意力、位置编码、mask 与 encoder–decoder 数据流 |
| `benchmarks/` | 按题计算 pass@k / pass^k，再做宏平均 |

固定小数、矩阵、奖励和轨迹均为教学数据。SFT/DPO 更新的是极小离散策略，其余脚本演示机制的局部环节；这些输出不代表真实模型训练、论文复现成绩或推理性能。对完整训练和系统复现，应使用各章列出的原始实现并固定数据、模型、版本与预算。
