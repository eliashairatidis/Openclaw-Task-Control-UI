export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  AGENT = 'agent',
  USER = 'user',
}

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  BLOCKED = 'blocked',
  DONE = 'done',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

export enum ActivityType {
  TASK_CREATED = 'task_created',
  TASK_UPDATED = 'task_updated',
  TASK_ASSIGNED = 'task_assigned',
  TASK_STATUS_CHANGED = 'task_status_changed',
  COMMENT_CREATED = 'comment_created',
  FILE_UPLOADED = 'file_uploaded',
  USER_CREATED = 'user_created',
  AGENT_STATUS_UPDATED = 'agent_status_updated',
}

export enum AgentState {
  OFFLINE = 'offline',
  ONLINE = 'online',
  BUSY = 'busy',
  ERROR = 'error',
}

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}

export interface AuthTokens {
  accessToken: string;
  tokenType: 'Bearer';
  expiresIn: number;
}

export interface PaginationQuery {
  page?: number;
  pageSize?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  assigneeId?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  dueDate?: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  assigneeId?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  dueDate?: string;
}

export interface CreateCommentDto {
  taskId: string;
  body: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  role?: UserRole;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface ApiError {
  status: number;
  message: string;
  details?: unknown;
}
