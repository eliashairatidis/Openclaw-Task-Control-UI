export interface AgentLog {
  id: string;
  agentId: string;
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  payload?: Record<string, unknown>;
  createdAt: Date;
}
