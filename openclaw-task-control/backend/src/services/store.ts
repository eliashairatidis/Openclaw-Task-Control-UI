import {
  ActivityLog,
  AgentLog,
  AgentStatus,
  Comment,
  FileRecord,
  Task,
  TaskDependency,
  User,
} from '../entities';

export const store = {
  users: new Map<string, User>(),
  tasks: new Map<string, Task>(),
  taskDependencies: new Map<string, TaskDependency>(),
  comments: new Map<string, Comment>(),
  activityLogs: new Map<string, ActivityLog>(),
  agentLogs: new Map<string, AgentLog>(),
  fileRecords: new Map<string, FileRecord>(),
  agentStatuses: new Map<string, AgentStatus>(),
};

export const createId = (): string =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

export const paginate = <T>(items: T[], page = 1, pageSize = 20) => {
  const start = (page - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    total: items.length,
    page,
    pageSize,
  };
};
