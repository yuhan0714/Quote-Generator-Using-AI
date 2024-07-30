🌍 *[English](README.md) ∙ [简体中文](README-zh.md)*

# [Quote Generator.cc](https://quotegenerator.cc/)

用AI在几秒钟内生成你想要的格言。

[![生成名人名言](./public/screenshot.png)](https://quotegenerator.cc/)
演示地址:https://quotegenerator.cc/

## 工作原理

该项目是在weijun老师的原仓库基础上增加了多语言国际化的版本,原仓库地址:https://github.com/weijunext/smart-excel-ai
如果需要多语言国际化功能才需要本仓库代码.

该项目使用[ChatGPT API](https://openai.com/api/)和具有流功能的[Vercel AI SDK](https://sdk.vercel.ai/docs)。它基于表单和用户输入构建提示，将其发送至ChatGPT API通过Vercel边缘函数，然后将响应流式传输回应用程序界面。

## 技术栈

构建于以下技术栈：

- Next.js – 前端/后端
- TailwindCSS – 样式
- Postgres和Prisma - 数据库和存储（[如何使用？](https://weijunext.com/article/061d8cd9-fcf3-4d9e-bd33-e257bc4f9989)）
- Next-auth - 认证（[如何使用？](https://weijunext.com/article/061d8cd9-fcf3-4d9e-bd33-e257bc4f9989)） 
- Chat GPT - 生成Excel公式
- Upstash - Redis（[如何使用？](https://weijunext.com/article/6510121c-90da-4d20-85a1-72cbbdb3983b)）
- Lemon Squeezy - 支付（[如何使用？](https://weijunext.com/article/integrate-lemonsqueezy-api)）
- Google Analytics - 访问分析（[如何使用？](https://weijunext.com/article/979b9033-188c-4d88-bfff-6cf74d28420d)）
- Docker - 开发存储（[如何使用？](https://weijunext.com/article/b33a5545-fd26-47a6-8641-3c7467fb3910)）
- Vercel - 托管

如果您对某些技术栈不熟悉，请点击上面的“如何使用”链接，阅读我的中文博客。或者到我的另一个开源仓库学习 —— [Learn Next.js Stack](https://github.com/weijunext/nextjs-learn-demos)

## 本地运行

克隆仓库后，你需要复制`.env.example`文件来创建一个`.env`文件，并填写所需字段。

然后，在命令行运行应用程序，它将在`http://localhost:3000`上可用。

```bash
pnpm i

pnpm run dev
```

## 一键部署

使用[Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=vercel-examples)部署示例：

[![使用Vercel部署](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/weijunext/smart-excel-ai&project-name=&repository-name=smart-excel-ai&demo-title=SmartExcel&demo-description=Generate%20the%20Excel%20formulas%20you%20need%20in%20seconds%20using%20AI.&demo-url=https://smartexcel.cc&demo-image=https://smartexcel.cc/opengraph-image.png)
