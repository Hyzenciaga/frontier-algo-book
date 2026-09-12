import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  handbook: [
    {type: 'doc', id: 'roadmap', label: '从这里开始 · 学习路线'},
    {type: 'category', label: '01 · 基础与监督学习', collapsed: false, items: [
      'alignment/foundations', 'alignment/sft',
    ]},
    {type: 'category', label: '02 · 偏好对齐与强化学习', collapsed: false, items: [
      'alignment/rlhf', 'alignment/dpo', 'alignment/ppo', 'alignment/grpo', 'alignment/rlvr',
    ]},
    {type: 'category', label: '03 · 蒸馏与 Agent 学习', items: [
      'agents/opd', 'agents/ace', 'agents/agentic-rl', 'agents/rsi',
    ]},
    {type: 'category', label: '04 · 推理加速', items: [
      'inference/speculative-decoding', 'inference/eagle', 'inference/dflash', 'inference/dspark',
    ]},
  ],
  papers: [
    {type: 'link', label: '← 经典理论', href: '/papers'},
    {type: 'category', label: '模型架构', collapsed: false, items: ['papers/attention-is-all-you-need']},
  ],
  benchmarks: [
    {type: 'link', label: '← 评测体系', href: '/benchmarks'},
    {type: 'category', label: 'Agent 交互与可靠性', collapsed: false, items: ['benchmarks/tau-bench']},
  ],
};
export default sidebars;
