import chalk from 'chalk';

/**
 * 成功消息（绿色）
 */
export function success(message: string): void {
  console.log(chalk.green(message));
}

/**
 * 错误消息（红色）
 */
export function error(message: string): void {
  console.log(chalk.red(message));
}

/**
 * 警告消息（黄色）
 */
export function warning(message: string): void {
  console.log(chalk.yellow(message));
}

/**
 * 信息消息（灰色）
 */
export function info(message: string): void {
  console.log(chalk.gray(message));
}

/**
 * 普通消息
 */
export function log(message: string): void {
  console.log(message);
}

/**
 * 星标标记
 */
export const STAR = '⭐️';
