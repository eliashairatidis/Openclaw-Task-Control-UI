export interface FileRecord {
  id: string;
  taskId?: string;
  uploaderId: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  storagePath: string;
  createdAt: Date;
}
