export type Paper = {
  id: string;
  title: string;
  year: number;
  venue: string;
  authors: string;
  category: string;
  description: string;
  topics: string[];
  guide: string;
  abstract: string;
  pdf: string;
};

export const papers: Paper[] = [{
  id: 'attention-is-all-you-need',
  title: 'Attention Is All You Need',
  year: 2017,
  venue: 'NIPS 2017',
  authors: 'Ashish Vaswani et al.',
  category: '模型架构',
  description: 'Transformer 的起点。从 Q、K、V 出发，理解注意力怎样汇聚信息，以及编码器与解码器如何协作。',
  topics: ['Self-Attention', 'Multi-Head Attention', '位置编码', 'Encoder–Decoder'],
  guide: '/learn/papers/attention-is-all-you-need',
  abstract: 'https://arxiv.org/abs/1706.03762',
  pdf: 'https://arxiv.org/pdf/1706.03762',
}];
