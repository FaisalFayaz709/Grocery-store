#!/bin/bash
# Script to pre-pull Docker images to avoid timeout issues

echo "Pulling base images..."
docker pull mcr.microsoft.com/dotnet/aspnet:9.0 || echo "Failed to pull aspnet:9.0"
docker pull mcr.microsoft.com/dotnet/sdk:9.0 || echo "Failed to pull sdk:9.0"
docker pull postgres:16-alpine || echo "Failed to pull postgres"
docker pull python:3.13-slim || echo "Failed to pull python"
docker pull node:20-alpine || echo "Failed to pull node"

echo "Done! You can now run: docker-compose up --build"
