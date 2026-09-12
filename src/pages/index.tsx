import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import LearningMap from '../components/LearningMap';

export default function Home() {
  return <Layout title="学习路线与论文阅读" description="面向自学者的前沿算法手册：SFT、DPO、PPO、GRPO、Agent 学习与投机解码。">
    <main className="book-home">
      <header className="book-intro">
        <div className="intro-copy">
          <div className="eyebrow">FRONTIER ALGO BOOK <span>自学手册 / 01</span></div>
          <h1>把算法名词，<br/>变成你的<span>知识地图。</span></h1>
          <p>从 SFT 到 Agent 学习，从训练目标到推理加速。<br className="desktop-break"/>沿着依赖关系阅读，用交互实验建立直觉，再回到论文。</p>
          <div className="intro-actions"><Link className="button button--primary button--lg" to="/learn/roadmap">从学习路线开始 <span aria-hidden="true">→</span></Link><Link className="text-link" to="/papers">浏览经典理论 ↗</Link></div>
          <div className="intro-footnote">中文讲解 <span> / </span> 原始论文 <span> / </span> 可交互示范</div>
        </div>
        <div className="concept-card" aria-label="学习领域图：生成基础分别连接监督学习和推理加速，监督学习连接对齐，再连接 Agent 学习">
          <div className="diagram-heading"><span>THE LEARNING LANDSCAPE</span><span>图 01</span></div>
          <div className="diagram-node foundation"><small>FOUNDATION</small>概率 · 生成 · 优化</div>
          <div className="diagram-fork"><span/><span/></div>
          <div className="diagram-columns"><div className="diagram-node supervised"><small>SUPERVISED LEARNING</small>SFT</div><div className="diagram-node inference"><small>INFERENCE</small>投机解码</div></div>
          <div className="diagram-connector lower"/>
          <div className="diagram-node alignment"><small>ALIGNMENT</small>DPO / PPO / GRPO</div>
          <div className="diagram-connector lower"/>
          <div className="diagram-node agent"><small>AGENT LEARNING</small>交互 · 反馈 · 改进</div>
          <p>推荐阅读路径 · 推理加速可以独立学习</p>
        </div>
      </header>
      <section className="route-section" aria-labelledby="route-title"><div className="section-title"><div><span className="eyebrow">YOUR LEARNING PATH</span><h2 id="route-title">四个主题，一条清晰的起点。</h2></div><Link to="/learn/roadmap">查看前置知识与依赖 →</Link></div><LearningMap/></section>
      <section className="lab-banner"><div className="lab-symbol" aria-hidden="true">01</div><div><span className="eyebrow">READ THE ORIGINAL</span><h2>从 Transformer 的第一篇论文读起。</h2><p>Attention Is All You Need · 原文、阅读顺序与知识点讲解。</p></div><Link className="button button--secondary" to="/learn/papers/attention-is-all-you-need">阅读 Transformer →</Link></section>
      <p className="edition-note">理解机制，推导公式，运行代码。交互示范与原始论文随知识点展开。</p>
    </main>
  </Layout>;
}
