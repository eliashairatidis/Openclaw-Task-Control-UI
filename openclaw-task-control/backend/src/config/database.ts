export interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  name: string;
}

export const databaseConfig: DatabaseConfig = {
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  user: process.env.DB_USER ?? 'openclaw',
  password: process.env.DB_PASSWORD ?? 'openclaw',
  name: process.env.DB_NAME ?? 'openclaw_task_control',
};

export const connectDatabase = async (): Promise<void> => {
  // Placeholder for real DB pool bootstrap.
  if (!databaseConfig.host) {
    throw new Error('Database host is not configured');
  }
};
