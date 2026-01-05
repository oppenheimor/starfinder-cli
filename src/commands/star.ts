import { validatePath } from '../utils/path-resolver.js';
import { addStarredPath, isStarred } from '../utils/config.js';
import * as logger from '../utils/logger.js';

export function star(path: string): void {
  // 验证路径
  const result = validatePath(path);

  if (!result.exists) {
    logger.error(`路径不存在: ${result.absolutePath}`);
    process.exit(1);
  }

  // 检查是否已经星标
  if (isStarred(result.absolutePath)) {
    logger.error(`该路径已被星标: ${result.absolutePath}`);
    process.exit(1);
  }

  // 添加星标
  addStarredPath(result.absolutePath);
  logger.success(`已添加星标: ${result.absolutePath}`);
}
