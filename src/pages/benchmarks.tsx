import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {benchmarks} from '../data/benchmarks';

export default function Benchmarks() {
  return <Layout title="评测体系" description="从考察能力、指标和真实任务样例理解经典 Benchmark，首篇深入 τ-bench 的 Agent 交互与可靠性。">
    <main className="papers-page benchmark-page">
      <header className="papers-intro"><span className="eyebrow">UNDERSTAND THE EVALUATION</span><h1>评测体系</h1><p>分数背后，模型究竟完成了什么？</p><div className="benchmark-lenses"><span>01 / 考察能力</span><span>02 / 评测指标</span><span>03 / 数据集与题型</span></div></header>
      {benchmarks.map(benchmark => <article className="benchmark-entry" key={benchmark.id}>
        <div className="paper-meta">{benchmark.area} / {benchmark.year}</div><h2><Link to={benchmark.guide}>{benchmark.name}</Link></h2><h3>{benchmark.title}</h3><p>{benchmark.description}</p>
        <dl className="benchmark-facts"><div><dt>考察什么</dt><dd>{benchmark.assesses}</dd></div><div><dt>核心指标</dt><dd>{benchmark.metrics}</dd></div><div><dt>题目长什么样</dt><dd>{benchmark.tasks}</dd></div></dl>
        <div className="paper-actions"><Link className="button button--primary" to={benchmark.guide}>阅读评测详解 →</Link><a href={benchmark.paper} target="_blank" rel="noopener noreferrer">原始论文 ↗</a></div>
      </article>)}
      <aside className="paper-reading-note"><h2>先看评测协议，再比较分数。</h2><p>同一个名字下，任务版本、用户模拟器、工具和重试预算都可能变化。阅读时先明确成功事件，再判断指标衡量的是解题上限，还是执行可靠性。</p></aside>
    </main>
  </Layout>;
}
