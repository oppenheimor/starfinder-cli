import { executeLs, enhanceLsOutput, isLongFormatArgs } from '../utils/ls-parser.js';
import * as logger from '../utils/logger.js';

export function defaultList(args: string[] = []): void {
  const cwd = process.cwd();
  const isLongFormat = isLongFormatArgs(args);

  try {
    // 执行原生 ls 命令
    const output = executeLs(args, cwd);

    // 增强输出（添加星标标记）
    const enhanced = enhanceLsOutput(output, isLongFormat, cwd);

    // 输出结果
    console.log(enhanced);
  } catch (error: any) {
    logger.error(`执行 ls 命令失败: ${error.message}`);
    process.exit(1);
  }
}
