# PicProse - 更好的封面图片生成工具

[![GitHub stars](https://img.shields.io/github/stars/jaaronkot/picprose)](https://github.com/jaaronkot/picprose/stargazers)
[![License](https://img.shields.io/github/license/jaaronkot/picprose)](https://github.com/jaaronkot/picprose/blob/main/LICENSE)

## 项目简介

PicProse 是一款强大的封面图片生成工具，专为博客作者、内容创作者、开发者和设计师打造。只需几步操作，即可创建专业精美的封面图片，适用于 Medium、YouTube、BiliBili、个人博客等多种平台。

**在线体验：** [picprose.pixpark.net](https://picprose.pixpark.net/)


![PicProse Preview](./doc/demo-1.jpg )

![PicProse Preview](./doc/demo-2.jpg )

![PicProse Preview](./doc/demo-3.jpg )

## ✨ 主要特点

- 🖼️ **丰富的图片资源** - 通过 Unsplash API 直接访问海量高质量图片
- 🎨 **灵活的编辑功能** - 自定义标题、作者信息、字体、颜色和透明度
- 📱 **多种比例支持** - 包含横屏和竖屏多种规格，适应不同平台需求
- 🔍 **实时预览** - 所有修改即时可见，所见即所得
- 🌈 **开发者图标集成** - 内置开发技术相关图标，适合技术文章封面
- 📥 **多格式导出** - 支持 JPG、PNG、SVG 格式导出
- 🇨🇳 **多语言支持** - 支持不同语言界面
- 🎯 **响应式设计** - 完美适配桌面端和移动端

## 🚀 快速开始

### 安装

```bash
# 克隆仓库
git clone https://github.com/jaaronkot/picprose.git

# 进入项目目录
cd picprose

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 环境变量配置

创建 `.env.local` 文件并添加以下内容： 

```
UNSPLASH_API_KEY = 你的Unsplash访问密钥
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=你的GA追踪ID
```

## 🔧 使用指南

1. **选择图片** - 从左侧面板浏览或搜索图片，点击选择
2. **调整布局** - 选择适合您需求的宽高比
3. **添加元素** - 添加标题、作者信息和图标
4. **自定义样式** - 调整颜色、透明度、字体大小等
5. **导出成品** - 点击底部导出按钮，选择所需格式

## 🧰 技术栈

- **前端框架**: [Next.js](https://nextjs.org/)
- **类型系统**: [TypeScript](https://www.typescriptlang.org/)
- **UI组件**: [NextUI](https://nextui.org/)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **图片源**: [Unsplash API](https://unsplash.com/developers)
- **国际化**: [next-intl](https://next-intl-docs.vercel.app/)
- **字体**: [Google Fonts](https://fonts.google.com/) 和本地字体

## 📦 项目结构

```
picprose/
├── app/            # Next.js 应用目录
│   ├── [locale]/   # 多语言路由
│   ├── globals.css # 全局样式
├── public/         # 静态资源
├── types/          # TypeScript 类型定义
├── config.ts       # 项目配置
└── README.md       # 项目说明
```

## 🤝 贡献指南

我们欢迎所有形式的贡献，无论是新功能、错误修复还是文档改进。请参考以下步骤：

1. Fork 仓库
2. 创建新分支: `git checkout -b feature/amazing-feature`
3. 提交更改: `git commit -m 'Add some amazing feature'`
4. 推送到分支: `git push origin feature/amazing-feature`
5. 提交 Pull Request

## 📄 许可证

本项目采用 [MIT 许可证](https://github.com/jaaronkot/picprose/blob/main/LICENSE)。

## 🙏 鸣谢

- [Unsplash](https://unsplash.com/) 提供高质量图片
- [Next.js](https://nextjs.org/) 提供强大的前端框架
- [NextUI](https://nextui.org/) 提供精美的UI组件
- 所有开源项目的贡献者们

## 📬 联系我们

如有任何问题或建议，欢迎通过以下方式联系我们：

- GitHub Issues: [提交问题](https://github.com/jaaronkot/picprose/issues)
- Email: your.email@example.com

---

**PicProse** - 让您的封面图片更专业、更吸引人！💪