export interface Room {
  id: string;
  magnet?: string;
  createdAt: Date;
  movie?: string;
  filename?: string;
  downloadedProg?: number;
  reencodedProg?: number;
  downloaded?: boolean;
  downloadedAt?: Date;
  position: number;
  syncedAt: Date;
}
