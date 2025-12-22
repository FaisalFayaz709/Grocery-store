# .NET API Dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 5172

# .NET 9 SDK for building .NET 9 projects
# If you get TLS timeout errors, try pre-pulling: docker pull mcr.microsoft.com/dotnet/sdk:9.0
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy solution file
COPY SmartGrocerySolution.sln ./

# Copy project files
COPY SmartGrocery.Domain/SmartGrocery.Domain.csproj SmartGrocery.Domain/
COPY SmartGrocery.Application/SmartGrocery.Application.csproj SmartGrocery.Application/
COPY SmartGrocery.Infrastructure/SmartGrocery.Infrastructure.csproj SmartGrocery.Infrastructure/
COPY SmartGrocery.API/SmartGrocery.API.csproj SmartGrocery.API/

# Restore dependencies
RUN dotnet restore SmartGrocerySolution.sln

# Copy all source code
COPY SmartGrocery.Domain/ SmartGrocery.Domain/
COPY SmartGrocery.Application/ SmartGrocery.Application/
COPY SmartGrocery.Infrastructure/ SmartGrocery.Infrastructure/
COPY SmartGrocery.API/ SmartGrocery.API/

# Build the solution
WORKDIR /src/SmartGrocery.API
RUN dotnet build -c Release -o /app/build

FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Set environment variables
ENV ASPNETCORE_URLS=http://+:5172
ENV ASPNETCORE_ENVIRONMENT=Production

ENTRYPOINT ["dotnet", "SmartGrocery.API.dll"]

