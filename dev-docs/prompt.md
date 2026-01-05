# starfinder-cli 项目开发需求

## 项目概述

* 项目名称: starfinder-cli
* 技术栈: Bun.js + TypeScript
* 项目类型: 命令行工具（CLI）
* 核心价值: 增强版 ls 命令，支持星标标记常用项目，提升项目检索效率

## 问题场景

作为一名开发者，我在终端中使用 ls 或 ls -al 等命令查看项目时，面临以下痛点：

1. 项目数量过多：本地存在数百个项目目录；
2. 检索效率低：大部分项目不常用但不能删除，导致查找效率低下；
3. 缺乏优先级标记：无法在列表中快速识别常用项目

## 预期解决方案：
- 用一个新的命令继承 ls，保留 ls 的所有原生功能；
- 为常用项目添加星标标记（⭐️）；
- 在列表输出时直观展示星标项目

## 功能需求

1. starfind (默认行为 - 增强版 ls)

功能: 列出当前目录内容，并在星标项目前显示 ⭐️

继承 ls 原生能力:
  - 支持所有 ls 常用参数：-a, -l, -al, -lh, -t, -r 等
  - 保持原生 ls 的输出格式和颜色
  - 支持通配符和路径参数

增强功能:
  - 检查当前目录下每个项目/文件是否被星标
  - 在被星标的项目名称前添加 ⭐️ 标记

输出示例:
  # starfind
  ⭐️ my-app/
     old-project/
  ⭐️ important-lib/
     temp-files/
     README.md

  # starfind -l
  total 20
  drwxr-xr-x  5 user  staff   160 Jan  5 10:30 ⭐️ my-app
  drwxr-xr-x  3 user  staff    96 Dec 15 14:20    old-project
  drwxr-xr-x  8 user  staff   256 Jan  4 09:15 ⭐️ important-lib
  drwxr-xr-x  2 user  staff    64 Jan  1 08:00    temp-files
  -rw-r--r--  1 user  staff  1234 Dec 20 11:30    README.md

  # starfind -al
  total 24
  drwxr-xr-x  7 user  staff   224 Jan  5 10:30 .
  drwxr-xr-x 15 user  staff   480 Jan  3 12:00 ..
  drwxr-xr-x  5 user  staff   160 Jan  5 10:30 ⭐️ my-app
  drwxr-xr-x  3 user  staff    96 Dec 15 14:20    old-project
  drwxr-xr-x  8 user  staff   256 Jan  4 09:15 ⭐️ important-lib
  drwxr-xr-x  2 user  staff    64 Jan  1 08:00    temp-files
  -rw-r--r--  1 user  staff  1234 Dec 20 11:30    README.md

实现要求:
  - 使用子进程调用系统原生 ls 命令获取输出
  - 解析 ls 输出，识别文件/目录名
  - 对比配置文件中的星标路径
  - 在匹配项前插入 ⭐️ 标记
  - 保持原始输出的颜色、格式和对齐

2. starfind star <path>

功能: 为指定路径添加星标

输入规范:
  - 支持绝对路径：/Users/username/projects/my-app
  - 支持相对路径：./my-app、../parent/project、subfolder/project
  - 支持当前目录：.

行为要求:
  - 自动将输入路径解析为绝对路径
  - 路径去重：同一绝对路径仅存储一次
  - 验证路径存在性：如果路径不存在，给出错误提示
  - 持久化存储到 ~/.starfindrc

输出示例:
  已添加星标: /Users/username/projects/my-app（用绿色展示文案）

  # 错误情况
  路径不存在: /Users/username/projects/nonexistent（用红色展示文案）
  不支持为文件添加星标: /Users/username/projects/README.md（用红色展示文案）
  该路径已被星标: /Users/username/projects/my-app（用红色展示文案）

3. starfind unstar <path>

功能: 移除指定路径的星标

输入规范: 同 star 命令

行为要求:
  - 解析为绝对路径后进行匹配删除
  - 如果路径未被星标，给出友好提示

输出示例:
  已移除星标: /Users/username/projects/my-app（用绿色展示文案）
  路径未被星标: /Users/username/projects/old-project（用红色展示文案）

4. starfind list

功能: 执行 ls 命令，但仅显示当前目录下已星标的项目

继承 ls 参数:
  - 支持 -l, -a, -lh 等常用参数
  - 保持 ls 原生输出格式

过滤逻辑:
  1. 调用原生 ls [args] 获取当前目录所有内容
  2. 解析输出，提取文件/目录名
  3. 过滤出已星标的项目
  4. 保持原始格式输出（包含 ⭐️ 标记）

输出示例:
  # starfind list
  ⭐️ my-app/
  ⭐️ important-lib/

  # starfind list -l
  total 8
  drwxr-xr-x  5 user  staff   160 Jan  5 10:30 ⭐️ my-app
  drwxr-xr-x  8 user  staff   256 Jan  4 09:15 ⭐️ important-lib

  # starfind list -lh
  total 8
  drwxr-xr-x  5 user  staff   160B Jan  5 10:30 ⭐️ my-app
  drwxr-xr-x  8 user  staff   256B Jan  4 09:15 ⭐️ important-lib

  # 如果当前目录没有星标项目
  starfind list
  当前目录下没有星标项目（用黄色展示文案）

5. starfind list -g

  功能: 列出全局所有已星标的项目

  行为要求:
  - 显示所有星标项目（不受当前目录限制）
  - 按路径字母顺序排序
  - 显示绝对路径

  输出示例:
  ⭐️ 全局星标项目 (5):
    /Users/username/projects/my-app
    /Users/username/projects/another-app
    /Users/username/work/client-project
    /Users/username/personal/side-project
    /opt/tools/dev-tools

  # 如果没有星标项目
  ⭐️ 全局星标项目 (0):
  还没有添加任何星标项目（用黄色展示文案）