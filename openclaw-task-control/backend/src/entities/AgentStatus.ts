import { AgentState } from '../types';

export interface AgentStatus {
  id: string;
  agentId: string;
  state: AgentState;
  lastHeartbeatAt: Date;
  activeTaskId?: string;
  details?: Record<string, unknown>;
  updatedAt: Date;
}
