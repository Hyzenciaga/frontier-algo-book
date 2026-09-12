import React, {useState} from 'react';
import {passMetrics} from '../lib/benchmarkMath';

export default function PassMetricsLab() {
  const n = 10;
  const [c, setC] = useState(7);
  const [k, setK] = useState(3);
  const {passAtK, passAllK} = passMetrics(n, c, k);
  return <div className="experiment">
    <div className="lab-controls">
      <label>10 次独立评测中，成功次数 c <strong>{c}</strong><input type="range" min="0" max={n} step="1" value={c} aria-label="成功次数" onChange={e => setC(Number(e.target.value))}/></label>
      <label>比较的尝试次数 k <strong>{k}</strong><input type="range" min="1" max={n} step="1" value={k} aria-label="尝试次数" onChange={e => setK(Number(e.target.value))}/></label>
    </div>
    <div className="trial-strip" aria-label={`示意记录：${c} 次成功，${n-c} 次失败`}>{Array.from({length:n}, (_,i) => <span key={i} className={i < c ? 'trial-success' : 'trial-failure'}>{i < c ? '✓' : '×'}</span>)}</div>
    <div className="metric-comparison" aria-live="polite">
      <div><div className="chart-label"><span>pass@k · 至少成功一次</span><strong>{(passAtK * 100).toFixed(2)}%</strong></div><div className="probability-track"><div style={{width:`${passAtK*100}%`}}/></div></div>
      <div><div className="chart-label"><span>pass^k · 每次都成功</span><strong>{(passAllK * 100).toFixed(2)}%</strong></div><div className="probability-track reliability-track"><div style={{width:`${passAllK*100}%`}}/></div></div>
    </div>
    <p className="lab-caveat">从 n 次已观测结果的所有 k 元子集中计算组合估计量。方块仅汇总成功/失败次数，不表示时序。这里是单题教学数据，不是真实模型成绩；全数据集分数应逐题估计后平均。</p>
  </div>;
}
