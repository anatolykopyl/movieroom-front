export interface Room {
  id: string;
  magnet: string;
  createdAt: Date;
  movie?: string;
  filename?: string;
  downloaded?: boolean;
  downloadedAt?: Date;
  position: number;
  syncedAt: Date;
}
