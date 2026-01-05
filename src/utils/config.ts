import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { homedir } from 'os';
import { join, dirname } from 'path';
import type { StarfinderConfig } from '../types/index.js';

const CONFIG_FILE = join(homedir(), '.starfindrc');
const CONFIG_VERSION = '1.0';

/**
 * 获取配置文件路径
 */
export function getConfigPath(): string {
  return CONFIG_FILE;
}

/**
 * 读取配置文件
 */
export function readConfig(): StarfinderConfig {
  if (!existsSync(CONFIG_FILE)) {
    return {
      version: CONFIG_VERSION,
      starred: [],
    };
  }

  try {
    const content = readFileSync(CONFIG_FILE, 'utf-8');
    const config = JSON.parse(content) as StarfinderConfig;

    // 确保配置格式正确
    if (!config.starred || !Array.isArray(config.starred)) {
      return {
        version: CONFIG_VERSION,
        starred: [],
      };
    }

    return config;
  } catch (error) {
    console.error('读取配置文件失败，使用空配置:', error);
    return {
      version: CONFIG_VERSION,
      starred: [],
    };
  }
}

/**
 * 写入配置文件
 */
export function writeConfig(config: StarfinderConfig): void {
  try {
    const dir = dirname(CONFIG_FILE);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
  } catch (error) {
    throw new Error(`写入配置文件失败: ${error}`);
  }
}

/**
 * 添加星标路径
 */
export function addStarredPath(path: string): boolean {
  const config = readConfig();

  if (config.starred.includes(path)) {
    return false; // 已存在
  }

  config.starred.push(path);
  writeConfig(config);
  return true;
}

/**
 * 移除星标路径
 */
export function removeStarredPath(path: string): boolean {
  const config = readConfig();
  const index = config.starred.indexOf(path);

  if (index === -1) {
    return false; // 不存在
  }

  config.starred.splice(index, 1);
  writeConfig(config);
  return true;
}

/**
 * 检查路径是否已星标
 */
export function isStarred(path: string): boolean {
  const config = readConfig();
  return config.starred.includes(path);
}

/**
 * 获取所有星标路径
 */
export function getAllStarredPaths(): string[] {
  const config = readConfig();
  return [...config.starred].sort();
}

/**
 * 移除无效的星标路径
 */
export function cleanInvalidPaths(): string[] {
  const config = readConfig();
  const invalidPaths: string[] = [];

  config.starred = config.starred.filter(path => {
    if (!existsSync(path)) {
      invalidPaths.push(path);
      return false;
    }
    return true;
  });

  if (invalidPaths.length > 0) {
    writeConfig(config);
  }

  return invalidPaths;
}
