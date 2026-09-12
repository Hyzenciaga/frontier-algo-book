import React, {useState} from 'react';
import {preferenceStats, groupAdvantages} from '../lib/labMath';

export function DpoLab() {
  const [margin, setMargin] = useState(0.8);
  const [beta, setBeta] = useState(0.5);
  const {probability, loss, gradient} = preferenceStats(margin, beta);
  return <div className="experiment">
    <div className="lab-controls"><label>相对 reference 的偏好差 Δ <strong>{margin.toFixed(1)}</strong><input aria-label="偏好差" type="range" min="-4" max="4" step="0.1" value={margin} onChange={e => setMargin(Number(e.target.value))}/></label><label>β 系数 <strong>{beta.toFixed(1)}</strong><input aria-label="Beta 系数" type="range" min="0.1" max="2" step="0.1" value={beta} onChange={e => setBeta(Number(e.target.value))}/></label></div>
    <div className="preference-chart"><div className="chart-label"><span>隐式偏好概率 σ(βΔ)</span><strong>{(probability * 100).toFixed(1)}%</strong></div><div className="probability-track"><div style={{width: `${probability * 100}%`}}/></div><div className="chart-scale"><span>更偏向 rejected</span><span>更偏向 chosen</span></div></div>
    <div className="lab-stats" aria-live="polite"><div><small>单样本损失</small><strong>{loss.toFixed(3)}</strong></div><div><small>∂L / ∂Δ</small><strong>{gradient.toFixed(3)}</strong></div><div><small>更新方向</small><strong>提高 Δ</strong></div></div>
    <code className="lab-formula">Δ = log(πθ(y+|x)/πref(y+|x)) − log(πθ(y−|x)/πref(y−|x))</code>
    <p className="lab-caveat">L = −log σ(βΔ)。这是固定样本的标量切片；概率表示成对偏好模型的概率，不是回答正确率，也不是实际训练后的胜率。β 同时影响损失形状，不可简单理解为「越大越好」。</p>
  </div>;
}

export function GrpoLab() {
  const [rewards, setRewards] = useState([0, 1, 1, 3]);
  const {mean, std, advantages} = groupAdvantages(rewards);
  return <div className="experiment"><div className="reward-presets"><span>同一问题，四条候选回答</span><button onClick={() => setRewards([0, 1, 1, 3])}>恢复示例</button><button onClick={() => setRewards([1, 1, 1, 1])}>全部同分</button></div>
    <div className="reward-grid">{rewards.map((reward, index) => <div className="reward-column" key={index}><label>回答 {String.fromCharCode(65 + index)}<input aria-label={`回答 ${String.fromCharCode(65 + index)} 的奖励`} type="range" min="0" max="4" step="1" value={reward} onChange={e => setRewards(rewards.map((r, i) => i === index ? Number(e.target.value) : r))}/><strong>奖励 {reward}</strong></label><div className="advantage-track"><div className={advantages[index] >= 0 ? 'adv-positive' : 'adv-negative'} style={{height: `${Math.abs(advantages[index]) * 25}%`, bottom: advantages[index] >= 0 ? '50%' : undefined, top: advantages[index] < 0 ? '50%' : undefined}}/><span/></div><output className={advantages[index] < 0 ? 'negative-value' : 'positive-value'}>{advantages[index] > 0 ? '+' : ''}{advantages[index].toFixed(2)}</output></div>)}</div>
    <div className="lab-stats" aria-live="polite"><div><small>组均值</small><strong>{mean.toFixed(2)}</strong></div><div><small>总体标准差</small><strong>{std.toFixed(2)}</strong></div><div><small>组内相对信号</small><strong>{std === 0 ? '没有区分' : '存在差异'}</strong></div></div>
    <p className="lab-caveat">演示 Aᵢ = (rᵢ − mean(r)) / std(r)，采用总体标准差；零方差时设为 0。这里只展示组内优势，不模拟完整 GRPO 的概率比、裁剪和 KL 约束。实际实现还可能采用不同的标准化方式。</p>
  </div>;
}

const target = ['今天', '我们', '学习', '投机', '解码', '。'];
export function SpeculativeLab() {
  const [mismatch, setMismatch] = useState(3);
  const [step, setStep] = useState(0);
  const draft = target.slice(0, 4).map((token, i) => i === mismatch ? '苹果' : token);
  const accepted = Math.min(mismatch, 4);
  return <div className="experiment"><div className="spec-controls"><label>草稿的首个错误<select aria-label="草稿首个错误位置" value={mismatch} onChange={e => {setMismatch(Number(e.target.value)); setStep(0);}}><option value={0}>第 1 个 token</option><option value={1}>第 2 个 token</option><option value={2}>第 3 个 token</option><option value={3}>第 4 个 token</option><option value={4}>全部正确</option></select></label><button className="button button--primary" disabled={step === 2} onClick={() => setStep(step + 1)}>{step === 0 ? '1. 验证草稿' : step === 1 ? '2. 提交结果' : '本轮完成'}</button><button className="reset-button" onClick={() => setStep(0)}>重置</button></div>
    <div className="token-row"><span>草稿模型</span><div>{draft.map((t, i) => <span className={`draft-token ${step > 0 ? i < accepted ? 'accepted' : i === mismatch ? 'rejected' : 'discarded' : ''}`} key={i}>{t}<small>{step === 0 ? `草稿 ${i + 1}` : i < accepted ? '接受' : i === mismatch ? '拒绝' : '丢弃'}</small></span>)}</div></div>
    <div className="token-row"><span>目标模型</span><div>{target.slice(0, 4).map((t, i) => <span className="draft-token target-token" key={i}>{step > 0 ? t : '…'}<small>{step > 0 ? '目标 argmax' : '等待验证'}</small></span>)}</div></div>
    <div className="token-result" aria-live="polite"><span>本轮提交</span><strong>{step < 2 ? '先生成草稿，再由目标模型验证。' : target.slice(0, accepted + 1).join(' ')}</strong><p>{step < 2 ? '匹配的连续前缀会被保留；第一个错误之后的草稿全部丢弃。' : mismatch === 4 ? '4 个草稿全部接受，并提交目标模型给出的 1 个额外 token。' : `保留 ${accepted} 个草稿 token，再提交目标模型对错误位置的修正。`}</p></div>
    <p className="lab-caveat">这是 greedy（贪心）解码的单轮示意，固定序列、并未运行模型。精确随机投机采样需要 min(1, p/q) 接受概率和拒绝后的残差重采样；不能用 token 是否等于 argmax 来替代。目标模型的后续条件分布也依赖前缀；本例用固定文本简化显示，不代表实测加速比。</p>
  </div>;
}
