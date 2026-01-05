# starfind 测试指南

本文档记录了 starfind-cli 的完整测试流程和预期结果。

## 测试环境准备

### 1. 构建项目

```bash
bun run build
```

**预期输出：**
```
Bundled 22 modules in 41ms
  cli.js  91.66 KB  (entry point)
```

### 2. 添加可执行权限

```bash
chmod +x dist/cli.js
```

## 基础功能测试

### 测试 1：默认 ls 行为（无星标）

```bash
./dist/cli.js
```

**预期输出：**
```
bun.lock
dist
node_modules
package.json
src
tsconfig.json
```

> 说明：首次运行，无星标项目

---

### 测试 2：添加第一个星标

```bash
./dist/cli.js star ./src
```

**预期输出：**
```
已添加星标: /Users/paulchess/Desktop/Home/github/starfinder-cli/src
```

> ✅ 成功添加星标，显示绝对路径

---

### 测试 3：再次查看目录（显示星标）

```bash
./dist/cli.js
```

**预期输出：**
```
bun.lock
dist
node_modules
package.json
⭐️ src
tsconfig.json
```

> ✅ src 目录前显示 ⭐️ 标记

---

### 测试 4：长格式显示 (ls -l)

```bash
./dist/cli.js -l
```

**预期输出：**
```
total 24
-rw-r--r--@ 1 paulchess  staff  1182 Jan  5 11:12 bun.lock
drwxr-xr-x@ 3 paulchess  staff    96 Jan  5 11:56 dist
drwxr-xr-x@ 6 paulchess  staff   192 Jan  5 11:12 node_modules
-rw-------@ 1 paulchess  staff   590 Jan  5 11:11 package.json
drwxr-xr-x@ 6 paulchess  staff   192 Jan  5 11:55 ⭐️ src
-rw-------@ 1 paulchess  staff   379 Jan  5 11:11 tsconfig.json
```

> ✅ 长格式正确对齐，⭐️ 在文件名前

---

## list 命令测试

### 测试 5：列出当前目录星标项目

```bash
./dist/cli.js list
```

**预期输出：**
```
⭐️ src
```

> ✅ 仅显示星标项目

---

### 测试 6：list 命令长格式

```bash
./dist/cli.js list -l
```

**预期输出：**
```
total 24
drwxr-xr-x@ 6 paulchess  staff   192 Jan  5 11:55 ⭐️ src
```

> ✅ 长格式过滤，仅显示星标项目

---

### 测试 7：全局星标列表

```bash
./dist/cli.js list -g
```

**预期输出：**
```
⭐️ 全局星标项目 (1):
  /Users/paulchess/Desktop/Home/github/starfinder-cli/src
```

> ✅ 显示所有星标的绝对路径

---

## 多星标测试

### 测试 8：添加多个星标

```bash
./dist/cli.js star ./dist
./dist/cli.js star ./node_modules
```

**预期输出：**
```
已添加星标: /Users/paulchess/Desktop/Home/github/starfinder-cli/dist
已添加星标: /Users/paulchess/Desktop/Home/github/starfinder-cli/node_modules
```

---

### 测试 9：查看多个星标显示

```bash
./dist/cli.js
```

**预期输出：**
```
bun.lock
⭐️ dist
⭐️ node_modules
package.json
⭐️ src
tsconfig.json
```

> ✅ 多个星标项目都正确显示 ⭐️

---

### 测试 10：全局列表（多个星标）

```bash
./dist/cli.js list -g
```

**预期输出：**
```
⭐️ 全局星标项目 (3):
  /Users/paulchess/Desktop/Home/github/starfinder-cli/dist
  /Users/paulchess/Desktop/Home/github/starfinder-cli/node_modules
  /Users/paulchess/Desktop/Home/github/starfinder-cli/src
```

> ✅ 按字母顺序排列

---

## unstar 命令测试

### 测试 11：移除星标

```bash
./dist/cli.js unstar ./node_modules
```

