# starfind

⭐️ 一个增强版的 `ls` 命令，支持为常用项目添加星标标记，提升项目检索效率。

## 特性

- 🔍 **增强版 ls**：保留所有原生 `ls` 功能，同时在星标项目前显示 ⭐️
- ⭐ **星标管理**：为常用项目/目录添加星标
- 📋 **快速查找**：仅列出当前目录下的星标项目
- 🌐 **全局视图**：查看所有已星标项目
- 🧹 **自动清理**：清理不存在的星标路径

## 安装

```bash
# 安装依赖
bun install

# 构建项目
bun run build

# 全局安装（可选）
bun link
```

## 使用方法

### 1. 默认增强 ls 行为

```bash
# 基本用法
starfind

# 支持所有 ls 参数
starfind -l
starfind -al
starfind -lh
starfind -t
```

**输出示例：**
```
bun.lock
⭐️ dist
node_modules
package.json
⭐️ src
tsconfig.json
```

### 2. 添加星标

```bash
# 为指定路径添加星标
starfind star <path>

# 示例
starfind star ./my-app
starfind star .
starfind star ../parent-project
```

### 3. 移除星标

```bash
# 移除指定路径的星标
starfind unstar <path>

# 示例
starfind unstar ./my-app
```

### 4. 列出星标项目

```bash
# 列出当前目录下的星标项目
starfind list

# 支持 ls 参数
starfind list -l
starfind list -lh

# 列出全局所有星标项目
starfind list -g
```

**输出示例：**
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

### 5. 清理无效路径

```bash
# 清理不存在的星标路径
starfind clean
```

**输出示例：**
```
已清理 2 个无效路径:
  /Users/username/projects/deleted-project
  /tmp/temporary-folder
```

## 配置文件

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

## 技术栈

- **运行时**：Bun.js
- **语言**：TypeScript
- **CLI 框架**：Commander
- **输出美化**：Chalk

## 项目结构

```
src/
  ├── cli.ts                # CLI 入口
  ├── commands/             # 命令实现
  │   ├── default.ts        # 默认 ls 增强行为
  │   ├── star.ts           # star 命令
  │   ├── unstar.ts         # unstar 命令
  │   ├── list.ts           # list 命令
  │   └── clean.ts          # clean 命令
  ├── utils/                # 工具函数
  │   ├── config.ts         # 配置文件读写
  │   ├── path-resolver.ts  # 路径解析
  │   ├── ls-parser.ts      # ls 输出解析
  │   └── logger.ts         # 日志输出
  └── types/
      └── index.ts          # 类型定义
```

## 开发

```bash
# 开发模式
bun run dev

# 构建
bun run build

# 直接运行构建后的文件
./dist/cli.js
```

## License

MIT
