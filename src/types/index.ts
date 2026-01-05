export interface StarfinderConfig {
  version: string;
  starred: string[];
}

export interface PathValidationResult {
  valid: boolean;
  absolutePath: string;
  exists: boolean;
  error?: string;
}

export interface StarredItemDisplay {
  path: string;
  exists: boolean;
}