**预期输出：**
```
已移除星标: /Users/paulchess/Desktop/Home/github/starfinder-cli/node_modules
```

---

### 测试 12：确认移除成功

```bash
./dist/cli.js
```

**预期输出：**
```
bun.lock
⭐️ dist
node_modules
⭐️ src
tsconfig.json
```

> ✅ node_modules 不再显示星标

---

## 错误处理测试

### 测试 13：添加不存在的路径

```bash
./dist/cli.js star /tmp/test-non-existent-path-123456
```

**预期输出：**
```
路径不存在: /tmp/test-non-existent-path-123456
```

> ✅ 红色错误提示，退出码 1

---

### 测试 14：重复添加星标

```bash
./dist/cli.js star ./src
```

**预期输出：**
```
该路径已被星标: /Users/paulchess/Desktop/Home/github/starfinder-cli/src
```

> ✅ 红色错误提示，退出码 1

---

### 测试 15：移除未星标的路径

```bash
./dist/cli.js unstar ./node_modules
```

**预期输出：**
```
路径未被星标: /Users/paulchess/Desktop/Home/github/starfinder-cli/node_modules
```

> ✅ 红色错误提示，退出码 1

---

## clean 命令测试

### 测试 16：查看配置文件

```bash
cat ~/.starfindrc
```

**预期内容：**
```json
{
  "version": "1.0",
  "starred": [
    "/Users/paulchess/Desktop/Home/github/starfinder-cli/src",
    "/Users/paulchess/Desktop/Home/github/starfinder-cli/dist"
  ]
}
```

---

### 测试 17：手动添加无效路径

编辑 `~/.starfindrc`，添加不存在的路径：

```json
{
  "version": "1.0",
  "starred": [
    "/Users/paulchess/Desktop/Home/github/starfinder-cli/src",
    "/Users/paulchess/Desktop/Home/github/starfinder-cli/dist",
    "/tmp/non-existent-path-test"
  ]
}
```

---

### 测试 18：查看全局列表（显示无效路径）

```bash
./dist/cli.js list -g
```

**预期输出：**
```
⭐️ 全局星标项目 (3):
  /Users/paulchess/Desktop/Home/github/starfinder-cli/dist
  /Users/paulchess/Desktop/Home/github/starfinder-cli/src
  /tmp/non-existent-path-test (不存在)
```

> ✅ 不存在的路径显示为灰色并标注"(不存在)"

---

### 测试 19：执行清理命令

```bash
./dist/cli.js clean
```

**预期输出：**
```
已清理 1 个无效路径:
  /tmp/non-existent-path-test
```

> ✅ 清理成功，显示已清理的路径

---

### 测试 20：确认清理结果

```bash
./dist/cli.js list -g
```

**预期输出：**
```
⭐️ 全局星标项目 (2):
  /Users/paulchess/Desktop/Home/github/starfinder-cli/dist
  /Users/paulchess/Desktop/Home/github/starfinder-cli/src
```

> ✅ 无效路径已被移除

---

### 测试 21：无需清理的情况

```bash
./dist/cli.js clean
```

**预期输出：**
```
所有星标路径都有效，无需清理
```

> ✅ 绿色提示，所有路径都有效

---

## 高级 ls 参数测试

### 测试 22：ls -al（显示隐藏文件）

```bash
./dist/cli.js -al
```

**预期输出：**
```
total 32
drwxr-xr-x  10 paulchess  staff   320 Jan  5 11:56 .
drwxr-xr-x@ 27 paulchess  staff   864 Jan  5 10:52 ..
drwxr-xr-x   9 paulchess  staff   288 Jan  5 11:43 .git
-rw-------@  1 paulchess  staff    36 Jan  5 11:11 .gitignore
-rw-r--r--@  1 paulchess  staff  1182 Jan  5 11:12 bun.lock
drwxr-xr-x@  3 paulchess  staff    96 Jan  5 11:56 ⭐️ dist
drwxr-xr-x@  6 paulchess  staff   192 Jan  5 11:12 node_modules
-rw-------@  1 paulchess  staff   590 Jan  5 11:11 package.json
drwxr-xr-x@  6 paulchess  staff   192 Jan  5 11:55 ⭐️ src
-rw-------@  1 paulchess  staff   379 Jan  5 11:11 tsconfig.json
```

