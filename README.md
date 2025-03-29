# Alice Portfolio

## 项目介绍

这是一个现代化的个人作品集网站，采用 Next.js 14 构建，结合了 3D 效果和流畅的动画展示。网站具有响应式设计，可以在各种设备上完美展示。

### 主要特点

- 🎨 现代化的 UI 设计
- 🌟 流畅的页面过渡动画
- 🎮 3D 交互效果
- 📱 完全响应式设计
- ⚡ 基于 Next.js 14 的快速加载
- 🎯 SEO 优化

## 技术栈

### 核心框架
- Next.js 14 - React 框架
- React 18 - UI 库
- TypeScript - 类型安全

### 3D 和动画
- React Three Fiber - 3D 渲染
- Framer Motion - 动画效果
- GSAP - 高级动画

### 样式和工具
- TailwindCSS - 样式框架
- ESLint - 代码规范
- PostCSS - CSS 处理

## 环境要求

- Node.js 18.0.0 或更高版本
- npm 9.0.0 或更高版本

## 安装步骤

1. 克隆项目到本地：
```bash
git clone https://github.com/你的用户名/alice-portfolio.git
cd alice-portfolio
```

2. 安装项目依赖：
```bash
npm install
```

## 运行项目

1. 启动开发服务器：
```bash
npm run dev
```

2. 在浏览器中访问：
```
http://localhost:3000
```

## 构建项目

要构建生产版本，运行：
```bash
npm run build
```

构建完成后，可以通过以下命令启动生产服务器：
```bash
npm start
```

## 项目结构

```
alice-portfolio/
├── app/                    # Next.js 应用主目录
│   ├── layout.tsx         # 根布局组件
│   ├── page.tsx           # 首页
│   └── globals.css        # 全局样式
├── components/            # React 组件
│   ├── ui/               # UI 组件
│   ├── sections/         # 页面区块组件
│   └── three/            # 3D 相关组件
├── public/               # 静态资源
│   ├── images/          # 图片资源
│   └── fonts/           # 字体文件
├── styles/              # 样式文件
├── types/               # TypeScript 类型定义
├── utils/               # 工具函数
├── constants/           # 常量定义
├── package.json         # 项目配置和依赖
└── README.md            # 项目说明文档
```

## 功能模块

### 首页
- 3D 模型展示
- 个人简介
- 技能展示
- 项目展示

### 作品集
- 项目列表
- 项目详情
- 项目预览

### 关于我
- 个人经历
- 教育背景
- 联系方式

## 常见问题

1. 如果遇到 `'next' 不是内部或外部命令` 的错误，请确保已经运行了 `npm install` 安装所有依赖。

2. 如果遇到 TypeScript 相关错误，请确保已经安装了所有必要的类型定义包。

3. 如果遇到 Three.js 相关警告，这些通常不会影响项目的正常运行。

4. 如果遇到性能问题，请确保：
   - 使用最新版本的 Node.js
   - 清理浏览器缓存
   - 检查是否有过多的浏览器扩展

## 性能优化

- 使用 Next.js 的图片优化
- 组件懒加载
- 3D 模型优化
- 代码分割

## 部署

推荐使用 Vercel 部署，它提供了最佳的 Next.js 部署体验：

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 自动部署完成

## 贡献指南

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 更新日志

### v1.0.0
- 初始版本发布
- 基础功能实现
- 响应式设计支持

## 许可证

MIT License

## 联系方式

- 邮箱：liketeriko@gmail.com
- GitHub：[你的GitHub主页](https://github.com/Ter1ko)

## 致谢

感谢所有为这个项目提供帮助和建议的贡献者！
