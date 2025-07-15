# Telegram 中文官网

一个类似于 Telegram 官网的现代化静态网站，采用响应式设计，支持多平台下载。

## 功能特色

- 🎨 现代化设计风格，类似 Telegram 官网
- 📱 完全响应式，支持桌面端和移动端
- ⚡ 快速加载，优化性能
- 🌟 平滑动画效果
- 📥 多平台下载选项
- 🔗 平滑滚动导航

## 文件结构

```
TG_SEO/
├── index.html          # 主页面
├── style.css           # 样式文件
├── script.js           # JavaScript 功能
└── README.md           # 项目说明
```

## 快速开始

1. **直接打开**
   ```bash
   # 在浏览器中打开 index.html
   open index.html
   ```

2. **使用本地服务器**（推荐）
   ```bash
   # 使用 Python 3
   python -m http.server 8000
   
   # 使用 Python 2
   python -m SimpleHTTPServer 8000
   
   # 使用 Node.js
   npx http-server
   ```

3. **访问网站**
   ```
   http://localhost:8000
   ```

## 主要功能

### 导航栏
- 固定顶部导航
- 移动端汉堡菜单
- 平滑滚动到各个区域

### 英雄区域
- 渐变标题文字
- 交互式手机模型
- 呼吸动效

### 功能展示
- 6个核心功能介绍
- 悬停动画效果
- 响应式网格布局

### 下载区域
- 支持 6 个平台：iOS、Android、Windows、macOS、Linux、Web
- 每个平台都有对应的图标和链接
- 卡片悬停效果

### 关于区域
- 公司介绍
- 动态统计数据
- 浮动动画 Logo

## 技术特点

### HTML5
- 语义化标签
- SEO 优化
- 无障碍访问支持

### CSS3
- Flexbox 和 Grid 布局
- 渐变和阴影效果
- CSS 动画和过渡
- 响应式媒体查询

### JavaScript
- 现代 ES6+ 语法
- 交互式动画
- 性能优化
- 错误处理

## 响应式断点

- **桌面端**: > 1024px
- **平板端**: 768px - 1024px
- **手机端**: < 768px
- **小屏手机**: < 480px

## 自定义配置

### 修改颜色主题
在 `style.css` 中搜索 `#2AABEE` 来修改主题色。

### 修改内容
编辑 `index.html` 中的文本内容。

### 添加新功能
在 `script.js` 中添加新的交互功能。

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge
- IE 11+

## 性能优化

- CSS 和 JavaScript 资源优化
- 图片懒加载支持
- 预加载重要资源
- 防抖和节流函数

## 许可证

本项目仅用于学习和演示目的。

## 注意事项

- 下载链接指向真实的 Telegram 下载页面
- 可根据需要修改链接地址
- 建议在生产环境中使用 HTTPS

## 更新日志

### v1.0.0 (2024-12-19)
- 初始版本发布
- 完整的响应式设计
- 多平台下载支持
- 动画效果实现

## 联系方式

如有问题或建议，请通过以下方式联系：
- 创建 Issue
- 提交 Pull Request 