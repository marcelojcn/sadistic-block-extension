export interface Tab {
  id?: number;
  url?: string;
}

export enum BlockedUrlOptions {
  DETOX = "detox",
  ONLY_TODAY = "onlyToday",
  EASY_REMOVAL = "easyRemoval",
  STRICT = "strict",
}

export interface BlockedUrl {
  domain: string;
  option?: BlockedUrlOptions;
  createdAt: number;
}
