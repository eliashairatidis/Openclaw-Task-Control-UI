import { RedisClientType, createClient } from 'redis';

const host = process.env.REDIS_HOST ?? 'localhost';
const port = Number(process.env.REDIS_PORT ?? 6379);
const db = Number(process.env.REDIS_DB ?? 0);
const password = process.env.REDIS_PASSWORD;

const redisUrl = password
  ? `redis://:${password}@${host}:${port}/${db}`
  : `redis://${host}:${port}/${db}`;

export const redisClient: RedisClientType = createClient({
  url: redisUrl,
});

redisClient.on('error', (error: Error) => {
  // eslint-disable-next-line no-console
  console.error('Redis error', error.message);
});

export const connectRedis = async (): Promise<void> => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
};
