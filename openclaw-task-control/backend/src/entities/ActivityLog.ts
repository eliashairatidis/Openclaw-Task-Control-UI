import { ActivityType } from '../types';

export interface ActivityLog {
  id: string;
  userId?: string;
  taskId?: string;
  type: ActivityType;
  message: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}
