import 'reflect-metadata';
import { DataSource } from 'typeorm';
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

const port = Number(process.env.DB_PORT ?? 5432);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port,
  username: process.env.DB_USER ?? 'openclaw',
  password: process.env.DB_PASSWORD ?? 'openclaw',
  database: process.env.DB_NAME ?? 'openclaw_task_control',
  entities: [User, Task, TaskDependency, Comment, ActivityLog, AgentLog, FileRecord, AgentStatus],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
});

export const connectDatabase = async (): Promise<void> => {
  if (AppDataSource.isInitialized) {
    return;
  }

  await AppDataSource.initialize();
};
