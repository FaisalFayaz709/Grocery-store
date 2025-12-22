# Docker Setup for Grocery Store Application

This project contains three services wrapped in Docker containers:
1. **FastAPI Service** - Python recommendation engine (Port 8001)
2. **.NET API** - Main backend API (Port 5172)
3. **Next.js Frontend** - React frontend (Port 3000)
4. **PostgreSQL** - Database (Port 5432)

## Prerequisites

- Docker Desktop installed and running
- Docker Compose (included with Docker Desktop)

## Quick Start

1. **Build and start all services:**
   ```bash
   docker-compose up --build
   ```

2. **Run in detached mode (background):**
   ```bash
   docker-compose up -d --build
   ```

3. **View logs:**
   ```bash
   docker-compose logs -f
   ```

4. **Stop all services:**
   ```bash
   docker-compose down
   ```

5. **Stop and remove volumes (clean slate):**
   ```bash
   docker-compose down -v
   ```

## Service URLs

Once all containers are running:

- **Frontend (Next.js):** http://localhost:3000
- **.NET API:** http://localhost:5172
- **FastAPI Service:** http://localhost:8001
- **PostgreSQL:** localhost:5432
- **Swagger UI:** http://localhost:5172/swagger

## Individual Service Management

### Build individual services:
```bash
# FastAPI
docker-compose build fastapi-service

# .NET API
docker-compose build dotnet-api

# Next.js
docker-compose build nextjs-frontend
```

### Start/Stop individual services:
```bash
# Start specific service
docker-compose up fastapi-service

# Stop specific service
docker-compose stop dotnet-api
```

### View logs for specific service:
```bash
docker-compose logs -f dotnet-api
docker-compose logs -f fastapi-service
docker-compose logs -f nextjs-frontend
```

## Environment Variables

### FastAPI Service
- `DOTNET_API_BASE_URL` - Base URL for .NET API (default: http://localhost:5172/api)
- `PYTHONUNBUFFERED` - Python output buffering

### .NET API
- `ConnectionStrings__DefaultConnection` - PostgreSQL connection string
- `PythonService__BaseUrl` - FastAPI service URL
- `JwtSettings__*` - JWT configuration
- `ASPNETCORE_ENVIRONMENT` - Environment (Production/Development)

### Next.js Frontend
- `NEXT_PUBLIC_API_URL` - .NET API base URL
- `NODE_ENV` - Node environment

## Database Migrations

To run database migrations for the .NET API:

```bash
# Enter the .NET API container
docker-compose exec dotnet-api bash

# Run migrations (inside container)
dotnet ef database update --project SmartGrocery.Infrastructure --startup-project SmartGrocery.API
```

Or run migrations from your local machine (if you have .NET SDK installed):

```bash
cd SmartGrocerySolution
dotnet ef database update --project SmartGrocery.Infrastructure --startup-project SmartGrocery.API --connection "Host=localhost;Port=5432;Database=grocerydb;Username=postgres;Password=252570"
```

## Troubleshooting

### Port Already in Use
If you get port conflicts, you can modify the port mappings in `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"  # Change host port from 3000 to 3001
```

### Database Connection Issues
Ensure PostgreSQL container is healthy:
```bash
docker-compose ps
```

Check PostgreSQL logs:
```bash
docker-compose logs postgres
```

### Service Not Starting
Check service logs:
```bash
docker-compose logs [service-name]
```

### Rebuild After Code Changes
```bash
docker-compose up --build
```

### Clear Everything and Start Fresh
```bash
docker-compose down -v
docker-compose up --build
```

## Network Architecture

All services communicate through a Docker bridge network (`grocery-network`):
- Services can reach each other using service names (e.g., `dotnet-api`, `fastapi-service`)
- External access is through exposed ports on `localhost`

## Production Considerations

For production deployment:
1. Update environment variables with secure values
2. Use Docker secrets for sensitive data
3. Configure proper CORS settings
4. Set up SSL/TLS certificates
5. Use a reverse proxy (nginx/traefik)
6. Configure proper logging and monitoring
7. Set up database backups

## File Structure

```
GroceryStore/
├── docker-compose.yml          # Main orchestration file
├── grocery-recommender/
│   ├── Dockerfile              # FastAPI Dockerfile
│   ├── requirements.txt        # Python dependencies
│   └── app/                    # FastAPI application
├── grocery-store/
│   ├── Dockerfile              # Next.js Dockerfile
│   └── src/                    # Next.js application
└── SmartGrocerySolution/
    ├── SmartGrocery.API/
    │   └── Dockerfile          # .NET API Dockerfile
    └── ...                     # Other .NET projects
```





