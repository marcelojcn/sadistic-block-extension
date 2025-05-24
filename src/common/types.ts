export interface Tab {
  id?: number;
  url?: string;
}

export interface BlockedUrlOptions {
  detox?: boolean;
  onlyToday?: boolean;
  easyRemoval?: boolean;
}

export interface BlockedUrl {
  domain: string;
  options?: BlockedUrlOptions;
  createdAt: Date;
}
