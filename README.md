# Alice Portfolio

## 项目介绍

这是一个现代化的个人作品集网站，采用 Next.js 13+ 构建，结合了 3D 效果和流畅的动画展示。网站具有响应式设计，可以在各种设备上完美展示。

### 主要特点

- � 现代化的 UI 设计
- 🌟 流畅的页面过渡动画
- 🎮 3D 交互效果
- 📱 完全响应式设计
- ⚡ 基于 Next.js 13+ 的快速加载
- 🎯 SEO 优化
+ 🎭 优雅的加载动画
+ 💫 玻璃态设计效果
+ 🌈 渐变色和光效

  
## 技术栈

### 核心框架
- Next.js 13+ - React 框架
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
+ - Framer Motion - 页面动画
+ - Three.js - 3D 渲染

## 环境要求

- Node.js 18.0.0 或更高版本
- npm 9.0.0 或更高版本

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge
- Opera

  
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

3. 配置环境变量：
```bash
cp .env.example .env.local
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

## 开发指南

### 代码规范
- 使用 ESLint 进行代码检查
- 遵循 TypeScript 严格模式
- 使用 Prettier 进行代码格式化

### 提交规范
- feat: 新功能
- fix: 修复问题
- docs: 文档修改
- style: 代码格式修改
- refactor: 代码重构
- test: 测试用例修改
- chore: 其他修改

  
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
  
5. 如果遇到字体加载问题，请确保：
   - 检查字体文件是否正确放置在 public/fonts 目录下
   - 检查字体文件格式是否支持

6. 如果遇到动画性能问题：
   - 检查设备性能
   - 考虑降低动画复杂度
   - 使用 CSS transform 代替位置动画

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

### 使用条款
- 可以自由使用、修改和分发
- 必须包含原始许可证和版权声明
- 不提供任何担保

## 联系方式

- 邮箱：liketeriko@gmail.com
- GitHub：[Ter1ko的GitHub主页](https://github.com/Ter1ko)


## 更新计划

### v1.1.0 (计划中)
- [ ] 添加深色模式
- [ ] 优化移动端体验
- [ ] 添加更多交互动画
- [ ] 支持多语言


## 致谢

感谢所有为这个项目提供帮助和建议的贡献者！
- [Next.js](https://nextjs.org/) - 优秀的 React 框架
- [TailwindCSS](https://tailwindcss.com/) - 强大的 CSS 框架
- [Framer Motion](https://www.framer.com/motion/) - 流畅的动画库
- [Three.js](https://threejs.org/) - 强大的 3D 库
