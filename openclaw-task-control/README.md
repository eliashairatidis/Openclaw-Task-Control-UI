# OpenClaw Task Control

A comprehensive task visibility and agent observability dashboard designed specifically for OpenClaw agentic workflows running in Kubernetes.

![OpenClaw Task Control](docs/screenshot.png)

## Features

### Core Functionality

- **Kanban Task Board**: Drag-and-drop task management with Planning, In Progress, and Done columns
- **Task Detail View**: Rich descriptions, dependencies graph, comments, activity history, and agent execution logs
- **Workspace Explorer**: File tree viewer with syntax-highlighted code preview
- **Agent Activity Dashboard**: Real-time agent status, heartbeat monitoring, and resource metrics
- **User Management**: Role-based access control (Admin, Developer, Viewer)
- **Real-time Updates**: WebSocket-powered live updates for tasks, logs, and agent status

### Agent Integration

- **Heartbeat Protocol**: Agents report status, resources, and current task
- **Task Queue**: Automatic task assignment to available agents
- **Log Streaming**: Real-time agent execution logs
- **File Upload**: Agents can upload deliverables and artifacts
- **API Key Authentication**: Secure agent authentication

## Tech Stack

### Frontend
- React 19 + TypeScript
- Vite for build tooling
- Tailwind CSS + shadcn/ui components
- React Router for navigation
- @hello-pangea/dnd for drag-and-drop
- Axios for API communication

### Backend
- Node.js + Express + TypeScript
- TypeORM for database management
- PostgreSQL for data persistence
- Redis for pub/sub and caching
- WebSocket for real-time communication
- JWT for authentication
- Swagger for API documentation

### Deployment
- Docker + Docker Compose
- Kubernetes manifests included
- Nginx reverse proxy

## Quick Start

### Prerequisites
- Node.js 20+
- Docker and Docker Compose (optional)
- PostgreSQL 16+ (if not using Docker)
- Redis 7+ (if not using Docker)

### Using Docker Compose (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/your-org/openclaw-task-control.git
cd openclaw-task-control
```

2. Copy the environment file:
```bash
cp .env.example .env
```

3. Start all services:
```bash
docker-compose up -d
```

4. Access the application:
- Frontend: http://localhost
- API: http://localhost:3001/api
- API Docs: http://localhost:3001/api-docs

5. Seed the database with demo data:
```bash
docker-compose exec backend npm run seed
```

### Manual Setup

#### Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Run database migrations:
```bash
npm run migration:run
```

5. Seed the database:
```bash
npm run seed
```

6. Start the development server:
```bash
npm run dev
```

#### Frontend

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server:
```bash
npm run dev
```

## Demo Credentials

After seeding the database, you can log in with:

- **Admin**: admin@openclaw.io / admin123
- **Developer**: dev@openclaw.io / dev123
- **Viewer**: viewer@openclaw.io / viewer123

## API Documentation

The API is documented using OpenAPI/Swagger. Access the documentation at:
- Development: http://localhost:3001/api-docs
- JSON Schema: http://localhost:3001/api-docs.json

### Key Endpoints

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user

#### Tasks
- `GET /api/tasks` - List tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/:id` - Get task details
- `PUT /api/tasks/:id` - Update task
- `PATCH /api/tasks/:id/status` - Update task status
- `GET /api/tasks/kanban` - Get kanban board data

#### Agent Integration
- `POST /api/agents/heartbeat` - Agent heartbeat
- `GET /api/agents/:agentId/task/next` - Get next task for agent
- `POST /api/agents/task/:taskId/update` - Update task from agent
- `POST /api/agents/log` - Post agent log

## Agent Integration

### Python Example

