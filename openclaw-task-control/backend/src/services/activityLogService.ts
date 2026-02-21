import { ActivityLog } from '../entities';
import { ActivityType, PaginationQuery } from '../types';
import { createId, paginate, store } from './store';

export const activityLogService = {
  list(query: PaginationQuery = {}) {
    const logs = Array.from(store.activityLogs.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );

    return paginate(logs, query.page, query.pageSize);
  },

  create(entry: Omit<ActivityLog, 'id' | 'createdAt'>): ActivityLog {
    const activity: ActivityLog = {
      ...entry,
      id: createId(),
      createdAt: new Date(),
    };

    store.activityLogs.set(activity.id, activity);
    return activity;
  },

  track(type: ActivityType, message: string, extras: Omit<ActivityLog, 'id' | 'createdAt' | 'type' | 'message'> = {}) {
    return this.create({
      type,
      message,
      ...extras,
    });
  },
};
