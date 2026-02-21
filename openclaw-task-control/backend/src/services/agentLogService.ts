import { AgentLog } from '../entities';
import { createId, store } from './store';

export const agentLogService = {
  listByAgent(agentId: string): AgentLog[] {
    return Array.from(store.agentLogs.values()).filter((log) => log.agentId === agentId);
  },

  create(entry: Omit<AgentLog, 'id' | 'createdAt'>): AgentLog {
    const log: AgentLog = {
      ...entry,
      id: createId(),
      createdAt: new Date(),
    };

    store.agentLogs.set(log.id, log);
    return log;
  },
};
