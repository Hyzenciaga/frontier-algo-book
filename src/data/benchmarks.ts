export const benchmarks = [{
  id: 'tau-bench',
  name: 'τ-bench',
  year: 2024,
  area: 'Agent 交互与可靠性',
  title: '把事情做对，还要每次都做对。',
  description: '在零售与航空服务环境中，结合多轮对话、领域规则和工具调用完成任务。',
  assesses: '信息获取、业务规则、多步工具调用与一致性',
  metrics: 'pass^k、pass@k、任务成功率',
  tasks: '开放式多轮交互 + 结构化 API 操作',
  guide: '/learn/benchmarks/tau-bench',
  paper: 'https://arxiv.org/abs/2406.12045',
}];
