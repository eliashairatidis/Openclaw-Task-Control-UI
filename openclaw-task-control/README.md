# OpenClaw Task Control

This repository is currently a scaffold for the OpenClaw Task Control project.

## Current State

- Backend source folders and file paths are present under `backend/src/`.
- Database, Docker, Kubernetes, docs, and agent CLI directories are present.
- Files are currently placeholders and need implementation content.

## Project Structure

```
openclaw-task-control/
├── .env.example
├── PROJECT_SUMMARY.md
├── README.md
├── agent-cli/
│   ├── .gitkeep
│   └── README.md
├── backend/
│   └── src/
│       ├── index.ts
│       ├── config/
│       │   ├── database.ts
│       │   └── redis.ts
│       ├── entities/
│       │   ├── User.ts
│       │   ├── Task.ts
│       │   ├── TaskDependency.ts
│       │   ├── Comment.ts
│       │   ├── ActivityLog.ts
│       │   ├── AgentLog.ts
│       │   ├── FileRecord.ts
│       │   ├── AgentStatus.ts
│       │   └── index.ts
│       ├── controllers/
│       │   ├── authController.ts
│       │   ├── taskController.ts
│       │   ├── userController.ts
│       │   ├── commentController.ts
│       │   ├── activityLogController.ts
│       │   ├── agentController.ts
│       │   └── fileController.ts
│       ├── services/
│       │   ├── taskService.ts
│       │   ├── userService.ts
│       │   ├── activityLogService.ts
│       │   ├── commentService.ts
│       │   ├── agentLogService.ts
│       │   ├── agentStatusService.ts
│       │   ├── fileService.ts
│       │   ├── taskDependencyService.ts
│       │   └── index.ts
│       ├── routes/
│       │   ├── auth.ts
│       │   ├── tasks.ts
│       │   ├── users.ts
│       │   ├── comments.ts
│       │   ├── activityLogs.ts
│       │   ├── agents.ts
│       │   └── files.ts
│       ├── middleware/
│       │   ├── auth.ts
│       │   ├── errorHandler.ts
│       │   └── validation.ts
│       ├── types/
│       │   └── index.ts
│       ├── websocket/
│       │   └── index.ts
│       └── seed/
│           └── index.ts
├── database/
│   └── schema.sql
├── docker/
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   └── nginx.conf
├── docs/
│   └── agent-integration.md
└── k8s/
    ├── namespace.yaml
    ├── postgres.yaml
    ├── redis.yaml
    ├── backend.yaml
    ├── frontend.yaml
    └── agent.yaml
```
