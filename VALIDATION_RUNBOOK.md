# End-to-End Validation Runbook

This runbook validates the full Openclaw Task Control flow across backend, frontend, and `agent-cli`.

## Acceptance Criteria (Success Scenario)

A validation run is successful only when all of the following are true:

1. **Services boot cleanly** and expose expected health/network endpoints.
2. **Login works** from the frontend, and user is routed to the authenticated app shell.
3. **Task claim/update works through CLI**, including fetching/identifying a task and writing an update signal (status/log/heartbeat).
4. **Real-time UI update path works**, where backend websocket/event updates are visible in the frontend without a full page reload.

---

## 1) Services Boot Verification

From repository root:

```bash
cp openclaw-task-control/.env.example openclaw-task-control/.env
cd openclaw-task-control
docker compose up --build -d
```

Check health and critical endpoints:

```bash
curl -fsS http://localhost:3001/health
curl -fsS http://localhost:3001/api/tasks
```

Expected:
- `/health` returns JSON with `"ok": true`.
- task API responds without container crash/restart loops.

---

## 2) Login Verification (Frontend)

1. Open `http://localhost:5173`.
2. Go to login screen.
3. Enter a valid test user credential/email used by your implementation.
4. Submit and verify transition into authenticated app layout.

Expected:
- Login completes without frontend runtime errors.
- User context/session is initialized.
- Protected route(s) load after login.

---

## 3) Task Claim/Update via CLI

```bash
cd openclaw-task-control/agent-cli
npm install
npm run build
export SERVER_URL="http://localhost:3001"
export AGENT_ID="agent-1"
```

Run smoke checks (command surface):

```bash
npm run smoke
```

Run operational checks against backend:

```bash
./bin/agent-cli task
./bin/agent-cli heartbeat --status busy
./bin/agent-cli log --level info --message "claimed and processing task"
```

Expected:
- CLI command parsing and exits are correct (smoke pass).
- Task lookup returns assigned task (or documented no-task exit code `1`).
- Heartbeat/log updates are accepted by backend and persisted/observable.

---

## 4) Real-Time UI Update Path

1. Keep frontend open on task board/details page.
2. Trigger backend updates from CLI (heartbeat/log/task operations).
3. Confirm UI updates in near-real-time (websocket/event driven), without manual refresh.

Expected:
- Websocket connection remains healthy.
- Task/status/activity panels reflect latest backend events.
- No stale state requiring page reload.

---

## Teardown

```bash
cd openclaw-task-control
docker compose down
```
