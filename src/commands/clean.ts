import { cleanInvalidPaths } from '../utils/config.js';
import * as logger from '../utils/logger.js';

export function clean(): void {
  const invalidPaths = cleanInvalidPaths();

  if (invalidPaths.length === 0) {
    logger.success('所有星标路径都有效，无需清理');
    return;
  }

  logger.success(`已清理 ${invalidPaths.length} 个无效路径:`);
  invalidPaths.forEach(path => {
    logger.info(`  ${path}`);
  });
}
