import { AgentStatus } from '../entities';
import { AgentState } from '../types';
import { createId, store } from './store';

export const agentStatusService = {
  list(): AgentStatus[] {
    return Array.from(store.agentStatuses.values());
  },

  findByAgentId(agentId: string): AgentStatus | undefined {
    return Array.from(store.agentStatuses.values()).find((status) => status.agentId === agentId);
  },

  upsert(agentId: string, payload: Partial<Omit<AgentStatus, 'id' | 'agentId'>>): AgentStatus {
    const existing = this.findByAgentId(agentId);
    const next: AgentStatus = {
      id: existing?.id ?? createId(),
      agentId,
      state: payload.state ?? existing?.state ?? AgentState.OFFLINE,
      lastHeartbeatAt: payload.lastHeartbeatAt ?? new Date(),
      activeTaskId: payload.activeTaskId ?? existing?.activeTaskId,
      details: payload.details ?? existing?.details,
      updatedAt: new Date(),
    };

    store.agentStatuses.set(next.id, next);
    return next;
  },
};
