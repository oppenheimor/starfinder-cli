import { resolve, isAbsolute, join } from 'path';
import { existsSync } from 'fs';
import type { PathValidationResult } from '../types/index.js';

/**
 * 解析路径为绝对路径
 */
export function resolveAbsolutePath(inputPath: string, cwd: string = process.cwd()): string {
  if (isAbsolute(inputPath)) {
    return inputPath;
  }
  return resolve(cwd, inputPath);
}

/**
 * 验证路径
 */
export function validatePath(inputPath: string, cwd: string = process.cwd()): PathValidationResult {
  const absolutePath = resolveAbsolutePath(inputPath, cwd);
  const exists = existsSync(absolutePath);

  if (!exists) {
    return {
      valid: false,
      absolutePath,
      exists: false,
      error: '路径不存在',
    };
  }

  return {
    valid: true,
    absolutePath,
    exists: true,
  };
}

/**
 * 检查路径是否在当前目录下
 */
export function isInCurrentDirectory(absolutePath: string, cwd: string = process.cwd()): boolean {
  const normalizedCwd = resolve(cwd);
  const normalizedPath = resolve(absolutePath);

  // 检查路径的父目录是否是当前目录
  return normalizedPath.startsWith(normalizedCwd + '/') || normalizedPath === normalizedCwd;
}

/**
 * 获取当前目录下所有项目的绝对路径
 */
export function getCurrentDirectoryItems(cwd: string = process.cwd()): string[] {
  return [cwd];
}
