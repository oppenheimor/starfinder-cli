import { existsSync } from 'fs';
import { getAllStarredPaths } from '../utils/config.js';
import { executeLs, filterStarredItems, isLongFormatArgs } from '../utils/ls-parser.js';
import * as logger from '../utils/logger.js';

/**
 * 显示全局所有星标项目
 */
export function listGlobal(): void {
  const starredPaths = getAllStarredPaths();

  if (starredPaths.length === 0) {
    logger.log(`${logger.STAR} 全局星标项目 (0):`);
    logger.warning('还没有添加任何星标项目');
    return;
  }

  logger.log(`${logger.STAR} 全局星标项目 (${starredPaths.length}):`);
  starredPaths.forEach(path => {
    const exists = existsSync(path);
    if (exists) {
      logger.log(`  ${path}`);
    } else {
      logger.info(`  ${path} (不存在)`);
    }
  });
}

/**
 * 显示当前目录下的星标项目
 */
export function listLocal(args: string[] = []): void {
  const cwd = process.cwd();
  const isLongFormat = isLongFormatArgs(args);

  try {
    // 执行 ls 命令
    const output = executeLs(args, cwd);

    // 过滤星标项目
    const filtered = filterStarredItems(output, isLongFormat, cwd);

    if (!filtered.trim()) {
      logger.warning('当前目录下没有星标项目');
      return;
    }

    logger.log(filtered);
  } catch (error: any) {
    logger.error(`执行 ls 命令失败: ${error.message}`);
    process.exit(1);
  }
}
