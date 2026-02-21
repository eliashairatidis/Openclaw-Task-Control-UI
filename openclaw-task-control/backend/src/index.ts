import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import http from 'http';
import { connectDatabase } from './config/database';
import { connectRedis } from './config/redis';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import activityLogsRoutes from './routes/activityLogs';
import agentRoutes from './routes/agents';
import authRoutes from './routes/auth';
import commentsRoutes from './routes/comments';
import fileRoutes from './routes/files';
import taskRoutes from './routes/tasks';
import userRoutes from './routes/users';
import { initWebsocket } from './websocket';

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? '*',
    credentials: true,
  }),
);
app.use(express.json({ limit: '2mb' }));

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'openclaw-task-control-backend' });
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/activity-logs', activityLogsRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/files', fileRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

initWebsocket(server);

const port = Number(process.env.PORT ?? 3001);

const start = async () => {
  await connectDatabase();
  await connectRedis();

  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Backend listening on :${port}`);
  });
};

void start();
