# agent-cli

CLI utility for Openclaw Task Control agents.

## Setup

```bash
cd openclaw-task-control/agent-cli
npm install
npm run build
```

Set environment variables used by the CLI:

```bash
export SERVER_URL="http://localhost:3001"
export AGENT_ID="agent-1"
export AGENT_API_KEY="<optional bearer token>"
```

## Commands

Command names map directly to backend endpoints:

- `start` -> WebSocket `/ws`
- `task` -> `GET /api/tasks` or `GET /api/tasks/:taskId`
- `log` -> `POST /api/agents/:agentId/logs`
- `file` -> `POST /api/files`
- `heartbeat` -> `PUT /api/agents/:agentId/status`
- `status` -> `GET /api/agents/status` or `PUT /api/agents/:agentId/status`

### `start`
Connect to the backend websocket stream and print incoming events.

```bash
./bin/agent-cli start
```

### `task`
Get a task by ID:

```bash
./bin/agent-cli task --id task-123
```

Get the next task assigned to `AGENT_ID` (exits with code `1` if none):

```bash
./bin/agent-cli task
```

### `log`
Send an agent log entry.

```bash
./bin/agent-cli log --level info --message "worker started"
./bin/agent-cli log --level error --message "task failed" --json '{"taskId":"task-123"}'
```

### `file`
Register a file record for a task.

```bash
./bin/agent-cli file --name output.json --mime application/json --size 145 --path s3://bucket/output.json --task task-123
```

### `heartbeat`
Publish a heartbeat status update (defaults to `online`).

```bash
./bin/agent-cli heartbeat
./bin/agent-cli heartbeat --status busy --task task-123
```

### `status`
Read all agent statuses:

```bash
./bin/agent-cli status
```

Set this agent status:

```bash
./bin/agent-cli status --set offline
```

## Exit codes

- `0` success
- `1` no task available (`task` command without `--id`)
- `2` error
