export interface ClientConfig {
  serverUrl: string;
  apiKey?: string;
}

export interface AgentStatusPayload {
  status: string;
  currentTaskId?: string;
  metadata?: Record<string, unknown>;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  assigneeId?: string;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
}

interface PaginatedTasks {
  items: Task[];
  total: number;
  page: number;
  pageSize: number;
}

export class AgentClient {
  private readonly baseUrl: URL;

  constructor(private readonly config: ClientConfig) {
    this.baseUrl = new URL(config.serverUrl);
  }

  private async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const headers = new Headers(init.headers ?? {});
    headers.set('Content-Type', 'application/json');
    if (this.config.apiKey) {
      headers.set('Authorization', `Bearer ${this.config.apiKey}`);
    }

    const response = await fetch(new URL(path, this.baseUrl), { ...init, headers });
    if (!response.ok) {
      const body = await response.text();
      throw new Error(`HTTP ${response.status} ${response.statusText}: ${body}`);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return (await response.json()) as T;
  }

  listTasks(): Promise<PaginatedTasks> {
    return this.request<PaginatedTasks>('/api/tasks');
  }

  getTask(taskId: string): Promise<Task> {
    return this.request<Task>(`/api/tasks/${taskId}`);
  }

  listAgentStatuses(): Promise<unknown[]> {
    return this.request<unknown[]>('/api/agents/status');
  }

  updateStatus(agentId: string, payload: AgentStatusPayload): Promise<unknown> {
    return this.request<unknown>(`/api/agents/${agentId}/status`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  }

  createLog(agentId: string, payload: { level: string; message: string; payload?: unknown }): Promise<unknown> {
    return this.request<unknown>(`/api/agents/${agentId}/logs`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  createFile(payload: {
    fileName: string;
    mimeType: string;
    sizeBytes: number;
    storagePath: string;
    taskId?: string;
  }): Promise<unknown> {
    return this.request<unknown>('/api/files', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  connectWebSocket(onMessage: (raw: string) => void): WebSocket {
    const wsUrl = new URL('/ws', this.baseUrl);
    wsUrl.protocol = wsUrl.protocol === 'https:' ? 'wss:' : 'ws:';
    const socket = new WebSocket(wsUrl.toString());
    socket.addEventListener('message', (event) => {
      onMessage(typeof event.data === 'string' ? event.data : String(event.data));
    });
    return socket;
  }
}
