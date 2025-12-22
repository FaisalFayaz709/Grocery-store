## Smart Grocery Platform

End-to-end grocery shopping platform combining a Next.js storefront, a .NET 9 REST API, a Python FastAPI recommendation service, and PostgreSQL. Everything runs together via Docker Compose for a one-command spin-up.

### Highlights
- Modern Next.js frontend with protected areas (customer dashboard, cart/checkout, admin product & order management).
- .NET 9 API for auth, products, cart, orders, recommendations, and Swagger docs.
- FastAPI service that pulls order history from the .NET API and returns AI-driven recommendations.
- PostgreSQL persistence, wired through Docker networking; health checks and restart policies included.
- Ready-to-run `docker-compose.yml` plus optional per-service local development.

### Repository Structure
- `docker-compose.yml` – Orchestrates all services and PostgreSQL.
- `grocery-store/` – Next.js app (React), Dockerfile.
- `SmartGrocerySolution/` – .NET solution (.NET 9) with `SmartGrocery.API` and supporting projects.
- `grocery-recommender/` – FastAPI recommendation engine, Dockerfile.
- `pull-images.sh` – Convenience script to pre-pull base images.
- `DOCKER_README.md` – Docker-specific notes and troubleshooting.

### Detailed Folder Structures
**Frontend (Next.js) — `grocery-store/`**
```
grocery-store/
├─ src/
│  ├─ app/
│  │  ├─ (protected)/        # authenticated areas (home, cart, checkout, admin)
│  │  ├─ auth/               # login/register
│  │  ├─ ClientLayout.jsx
│  │  ├─ globals.css, layout.js, page.js
│  ├─ components/            # shared UI + admin/product/cart components
│  ├─ hooks/                 # useAuth, useCart, useOrder, etc.
│  ├─ lib/                   # API helpers, auth, constants, sample data
│  ├─ store/                 # Zustand stores for cart/ui/user
│  ├─ styles/                # CSS modules and variables
│  ├─ types/                 # JS type helpers
│  └─ project/public/        # image assets
├─ public/                   # static assets
├─ Dockerfile, package.json, next.config.mjs, eslint.config.mjs
```

**Backend (.NET 9) — `SmartGrocerySolution/`**
```
SmartGrocerySolution/
├─ SmartGrocery.API/         # entrypoint API
│  ├─ Controllers/           # Auth, Products, Orders, Cart, Recommendations, etc.
│  ├─ Middlewares/           # JWT, global exception handling
│  ├─ Configurations/        # Swagger, DI setup
│  ├─ Properties/, appsettings*.json, Dockerfile
├─ SmartGrocery.Application/ # application layer DTOs, services, interfaces, exceptions
├─ SmartGrocery.Domain/      # entities, enums, base models
├─ SmartGrocery.Infrastructure/ # persistence, repositories, migrations, services, security
├─ SmartGrocery.Tests/       # API/application tests
└─ SmartGrocerySolution.sln
```

**Recommendation Service (FastAPI) — `grocery-recommender/`**
```
grocery-recommender/
├─ app/
│  ├─ api/v1/routes/         # health, recommend endpoints
│  ├─ models/                # order/request/response schemas
│  ├─ repository/            # .NET API client for orders
│  ├─ services/              # recommender logic & analytics
│  ├─ utils/                 # helpers/exceptions
│  ├─ main.py                # FastAPI app factory
├─ tests/                    # FastAPI/unit tests
├─ requirements.txt
├─ Dockerfile
```

### Prerequisites
- Docker Desktop + Docker Compose
- Optional for local dev:
  - Node.js 20+ and npm
  - .NET 9 SDK
  - Python 3.11+ and `pip`

### Quick Start (All Services)
```bash
# From the repo root
./pull-images.sh           # optional: pre-pull base images
docker-compose up --build  # or: docker-compose up -d --build

# URLs
# Frontend:          http://localhost:3000
# .NET API + Swagger http://localhost:5172/swagger
# FastAPI service:   http://localhost:8001/api/v1/health
# PostgreSQL:        localhost:5433 (mapped to 5432 in container)
```

### Environment Variables (compose defaults)
- PostgreSQL: `POSTGRES_DB=grocerydb`, `POSTGRES_USER=postgres`, `POSTGRES_PASSWORD=252570`
- .NET API: `ASPNETCORE_ENVIRONMENT`, `ASPNETCORE_URLS`, `ConnectionStrings__DefaultConnection`, `PythonService__BaseUrl`, `JwtSettings__Secret/Issuer/Audience/ExpiryMinutes`
- FastAPI: `DOTNET_API_BASE_URL` (defaults to `http://dotnet-api:5172/api` in Docker)
- Next.js: `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:5172`)

Change secrets before production and prefer Docker secrets or a vault.

### Local Development (per service)
#### Next.js frontend (`grocery-store/`)
```bash
cd grocery-store
npm install
npm run dev    # http://localhost:3000
# ensure NEXT_PUBLIC_API_URL points to your running API
```

#### .NET API (`SmartGrocerySolution/SmartGrocery.API`)
```bash
cd SmartGrocerySolution
dotnet restore
dotnet ef database update --project SmartGrocery.Infrastructure --startup-project SmartGrocery.API \
  --connection "Host=localhost;Port=5432;Database=grocerydb;Username=postgres;Password=252570"
dotnet run --project SmartGrocery.API  # http://localhost:5172/swagger
```

#### FastAPI recommender (`grocery-recommender/`)
```bash
cd grocery-recommender
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
export DOTNET_API_BASE_URL=http://localhost:5172/api
uvicorn app.main:app --reload --port 8001
```

### Testing
- .NET API: `dotnet test SmartGrocerySolution`
- FastAPI: `cd grocery-recommender && pytest`
- Frontend: `cd grocery-store && npm run lint`

### Notable Endpoints
- Swagger UI: `http://localhost:5172/swagger`
- FastAPI health: `GET http://localhost:8001/api/v1/health`
- Recommendations: `GET http://localhost:8001/api/v1/recommend/{userId}` (invokes order history fetch from .NET API)

### Deployment Notes
- Use `docker-compose -f docker-compose.yml up --build` for reproducible deployments.
- Set strong JWT secrets and rotate them.
- Add HTTPS via a reverse proxy (nginx/traefik) for production.
- Configure proper CORS, logging, and backups for PostgreSQL.

### Pushing to GitHub
```bash
git init
git add .
git commit -m "Add Smart Grocery platform and README"
git remote add origin https://github.com/FaisalFayaz709/Grocery-store.git
git push -u origin main   # or master
```
If the GitHub repo is empty (as of the provided link), the push will upload the full project with this README.

### License
This project is licensed under the MIT License. See `LICENSE` for details.

# Grocery-store
