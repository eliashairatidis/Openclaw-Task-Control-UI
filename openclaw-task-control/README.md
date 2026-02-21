# OpenClaw Task Control

Infrastructure scaffolding for local Docker and Kubernetes deployments.

## Quick start (single source of truth)

1. Copy env file:
   ```bash
   cp .env.example .env
   ```
2. Start local stack:
   ```bash
   docker compose up --build -d
   ```
3. Access services:
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3001/api`
   - Backend WS: `ws://localhost:3001/ws`
   - PostgreSQL: `localhost:5432` (service: `postgres`)
   - Redis: `localhost:6379` (service: `redis`)

Service names and ports above are reused across:
- `.env.example`
- `docker-compose.yml`
- `k8s/*.yaml`

## Kubernetes apply order

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/postgres.yaml
kubectl apply -f k8s/redis.yaml
kubectl apply -f k8s/backend.yaml
kubectl apply -f k8s/frontend.yaml
```

## Notes

- `database/schema.sql` initializes PostgreSQL when running Docker Compose.
- Replace placeholder backend/frontend image names in Kubernetes manifests.
