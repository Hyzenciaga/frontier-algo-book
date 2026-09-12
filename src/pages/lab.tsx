import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {DpoLab, GrpoLab, SpeculativeLab} from '../components/AlgorithmLab';

export default function Lab() {
  return <Layout title="交互实验" description="调节 DPO 参数、比较 GRPO 组内优势，逐步观察投机解码。"><main className="lab-page"><header><div className="eyebrow">INTERACTIVE NOTEBOOK</div><h1>交互实验</h1><p>从一个小例子开始。改变输入，观察信号，理解公式的边界。</p><nav className="lab-tabs" aria-label="实验目录"><a href="#dpo">01 / DPO 偏好信号</a><a href="#grpo">02 / GRPO 组内比较</a><a href="#decoding">03 / 投机解码</a></nav></header>
    <section id="dpo"><div className="experiment-heading"><div><span className="eyebrow">EXPERIMENT 01</span><h2>DPO：偏好差如何改变损失？</h2></div><Link to="/learn/alignment/dpo">阅读章节 ↗</Link></div><DpoLab/></section>
    <section id="grpo"><div className="experiment-heading"><div><span className="eyebrow">EXPERIMENT 02</span><h2>GRPO：奖励要放在组内看。</h2></div><Link to="/learn/alignment/grpo">阅读章节 ↗</Link></div><GrpoLab/></section>
    <section id="decoding"><div className="experiment-heading"><div><span className="eyebrow">EXPERIMENT 03</span><h2>投机解码：先起草，再验证。</h2></div><Link to="/learn/inference/speculative-decoding">阅读章节 ↗</Link></div><SpeculativeLab/></section>
  </main></Layout>;
}
