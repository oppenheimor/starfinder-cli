#!/usr/bin/env node

import { Command } from 'commander';
import { star } from './commands/star.js';
import { unstar } from './commands/unstar.js';
import { listGlobal, listLocal } from './commands/list.js';
import { clean } from './commands/clean.js';
import { defaultList } from './commands/default.js';

const program = new Command();

program
  .name('starfind')
  .description('A CLI tool to star and quickly find your favorite projects')
  .version('0.1.0');

// star 命令
program
  .command('star <path>')
  .description('为指定路径添加星标')
  .action((path: string) => {
    star(path);
  });

// unstar 命令
program
  .command('unstar <path>')
  .description('移除指定路径的星标')
  .action((path: string) => {
    unstar(path);
  });

// list 命令
program
  .command('list')
  .description('列出当前目录下已星标的项目')
  .option('-g, --global', '列出全局所有已星标的项目')
  .allowUnknownOption() // 允许传递 ls 参数
  .action((options, command) => {
    if (options.global) {
      listGlobal();
    } else {
      // 获取所有未被识别的参数（ls 参数）
      const lsArgs = command.args || [];
      listLocal(lsArgs);
    }
  });

// clean 命令
program
  .command('clean')
  .description('清理不存在的星标路径')
  .action(() => {
    clean();
  });

// 默认行为：增强版 ls
if (process.argv.length === 2 ||
    (process.argv.length > 2 && process.argv[2].startsWith('-'))) {
  // 如果没有子命令或者第一个参数是 flag，执行默认 ls 行为
  const args = process.argv.slice(2);
  defaultList(args);
} else {
  // 解析命令
  program.parse(process.argv);
}
