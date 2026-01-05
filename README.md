<div align="left">

# STARFIND

**继承原生 `ls` 命令输出，支持为常用项目管理星标标记**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-1.0+-orange.svg)](https://bun.sh/)

[特性](#-特性) • [安装](#-安装) • [使用](#-使用方法) • [配置](#-配置文件) • [开发](#-开发)

<img src="/screenshots/demo.png" />

</div>

---

## 💡 简介

`starfind` 行工具，它在保留所有原生 `ls` 功能的同时，允许你为常用项目添加星标（⭐️），让项目检索更高效。告别在一堆目录中寻找重要项目的烦恼！

## ✨ 特性

- 🔍 **完全兼容 ls** - 保留所有原生 `ls` 功能和参数
- ⭐ **添加星标** - 为常用项目添加可视化星标标记
- 📋 **快速过滤** - 仅列出当前目录下的星标项目
- 🌐 **全局视图** - 一键查看所有已星标项目

## 📦 安装

### 前置要求

- [Bun](https://bun.sh/) >= 1.0

### 快速开始

```bash
# 1. 克隆项目
git clone https://github.com/yourusername/starfinder-cli.git

cd starfinder-cli

# 2. 安装依赖
bun install是一个为开发者设计的命令

# 3. 构建项目
bun run build

# 4. 全局安装（推荐）
bun link
```

> 💡 **提示**：全局安装后，你可以在任何目录使用 `starfind` 命令！

> [!IMPORTANT]
> 你可以在 `~/.zshrc` 中添加 `alias sf="bun run starfind"` 来简化命令。之后你就可以用 `sf` 来替代 `starfind`。

---

## 🚀 使用方法

### 基础命令

#### 1️⃣ 增强版 ls（默认行为）

在任何目录运行 `starfind`，即可查看带星标标记的文件列表：

```bash
starfind          # 基本用法
starfind -l       # 详细列表
starfind -al      # 显示隐藏文件
starfind -lh      # 人类可读的文件大小
starfind -t       # 按时间排序
```

<details>
<summary>📸 输出示例</summary>

```
bun.lock
⭐️ dist
node_modules
package.json
⭐️ src
tsconfig.json
```

</details>

#### 2️⃣ 添加星标

为重要项目/目录添加星标标记：

```bash
starfind star <path>

# 示例
starfind star ./my-app           # 标记子目录
starfind star .                  # 标记当前目录
starfind star ../parent-project  # 标记父级目录
```

#### 3️⃣ 移除星标

取消不再需要的星标：

```bash
starfind unstar <path>

# 示例
starfind unstar ./my-app
```

#### 4️⃣ 列出星标项目

查看已星标的项目：

```bash
starfind list       # 当前目录的星标项目
starfind list -l    # 详细信息
starfind list -g    # 全局所有星标项目
```

<details>
<summary>📸 输出示例</summary>

```bash
# starfind list
⭐️ my-app
⭐️ important-lib

# starfind list -g
⭐️ 全局星标项目 (5):
  /Users/username/projects/my-app
  /Users/username/projects/another-app
  /Users/username/work/client-project
  /Users/username/personal/side-project
  /opt/tools/dev-tools
```

</details>

#### 5️⃣ 清理无效路径

自动清理已删除目录的星标记录：

```bash
starfind clean
```

<details>
<summary>📸 输出示例</summary>

```
已清理 2 个无效路径:
  /Users/username/projects/deleted-project
  /tmp/temporary-folder
```

</details>

---

## ⚙️ 配置文件

星标信息存储在 `~/.starfindrc` 文件中，采用 JSON 格式：

```json
{
  "version": "1.0",
  "starred": [
    "/Users/username/projects/my-app",
    "/Users/username/projects/important-lib"
  ]
}
```

> 📝 **注意**：你可以手动编辑此文件来批量管理星标，但建议使用命令行操作以确保数据一致性。

---

## 🛠️ 技术栈

| 技术 | 用途 |
|------|------|
| [Bun.js](https://bun.sh/) | 高性能 JavaScript 运行时 |
| [TypeScript](https://www.typescriptlang.org/) | 类型安全的开发语言 |
| [Commander](https://github.com/tj/commander.js) | CLI 命令解析框架 |
| [Chalk](https://github.com/chalk/chalk) | 终端输出美化工具 |

---

## 👨‍💻 开发指南

### 本地开发

```bash
# 开发模式（支持热重载）
bun run dev

# 构建项目
bun run build

# 直接运行构建后的文件
./dist/cli.js

```

### 调试技巧

```bash
# 使用本地版本而非全局安装
bun run src/cli.ts [command] [args]

# 启用详细日志
DEBUG=* starfind [command]
```

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 贡献步骤

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/amazing-feature`
3. 提交更改：`git commit -m 'Add some amazing feature'`
4. 推送分支：`git push origin feature/amazing-feature`
5. 提交 Pull Request

### 开发规范

- 遵循 TypeScript 和 ESLint 规范
- 保持代码简洁、可读
- 添加必要的注释和文档
- 确保所有测试通过

---

## 📄 License

本项目采用 [MIT](LICENSE) 许可证。
