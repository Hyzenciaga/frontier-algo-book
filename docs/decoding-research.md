# 推理加速术语调研（2026-09-13）

## 结论与命名判定

| 用户写法 | 本手册采用名 | 判定 | 一手依据 |
| --- | --- | --- | --- |
| dflash | DFlash | 已核验 | 论文题为 *DFlash: Block Diffusion for Flash Speculative Decoding*。|
| ego（记忆不确定） | EAGLE（暂作推断） | **未能确认等同** | EAGLE 是公开的投机采样方法；读音和主题相近，但没有用户给出的链接或原始拼写，不能断言 ego 就是 EAGLE。|
| dspark | DSpark | 已核验 | DeepSeek 论文、官方 DeepSpec 和公开 checkpoint 均使用 DSpark。|

检索还发现同名或近名的非官方 Agent 项目、个人 fork 和实现；它们不应作为本文 DSpark 的来源。此处 DSpark 专指 DeepSeek 论文 *Confidence-Scheduled Speculative Decoding with Semi-Autoregressive Generation*（arXiv:2607.05147）。

## 方法关系

- **标准投机采样**：草稿分布 `q` 提案，目标分布 `p` 验证。候选 `y` 的接受率为 `min(1,p(y)/q(y))`；首次拒绝时采样 `r(x)=[p(x)-q(x)]_+/Σ_v[p(v)-q(v)]_+`；整块接受后从目标下一位置采样。这是随机输出保持目标分布的必要校正。
- **EAGLE**：预测目标模型的内部特征并组织草稿树；EAGLE-2 动态树，EAGLE-3 训练时测试和多层特征融合。
- **DFlash**：用受目标上下文特征条件化的块扩散草稿器，一次并行提议多 token；纯块并行会造成尾部接受率下降。
- **DSpark**：在 DFlash 类并行主干上加入轻量顺序头，并用经校准的置信度、负载感知前缀调度削减不值得验证的后缀。

## 边界与写作约束

1. “lossless” 必须限定为正确的随机接受/残差校正或对应的贪心目标；不能把加速论文的平均速度说成所有部署的保证。
2. 贪心玩具流程（草稿 argmax 与目标 argmax 匹配才接受）可解释前缀复用，但不是 `p/q` 随机采样，也不能证明采样分布一致。
3. DFlash、DSpark 和 EAGLE 的实验模型、草稿长度、并发、服务引擎不同；比较时优先使用 DeepSpec 的共同设置，或明确列出差异。
4. 若用户后续提供 “ego” 的链接，应以该原始来源替换本次 EAGLE 推断，而不是沿用名称相似性。

## 一手来源

- [Leviathan 等：投机解码原论文](https://arxiv.org/abs/2211.17192)
- [DFlash 论文](https://arxiv.org/abs/2602.06036)
- [EAGLE 论文](https://arxiv.org/abs/2401.15077)、[EAGLE-2](https://arxiv.org/abs/2406.16858)、[EAGLE-3](https://arxiv.org/abs/2503.01840)、[官方实现](https://github.com/SafeAILab/EAGLE)
- [DSpark 论文](https://arxiv.org/abs/2607.05147)、[DeepSeek 官方 DeepSpec](https://github.com/deepseek-ai/DeepSpec)
