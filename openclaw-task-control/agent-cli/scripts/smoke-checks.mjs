import { spawnSync } from 'node:child_process';
import path from 'node:path';

const cliPath = path.resolve(process.cwd(), 'bin', 'agent-cli');

const checks = [
  {
    name: 'help command',
    args: [],
    expectedExitCode: 0,
    expectedOutput: 'agent-cli commands:',
    stream: 'stdout',
  },
  {
    name: 'explicit help command',
    args: ['help'],
    expectedExitCode: 0,
    expectedOutput: 'Environment:',
    stream: 'stdout',
  },
  {
    name: 'unknown command handling',
    args: ['unknown-command'],
    expectedExitCode: 2,
    expectedOutput: 'Unknown command',
    stream: 'stderr',
  },
];

for (const check of checks) {
  const result = spawnSync(cliPath, check.args, {
    encoding: 'utf8',
    env: {
      ...process.env,
      AGENT_ID: process.env.AGENT_ID ?? 'agent-smoke',
      SERVER_URL: process.env.SERVER_URL ?? 'http://127.0.0.1:3001',
    },
  });

  if (result.status !== check.expectedExitCode) {
    console.error(
      `[smoke:${check.name}] expected exit ${check.expectedExitCode}, got ${result.status}.\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`,
    );
    process.exit(1);
  }

  const output = check.stream === 'stderr' ? result.stderr : result.stdout;
  if (!output.includes(check.expectedOutput)) {
    console.error(
      `[smoke:${check.name}] expected ${check.stream} to include "${check.expectedOutput}".\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`,
    );
    process.exit(1);
  }

  console.log(`[smoke:${check.name}] ok`);
}
