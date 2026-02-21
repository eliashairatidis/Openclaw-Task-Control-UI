import { FileRecord } from '../entities';
import { createId, store } from './store';

interface CreateFileInput {
  uploaderId: string;
  fileName: string;
  mimeType?: string;
  sizeBytes?: number;
  storagePath: string;
  taskId?: string;
}

export const fileService = {
  list(taskId?: string): FileRecord[] {
    const records = Array.from(store.fileRecords.values());
    return taskId ? records.filter((record) => record.taskId === taskId) : records;
  },

  create(payload: CreateFileInput): FileRecord {
    const record: FileRecord = {
      id: createId(),
      uploaderId: payload.uploaderId,
      taskId: payload.taskId,
      fileName: payload.fileName,
      mimeType: payload.mimeType ?? 'application/octet-stream',
      sizeBytes: payload.sizeBytes ?? 0,
      storagePath: payload.storagePath,
      createdAt: new Date(),
    };

    store.fileRecords.set(record.id, record);
    return record;
  },
};
