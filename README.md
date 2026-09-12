# 前沿算法手册 · Frontier Algo Book

面向自学者的中文学习手册：从 SFT、偏好对齐和强化学习，到 Agent 学习与投机解码。首版包含 **15 篇主题章节 + 学习路线 + 3 个交互实验**。正文附原始资料，并注明术语不确定性及教学简化。

## 技术选择

采用 **Docusaurus 3 + React 19 + TypeScript + MDX**，静态构建部署到 GitHub Pages。相较于裸 Vite，Docusaurus 已提供书籍目录、页内目录、上下章导航、深色模式和逐页静态 HTML；MDX 可直接嵌入 React 实验组件。本项目不需要服务端功能，使用文档框架更直接。

参考：[Docusaurus 官方介绍](https://docusaurus.io/docs)、[GitHub Pages 部署说明](https://docusaurus.io/docs/deployment#deploying-to-github-pages)。

## 本地运行

使用 Node.js 22.6+（建议 Node.js 22；已在 Node.js 24 验证）：

```bash
npm ci
npm start
```

打开 `http://localhost:3000/frontier-algo-book/`。

```bash
npm run typecheck
npm test
npm run build
npm run serve
```

`build/` 为可发布的静态站点。生产预览默认同样使用 3000 端口，请先停止开发服务器，或用 `npm run serve -- --port 3001`。

## 学习内容

- 基础与监督学习：概率、交叉熵、KL、策略梯度、SFT。
- 偏好对齐与强化学习：RLHF、DPO、PPO、GRPO、RLVR。
- 蒸馏与 Agent 学习：OPD、ACE、Agentic RL、RSI。
- 推理加速：投机解码、EAGLE、DFlash、DSpark。

推荐顺序及依赖表在 `content/roadmap.mdx`。`ego` 暂按 EAGLE 理解，但未获用户确认；OPD 采用 On-Policy Distillation，ACE 采用 Agentic Context Engineering。DSpark 已核验论文和 DeepSeek 官方 DeepSpec。

## 项目结构与扩写

```text
content/                 MDX 章节与学习路线
src/components/          可复用交互实验与路线组件
src/lib/labMath.ts       教学实验计算
src/pages/              首页、实验室
src/css/custom.css      响应式主题
tests/                  数值性质与边界测试
docs/                   技术规划、调研记录与验证记录
sidebars.ts             章节顺序
docusaurus.config.ts    网站地址、路径和导航
.github/workflows/      构建验证与 Pages 发布
```

新增章节：在对应 `content/` 子目录新增 `.mdx`，以一级标题开始，再把文档 ID 加到 `sidebars.ts`。文件名就是 URL 的一部分，请保持稳定。内部章节链接优先使用相对 `.mdx` 链接，以便构建时检查。

正文嵌入 React 实验：

```mdx
import {DpoLab} from '@site/src/components/AlgorithmLab';

<DpoLab />
```

首版公式使用代码块和 Unicode，尚未引入 LaTeX 排版；如需完整推导，再统一添加 remark-math / rehype-katex。交互实验为教学模型，不调用真实 LLM、不训练参数，也不报告实测加速。

## GitHub Pages 上线

已配置项目地址 `https://hyzenciaga.github.io/frontier-algo-book/`，这是**预期部署地址，不表示本次已上线**。

1. 在 GitHub 仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
2. 将开发分支通过 PR 合并到 `main`。
3. `pages.yml` 会安装依赖、运行类型和数值检查、构建并部署。PR 只验证，不发布；从非 main 分支手动触发也只验证。
4. 在 Actions 查看部署结果。首次部署如提示 environment 分支限制，检查 `github-pages` 环境允许 `main`。

`baseUrl` 已设为 `/frontier-algo-book/`，`trailingSlash: true` 会输出每章的 `index.html`，支持 Pages 子路径和深链接刷新，无需 SPA 404 回退。改仓库名、拥有者或自定义域名时同步修改 `url` / `baseUrl`。

本次初始化不会修改远端 Pages 设置或自动合并分支。
