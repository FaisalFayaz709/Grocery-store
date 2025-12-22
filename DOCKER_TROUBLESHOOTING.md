# Docker Build Troubleshooting Guide

## Issue: TLS Handshake Timeout

If you encounter `TLS handshake timeout` errors when building Docker images, try these solutions:

### Solution 1: Pre-pull Base Images (Recommended)

Pull the base images separately before building:

```bash
# Pull .NET images
docker pull mcr.microsoft.com/dotnet/aspnet:9.0
docker pull mcr.microsoft.com/dotnet/sdk:8.0

# Pull other images
docker pull postgres:16-alpine
docker pull python:3.13-slim
docker pull node:20-alpine

# Then build
docker-compose up --build
```

### Solution 2: Use Docker Registry Mirror (If Available)

If you're in a region with slow access to Docker Hub/MCR, configure a mirror in Docker Desktop settings or `/etc/docker/daemon.json`:

```json
{
  "registry-mirrors": ["https://your-mirror-url"]
}
```

### Solution 3: Increase Docker Timeout

Edit Docker Desktop settings or `/etc/docker/daemon.json`:

```json
{
  "max-concurrent-downloads": 3,
  "max-concurrent-uploads": 5
}
```

### Solution 4: Use Alternative .NET SDK Version

The Dockerfile has been updated to use .NET 8 SDK (which can build .NET 9 projects). If you still have issues, you can manually edit the Dockerfile to use:

```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
```

### Solution 5: Build with Retry Logic

Build individual services with retries:

```bash
# Build FastAPI service
docker-compose build fastapi-service

# Build Next.js service  
docker-compose build nextjs-frontend

# Build .NET API service
docker-compose build dotnet-api
```

### Solution 6: Check Network Connectivity

```bash
# Test connectivity to Microsoft Container Registry
ping mcr.microsoft.com

# Test DNS resolution
nslookup mcr.microsoft.com

# Try pulling directly
docker pull mcr.microsoft.com/dotnet/sdk:8.0
```

### Solution 7: Use VPN or Different Network

If you're behind a corporate firewall or have network restrictions, try:
- Using a VPN
- Using a different network connection
- Configuring Docker proxy settings

### Solution 8: Clean Docker Cache

Sometimes clearing Docker cache helps:

```bash
docker system prune -a
docker-compose build --no-cache
```

## Alternative: Build Without Docker Compose

If docker-compose continues to have issues, build images individually:

```bash
# Build FastAPI
cd grocery-recommender
docker build -t grocery-fastapi .

# Build Next.js
cd ../grocery-store
docker build -t grocery-nextjs .

# Build .NET API
cd ../SmartGrocerySolution
docker build -f SmartGrocery.API/Dockerfile -t grocery-dotnet-api .
```

Then run containers manually or update docker-compose.yml to use the pre-built images.





