"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentClient = void 0;
class AgentClient {
    config;
    baseUrl;
    constructor(config) {
        this.config = config;
        this.baseUrl = new URL(config.serverUrl);
    }
    async request(path, init = {}) {
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
            return undefined;
        }
        return (await response.json());
    }
    listTasks() {
        return this.request('/api/tasks');
    }
    getTask(taskId) {
        return this.request(`/api/tasks/${taskId}`);
    }
    listAgentStatuses() {
        return this.request('/api/agents/status');
    }
    updateStatus(agentId, payload) {
        return this.request(`/api/agents/${agentId}/status`, {
            method: 'PUT',
            body: JSON.stringify(payload),
        });
    }
    createLog(agentId, payload) {
        return this.request(`/api/agents/${agentId}/logs`, {
            method: 'POST',
            body: JSON.stringify(payload),
        });
    }
    createFile(payload) {
        return this.request('/api/files', {
            method: 'POST',
            body: JSON.stringify(payload),
        });
    }
    connectWebSocket(onMessage) {
        const wsUrl = new URL('/ws', this.baseUrl);
        wsUrl.protocol = wsUrl.protocol === 'https:' ? 'wss:' : 'ws:';
        const socket = new WebSocket(wsUrl.toString());
        socket.addEventListener('message', (event) => {
            onMessage(typeof event.data === 'string' ? event.data : String(event.data));
        });
        return socket;
    }
}
exports.AgentClient = AgentClient;
