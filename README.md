<p align="center">
  <img src="web/public/logo.svg" width="96" alt="infinite-canvas logo">
</p>

<h1 align="center">无限画布 (infinite-canvas)</h1>

<p align="center">
  <a href="https://linux.do/"><img src="https://img.shields.io/badge/Linux.do-Community-2b6de8?style=flat-square" alt="Linux.do"></a>
  <a href="VERSION"><img src="https://img.shields.io/badge/version-v0.2.0-2563eb?style=flat-square" alt="Version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-AGPL--3.0-f97316?style=flat-square" alt="License"></a>
  <a href="https://vite.dev/"><img src="https://img.shields.io/badge/Vite-7-646cff?style=flat-square&logo=vite&logoColor=white" alt="Vite"></a>
  <a href="https://reactrouter.com/"><img src="https://img.shields.io/badge/React_Router-7-ca4245?style=flat-square&logo=reactrouter&logoColor=white" alt="React Router"></a>
</p>

无限画布是一款面向图片创作的画布工作台。它把画布编排、AI 图片生成、参考图编辑、对话助手、提示词库和素材沉淀放在同一个界面里，适合用来探索视觉方案并连续迭代图片结果。

> [!CAUTION]
> 项目目前处于开发阶段，不保证历史数据兼容。各种数据库结构和存储格式都可能直接调整，当前更适合个人/本地部署，不建议直接公网多人共用。

## 核心功能

- 无限画布：多画布项目、节点拖拽缩放、连线、小地图、撤销重做、导入导出。
- AI 创作：浏览器前台直连你配置的 OpenAI 兼容接口，支持文生图、图生图、参考图编辑、文本问答、音频和视频生成。
- 画布助手：围绕选中节点和上游节点对话、生图，并把结果插回画布。
- 本地 Agent：通过本机 Canvas Agent 连接 Codex / Claude Code，让 Agent 通过 MCP 操作当前画布。
- Codex App 插件：提供 Codex app 插件，安装后会自动注册 MCP 并尝试拉起本地 Agent。
- 提示词库：浏览器前端直连多个提示词项目，并缓存到 IndexedDB。

完整功能说明见 [功能介绍](docs/content/docs/overview/features.mdx)。

## 技术栈

- 前端：Vite、React、React Router、TypeScript、Tailwind CSS、Ant Design、Zustand、TanStack Query。
- 前端：提示词库、WebDAV 和 AI 接口都由浏览器前端直连。
- 部署：静态站点托管或 Docker。

## 快速开始

AI API Key、Base URL、画布、素材和生成记录默认保存在浏览器本地。

```bash
git clone <仓库地址>
cd infinite-canvas
cd web
bun install
bun run dev
```

Docker 运行：

```bash
docker build -t infinite-canvas .
docker run --rm -p 3000:3000 infinite-canvas
```

运行后默认端口 3000，可访问 `http://localhost:3000`。

首次打开后进入右上角配置，填入自己的 OpenAI 兼容 `Base URL` 和 `API Key`。

## 自动配置

在 `系统设置 -> 聊天方式 -> 添加聊天设置` 中填入：

```text
https://<你的部署地址>?apiKey={key}&baseUrl={address}
```

跳转后会自动打开配置弹窗并填入 API Key 和 Base URL。

## 本机部署

- 目录：`~/CascadeProjects/infinite-canvas`
- 启动：`cd web && bun run dev`（端口 3000）
- 接入生图后端：右上角配置 → Base URL 填本机 chatgpt2api `http://127.0.0.1:8000/v1` + Key

## 文档

- [快速开始](docs/content/docs/overview/quick-start.mdx)
- [功能介绍](docs/content/docs/overview/features.mdx)
- [Docker 部署](docs/content/docs/overview/docker.mdx)
- [画布节点操作手册](docs/content/docs/canvas/canvas-node-manual.mdx)
- [画布快捷键](docs/content/docs/canvas/canvas-shortcuts.mdx)
- [本地 Canvas Agent](canvas-agent/README.md)
- [Codex app 插件](plugins/infinite-canvas)

## 协议

本项目基于 AGPL-3.0，见 [LICENSE](LICENSE)。
