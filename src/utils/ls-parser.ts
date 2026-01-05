import { execSync } from 'child_process';
import { join } from 'path';
import { isStarred } from './config.js';

const STAR_EMOJI = '⭐️';

/**
 * 执行 ls 命令并获取输出
 */
export function executeLs(args: string[] = [], cwd: string = process.cwd()): string {
  try {
    const command = `ls ${args.join(' ')}`;
    const output = execSync(command, {
      cwd,
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    return output;
  } catch (error: any) {
    // ls 可能返回非零退出码（如没有文件），但仍有输出
    if (error.stdout) {
      return error.stdout;
    }
    throw error;
  }
}

/**
 * 从 ls 输出行中提取文件名
 * ls -l 格式: permissions links owner group size date time filename
 */
export function extractFilename(line: string, isLongFormat: boolean): string | null {
  if (!line.trim()) {
    return null;
  }

  // 跳过 total 行
  if (line.startsWith('total ')) {
    return null;
  }

  if (isLongFormat) {
    // ls -l 格式：分割后取最后一部分
    // 示例: drwxr-xr-x  5 user  staff   160 Jan  5 10:30 my-app
    const parts = line.split(/\s+/);
    if (parts.length < 9) {
      return null;
    }
    // 文件名是最后一个字段（可能包含空格，需要重新拼接）
    const filename = parts.slice(8).join(' ');
    return filename;
  } else {
    // 简单格式：直接返回整行（去除前后空格）
    return line.trim();
  }
}

/**
 * 增强 ls 输出，在星标项目前添加 emoji
 */
export function enhanceLsOutput(
  output: string,
  isLongFormat: boolean,
  cwd: string = process.cwd()
): string {
  const lines = output.split('\n');
  const enhancedLines = lines.map(line => {
    const filename = extractFilename(line, isLongFormat);
    if (!filename) {
      return line;
    }

    // 构建绝对路径
    const absolutePath = join(cwd, filename);

    // 检查是否星标
    if (isStarred(absolutePath)) {
      if (isLongFormat) {
        // 在文件名前插入 emoji，保持原始对齐
        // 找到文件名在原始行中的位置
        const filenameIndex = line.lastIndexOf(filename);
        if (filenameIndex !== -1) {
          const before = line.substring(0, filenameIndex);
          const after = line.substring(filenameIndex + filename.length);
          return `${before}${STAR_EMOJI} ${filename}${after}`;
        }
        return line;
      } else {
        // 简单格式：直接在前面加 emoji
        return `${STAR_EMOJI} ${line}`;
      }
    }

    return line;
  });

  return enhancedLines.join('\n');
}

/**
 * 检查参数是否包含长格式标志
 */
export function isLongFormatArgs(args: string[]): boolean {
  return args.some(arg => arg.includes('l'));
}

/**
 * 过滤 ls 输出，仅保留星标项目
 */
export function filterStarredItems(
  output: string,
  isLongFormat: boolean,
  cwd: string = process.cwd()
): string {
  const lines = output.split('\n');
  const filteredLines = lines.filter(line => {
    // 保留 total 行
    if (line.startsWith('total ')) {
      return true;
    }

    const filename = extractFilename(line, isLongFormat);
    if (!filename) {
      return false;
    }

    const absolutePath = join(cwd, filename);
    return isStarred(absolutePath);
  });

  // 如果只剩下 total 行，返回空
  if (filteredLines.length === 1 && filteredLines[0].startsWith('total ')) {
    return '';
  }

  return enhanceLsOutput(filteredLines.join('\n'), isLongFormat, cwd);
}
