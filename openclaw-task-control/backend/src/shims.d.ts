declare var process: any;

declare module 'cors' {
  const cors: any;
  export default cors;
}

declare module 'http' {
  export const createServer: any;
  export class Server {}
}

declare module 'crypto' {
  const crypto: any;
  export default crypto;
}

declare module 'express' {
  export interface Request {
    params: Record<string, string | undefined>;
    body: any;
    query: Record<string, string | number | undefined>;
    headers: Record<string, string | undefined>;
  }
  export interface Response {
    status: (code: number) => Response;
    json: (body: unknown) => Response;
    send: (body?: unknown) => Response;
  }
  export type NextFunction = () => void;
  export type ErrorRequestHandler = (...args: any[]) => unknown;
  export function Router(): any;
  const express: any;
  export default express;
}

declare module 'jsonwebtoken' {
  export const sign: any;
  export const verify: any;
}

declare module 'ws' {
  export default class WebSocket {
    static OPEN: number;
    readyState: number;
    send(data: string): void;
  }
  export class WebSocketServer {
    clients: Set<WebSocket>;
    constructor(options: unknown);
    on(event: string, cb: (...args: any[]) => void): void;
  }
}

declare module 'redis' {
  export type RedisClientType = any;
  export const createClient: any;
}

declare module 'typeorm' {
  export class DataSource {
    constructor(options: unknown);
    isInitialized: boolean;
    initialize(): Promise<void>;
  }

  export const Entity: any;
  export const Column: any;
  export const PrimaryGeneratedColumn: any;
  export const CreateDateColumn: any;
  export const UpdateDateColumn: any;
  export const OneToMany: any;
  export const ManyToOne: any;
  export const JoinColumn: any;
}
