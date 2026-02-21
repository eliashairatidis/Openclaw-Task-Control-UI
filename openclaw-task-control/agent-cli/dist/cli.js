"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
var ExitCode;
(function (ExitCode) {
    ExitCode[ExitCode["Success"] = 0] = "Success";
    ExitCode[ExitCode["NoTask"] = 1] = "NoTask";
    ExitCode[ExitCode["Error"] = 2] = "Error";
})(ExitCode || (ExitCode = {}));
const parseArgs = (argv) => {
    const positional = [];
    const flags = {};
    for (let i = 0; i < argv.length; i += 1) {
        const token = argv[i];
        if (token.startsWith('--')) {
            const key = token.slice(2);
            const next = argv[i + 1];
            if (!next || next.startsWith('--')) {
                flags[key] = true;
            }
            else {
                flags[key] = next;
                i += 1;
            }
            continue;
        }
        positional.push(token);
    }
    return { _: positional, flags };
};
const getEnv = () => {
    const serverUrl = process.env.SERVER_URL ?? 'http://localhost:3001';
    const apiKey = process.env.AGENT_API_KEY;
    const agentId = process.env.AGENT_ID;
    return { serverUrl, apiKey, agentId };
};
const asString = (value, fallback) => {
    if (typeof value === 'string') {
        return value;
    }
    return fallback;
};
const requireAgentId = (agentId) => {
    if (!agentId) {
        throw new Error('AGENT_ID is required for this command.');
    }
    return agentId;
};
const printHelp = () => {
    console.log(`agent-cli commands:
  start                 Connect to /ws and print events
  task [--id TASK_ID]   Fetch a specific task or your next assigned task
  log --level L --message M [--json JSON]
  file --name N --mime M --size S --path P [--task TASK_ID]
  heartbeat [--status online] [--task TASK_ID]
  status [--set STATUS] [--task TASK_ID]

Environment:
  AGENT_API_KEY  Optional bearer token
  AGENT_ID       Agent identifier used by agent endpoints
  SERVER_URL     Base backend URL (default: http://localhost:3001)
Exit codes: 0=success, 1=no task, 2=error`);
};
const run = async () => {
    const parsed = parseArgs(process.argv.slice(2));
    const command = parsed._[0];
    if (!command || command === 'help' || command === '--help') {
        printHelp();
        process.exitCode = ExitCode.Success;
        return;
    }
    const env = getEnv();
    const client = new client_1.AgentClient({ serverUrl: env.serverUrl, apiKey: env.apiKey });
    switch (command) {
        case 'start': {
            const socket = client.connectWebSocket((raw) => console.log(raw));
            await new Promise((resolve, reject) => {
                socket.addEventListener('open', () => {
                    console.log('websocket connected');
                });
                socket.addEventListener('close', () => resolve());
                socket.addEventListener('error', () => reject(new Error('websocket error')));
            });
            return;
        }
        case 'task': {
            const taskId = asString(parsed.flags.id);
            if (taskId) {
                const task = await client.getTask(taskId);
                console.log(JSON.stringify(task, null, 2));
                return;
            }
            const agentId = requireAgentId(env.agentId);
            const taskList = await client.listTasks();
            const nextTask = taskList.items.find((task) => task.assigneeId === agentId && task.status !== 'done');
            if (!nextTask) {
                process.exitCode = ExitCode.NoTask;
                return;
            }
            console.log(JSON.stringify(nextTask, null, 2));
            return;
        }
        case 'log': {
            const agentId = requireAgentId(env.agentId);
            const level = asString(parsed.flags.level, 'info');
            const message = asString(parsed.flags.message);
            if (!message) {
                throw new Error('Missing --message for log command.');
            }
            const payloadRaw = asString(parsed.flags.json);
            const payload = payloadRaw ? JSON.parse(payloadRaw) : undefined;
            const log = await client.createLog(agentId, { level, message, payload });
            console.log(JSON.stringify(log, null, 2));
            return;
        }
        case 'file': {
            const name = asString(parsed.flags.name);
            const mime = asString(parsed.flags.mime, 'application/octet-stream');
            const size = Number(asString(parsed.flags.size, '0'));
            const storagePath = asString(parsed.flags.path);
            const taskId = asString(parsed.flags.task);
            if (!name || !storagePath || Number.isNaN(size)) {
                throw new Error('file command requires --name, --path, and numeric --size.');
            }
            const file = await client.createFile({
                fileName: name,
                mimeType: mime,
                sizeBytes: size,
                storagePath,
                taskId,
            });
            console.log(JSON.stringify(file, null, 2));
            return;
        }
        case 'heartbeat': {
            const agentId = requireAgentId(env.agentId);
            const status = asString(parsed.flags.status, 'online');
            const currentTaskId = asString(parsed.flags.task);
            const heartbeat = await client.updateStatus(agentId, {
                status,
                currentTaskId,
                metadata: { heartbeatAt: new Date().toISOString() },
            });
            console.log(JSON.stringify(heartbeat, null, 2));
            return;
        }
        case 'status': {
            const setStatus = asString(parsed.flags.set);
            const currentTaskId = asString(parsed.flags.task);
            if (setStatus) {
                const agentId = requireAgentId(env.agentId);
                const updated = await client.updateStatus(agentId, { status: setStatus, currentTaskId });
                console.log(JSON.stringify(updated, null, 2));
                return;
            }
            const statuses = await client.listAgentStatuses();
            console.log(JSON.stringify(statuses, null, 2));
            return;
        }
        default:
            throw new Error(`Unknown command: ${command}`);
    }
};
run()
    .then(() => {
    if (typeof process.exitCode !== 'number') {
        process.exitCode = ExitCode.Success;
    }
})
    .catch((error) => {
    const message = error instanceof Error ? error.message : String(error);
    console.error(message);
    process.exitCode = ExitCode.Error;
});