> ✅ 显示隐藏文件，星标项目正确标记

---

### 测试 23：ls -lh（人类可读的文件大小）

```bash
./dist/cli.js -lh
```

**预期输出：**
```
total 24
-rw-r--r--@ 1 paulchess  staff   1.2K Jan  5 11:12 bun.lock
drwxr-xr-x@ 3 paulchess  staff    96B Jan  5 11:56 ⭐️ dist
drwxr-xr-x@ 6 paulchess  staff   192B Jan  5 11:12 node_modules
-rw-------@ 1 paulchess  staff   590B Jan  5 11:11 package.json
drwxr-xr-x@ 6 paulchess  staff   192B Jan  5 11:55 ⭐️ src
-rw-------@ 1 paulchess  staff   379B Jan  5 11:11 tsconfig.json
```

> ✅ 文件大小以人类可读格式显示（KB, B）

---

## 边界情况测试

### 测试 24：在没有星标项目的目录测试

```bash
cd /tmp
/Users/paulchess/Desktop/Home/github/starfinder-cli/dist/cli.js list
```

**预期输出：**
```
当前目录下没有星标项目
```

> ✅ 黄色警告提示

---

## 测试总结

### ✅ 功能测试通过列表

- [x] 默认 ls 增强行为
- [x] ls 长格式对齐（-l, -al, -lh）
- [x] 星标添加（star 命令）
- [x] 星标移除（unstar 命令）
- [x] 当前目录星标列表（list）
- [x] 全局星标列表（list -g）
- [x] 无效路径标注（灰色 + "不存在"）
- [x] 清理无效路径（clean 命令）
- [x] 错误处理：
  - [x] 路径不存在
  - [x] 重复添加星标
  - [x] 移除未星标路径
- [x] 空状态处理：
  - [x] 无星标项目
  - [x] 无需清理
- [x] 边界情况：
  - [x] 在其他目录使用命令
  - [x] 多个星标同时显示

### 配置文件验证

配置文件位置：`~/.starfindrc`

**最终状态示例：**
```json
{
  "version": "1.0",
  "starred": [
    "/Users/paulchess/Desktop/Home/github/starfinder-cli/src",
    "/Users/paulchess/Desktop/Home/github/starfinder-cli/dist"
  ]
}
```

### 颜色输出验证

- ✅ 成功消息：绿色
- ✅ 错误消息：红色
- ✅ 警告消息：黄色
- ✅ 信息消息：灰色（不存在的路径）

---

## 快速验证脚本

可以使用以下脚本快速验证所有功能：

```bash
#!/bin/bash

echo "=== 测试 starfind CLI ==="

# 清空配置文件
rm -f ~/.starfindrc

# 测试基础功能
./dist/cli.js
./dist/cli.js star ./src
./dist/cli.js
./dist/cli.js -l

# 测试 list 命令
./dist/cli.js list
./dist/cli.js list -g

# 测试多星标
./dist/cli.js star ./dist
./dist/cli.js

# 测试 unstar
./dist/cli.js unstar ./dist
./dist/cli.js

# 测试错误处理
./dist/cli.js star /tmp/non-existent || echo "✅ 错误处理正常"
./dist/cli.js star ./src || echo "✅ 重复添加检测正常"

# 测试 clean
echo '{"version":"1.0","starred":["/tmp/test-path"]}' > ~/.starfindrc
./dist/cli.js clean

echo "=== 所有测试完成 ==="
```

---

## 已知问题

暂无

---

## 测试日期

2026-01-05

## 测试通过率

**24/24** 测试通过 ✅ (100%)