```python
import requests
import time

API_URL = "http://localhost:3001/api"
API_KEY = "your-agent-api-key"

headers = {
    "X-API-Key": API_KEY
}

# Send heartbeat
def send_heartbeat():
    requests.post(f"{API_URL}/agents/heartbeat", headers=headers, json={
        "agentId": "agent-001",
        "name": "My Agent",
        "state": "idle",
        "podInfo": {
            "name": "agent-pod-001",
            "namespace": "openclaw",
            "node": "worker-1",
            "ip": "10.0.0.1",
            "phase": "Running"
        },
        "resources": {
            "cpu": 2,
            "memory": 4096,
            "cpuLimit": 4,
            "memoryLimit": 8192
        },
        "metrics": {
            "cpuUsage": 15.5,
            "memoryUsage": 1024
        }
    })

# Get next task
def get_next_task():
    response = requests.get(f"{API_URL}/agents/agent-001/task/next", headers=headers)
    if response.status_code == 200:
        return response.json().get("data")
    return None

# Update task status
def update_task(task_id, status):
    requests.post(f"{API_URL}/agents/task/{task_id}/update", headers=headers, json={
        "status": status
    })

# Post log
def post_log(task_id, message, level="info"):
    requests.post(f"{API_URL}/agents/log", headers=headers, json={
        "agentId": "agent-001",
        "taskId": task_id,
        "level": level,
        "message": message
    })

# Main loop
while True:
    send_heartbeat()
    
    task = get_next_task()
    if task:
        task_id = task["id"]
        update_task(task_id, "in_progress")
        post_log(task_id, f"Starting task: {task['title']}")
        
        # Do work...
        time.sleep(5)
        
        update_task(task_id, "done")
        post_log(task_id, "Task completed successfully")
    
    time.sleep(30)
```

## Kubernetes Deployment

1. Build and push Docker images:
```bash
# Build images
docker build -t your-registry/openclaw-backend:latest -f docker/Dockerfile.backend .
docker build -t your-registry/openclaw-frontend:latest -f docker/Dockerfile.frontend .

# Push images
docker push your-registry/openclaw-backend:latest
docker push your-registry/openclaw-frontend:latest
```

2. Update image references in Kubernetes manifests:
```bash
sed -i 's|openclaw/backend:latest|your-registry/openclaw-backend:latest|g' k8s/backend.yaml
sed -i 's|openclaw/frontend:latest|your-registry/openclaw-frontend:latest|g' k8s/frontend.yaml
```

3. Apply manifests:
```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/postgres.yaml
kubectl apply -f k8s/redis.yaml
kubectl apply -f k8s/backend.yaml
kubectl apply -f k8s/frontend.yaml
```

4. Set up ingress (requires NGINX Ingress Controller):
```bash
kubectl apply -f k8s/ingress.yaml
```

## Project Structure

```
openclaw-task-control/
├── backend/                 # Node.js + Express backend
│   ├── src/
│   │   ├── config/         # Database and Redis config
│   │   ├── controllers/    # Route controllers
│   │   ├── entities/       # TypeORM entities
│   │   ├── middleware/     # Auth, validation, error handling
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── types/          # TypeScript types
│   │   ├── websocket/      # WebSocket handler
│   │   └── seed/           # Database seeding
│   └── package.json
├── frontend/               # React + TypeScript frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts (Auth, WebSocket)
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service
│   │   └── types/          # TypeScript types
│   └── package.json
├── docker/                 # Docker configurations
├── k8s/                    # Kubernetes manifests
├── database/               # SQL schemas and migrations
├── docs/                   # Documentation
└── README.md
```

## Environment Variables

### Backend
| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3001` |
| `DB_HOST` | PostgreSQL host | `localhost` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_USER` | PostgreSQL user | `openclaw` |
| `DB_PASSWORD` | PostgreSQL password | `openclaw` |
| `DB_NAME` | PostgreSQL database | `openclaw_task_control` |
| `REDIS_HOST` | Redis host | `localhost` |
| `REDIS_PORT` | Redis port | `6379` |
| `JWT_SECRET` | JWT signing secret | - |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` |

### Frontend
| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:3001/api` |
| `VITE_WS_URL` | WebSocket URL | `ws://localhost:3001/ws` |

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support, please open an issue on GitHub or contact support@openclaw.io
