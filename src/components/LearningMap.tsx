import React from 'react';
import Link from '@docusaurus/Link';

const stages = [
  {number: '01', label: '建立基础', title: '模型怎样学会回答？', topics: 'Token · 交叉熵 · KL · SFT', to: '/learn/alignment/foundations', note: '先理解预测，再理解训练目标'},
  {number: '02', label: '理解对齐', title: '从「会回答」到「答得好」', topics: 'RLHF · DPO · PPO · GRPO · RLVR', to: '/learn/alignment/rlhf', note: '分清优化算法与奖励来源'},
  {number: '03', label: '走向智能体', title: '让学习发生在交互之中', topics: 'OPD · ACE · Agentic RL · RSI', to: '/learn/agents/opd', note: '区分参数、上下文与系统的改进'},
  {number: '04', label: '推理加速 · 独立支线', title: '相同的输出，更少的等待', topics: '投机解码 · EAGLE · DFlash · dSpark', to: '/learn/inference/speculative-decoding', note: '掌握自回归生成后即可开始'},
];

export default function LearningMap() {
  return <div className="learning-map">{stages.map(stage =>
    <Link className="stage" to={stage.to} key={stage.number}>
      <span className="stage-number">{stage.number}</span>
      <div><span className="stage-label">{stage.label}</span><h3>{stage.title}</h3><p>{stage.topics}</p><span className="stage-note">{stage.note}</span></div>
      <span className="stage-arrow" aria-hidden="true">↗</span>
    </Link>,
  )}</div>;
}
