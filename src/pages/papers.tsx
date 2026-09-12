import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {papers} from '../data/papers';

export default function Papers() {
  return <Layout title="经典理论" description="按知识点阅读经典论文，从 Attention Is All You Need 与 Transformer 开始。">
    <main className="papers-page">
      <header className="papers-intro"><span className="eyebrow">THE READING SHELF</span><h1>经典理论</h1><p>带着问题读原文，把论文接回你的知识地图。</p><div className="papers-summary"><span>{papers.length} 篇已收录</span><span>从模型架构开始</span></div></header>
      <section aria-labelledby="architecture-title"><div className="section-title"><div><span className="eyebrow">01 / ARCHITECTURE</span><h2 id="architecture-title">模型架构</h2></div><span className="paper-section-note">建议先读：概率、向量与矩阵乘法</span></div>
        {papers.map((paper, index) => <article className="paper-entry" key={paper.id}>
          <div className="paper-index">{String(index + 1).padStart(2, '0')}<span>{paper.year}</span></div>
          <div className="paper-content"><div className="paper-meta">{paper.category} / {paper.venue} <span>原理 · 推导 · 代码</span></div><h3><Link to={paper.guide}>{paper.title}</Link></h3><p className="paper-authors">{paper.authors}</p><p>{paper.description}</p><ul className="paper-topics" aria-label="相关知识点">{paper.topics.map(topic => <li key={topic}>{topic}</li>)}</ul><div className="paper-actions"><Link className="button button--primary" to={paper.guide}>阅读导读 →</Link><a href={paper.abstract} target="_blank" rel="noopener noreferrer">arXiv 原文 ↗</a><a href={paper.pdf} target="_blank" rel="noopener noreferrer">PDF ↗</a></div></div>
        </article>)}
      </section>
      <aside className="paper-reading-note"><h2>怎样读第一篇？</h2><p>先看导读里的问题，再读论文架构图和注意力公式。能用自己的话解释 Q、K、V 后，再看训练设置和实验结果。</p><Link to="/learn/roadmap">回到完整学习路线 →</Link></aside>
    </main>
  </Layout>;
}
