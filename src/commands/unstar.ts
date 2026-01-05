import { resolveAbsolutePath } from '../utils/path-resolver.js';
import { removeStarredPath } from '../utils/config.js';
import * as logger from '../utils/logger.js';

export function unstar(path: string): void {
  // 解析为绝对路径
  const absolutePath = resolveAbsolutePath(path);

  // 尝试移除星标
  const removed = removeStarredPath(absolutePath);

  if (!removed) {
    logger.error(`路径未被星标: ${absolutePath}`);
    process.exit(1);
  }

  logger.success(`已移除星标: ${absolutePath}`);
}
