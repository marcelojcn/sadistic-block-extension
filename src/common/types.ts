export interface Tab {
  id?: number;
  url?: string;
}

export interface BlockedUrl {
  domain: string;
  deleteAt?: Date;
  createdAt: Date;
}
