export interface Room {
  id: string;
  magnet: string;
  createdAt: Date;
  movie?: string;
  downloaded?: boolean;
  downloadedAt?: Date;
  position: number;
}
