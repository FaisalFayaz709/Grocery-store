## 🛒 Smart Grocery Platform

![Docker](https://img.shields.io/badge/Docker-Containerized-blue?logo=docker)
![.NET](https://img.shields.io/badge/.NET-9-purple?logo=dotnet)
![Next.js](https://img.shields.io/badge/Next.js-React-black?logo=next.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?logo=postgresql)
![FastAPI](https://img.shields.io/badge/FastAPI-Python-green?logo=fastapi)

End-to-end grocery shopping platform combining a Next.js storefront, a .NET 9 REST API, a Python FastAPI recommendation service, and PostgreSQL. Everything runs together via Docker Compose for a one-command spin-up.

---

### ✨ Highlights
- Modern Next.js frontend with protected areas (customer dashboard, cart/checkout, admin product & order management).
- .NET 9 API for auth, products, cart, orders, recommendations, and Swagger docs.
- FastAPI service that pulls order history from the .NET API and returns AI-driven recommendations.
- PostgreSQL persistence, wired through Docker networking; health checks and restart policies included.
- Ready-to-run `docker-compose.yml` plus optional per-service local development.

---

### 🏗️ Architecture Overview

```text
┌───────────────┐
│   Next.js UI  │
│  (Frontend)   │
└───────┬───────┘
        │ REST
        ▼
┌───────────────┐
│   .NET 9 API  │
│ Auth / Cart  │
│ Orders / etc │
└───────┬───────┘
        │ HTTP
        ▼
┌───────────────┐
│  FastAPI AI   │
│ Recommender   │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│ PostgreSQL DB │
└───────────────┘
```

## 📁 Repository Structure

- `docker-compose.yml` – Orchestrates all services and PostgreSQL.
- `grocery-store/` – Next.js app (React), Dockerfile.
- `SmartGrocerySolution/` – .NET solution (.NET 9) with `SmartGrocery.API` and supporting projects.
- `grocery-recommender/` – FastAPI recommendation engine, Dockerfile.
- `pull-images.sh` – Convenience script to pre-pull base images.
- `DOCKER_README.md` – Docker-specific notes and troubleshooting.

---

## 🗂️ Detailed Folder Structures

### 🖥️ Frontend (Next.js) — `grocery-store/`

```text
grocery-store/
├─ src/
│  ├─ app/
│  │  ├─ (protected)/        # authenticated areas (home, cart, checkout, admin)
│  │  ├─ auth/               # login/register
│  │  ├─ ClientLayout.jsx
│  │  ├─ globals.css
│  │  ├─ layout.js
│  │  ├─ page.js
│  ├─ components/            # shared UI + admin/product/cart components
│  ├─ hooks/                 # useAuth, useCart, useOrder, etc.
│  ├─ lib/                   # API helpers, auth, constants, sample data
│  ├─ store/                 # Zustand stores for cart/ui/user
│  ├─ styles/                # CSS modules and variables
│  ├─ types/                 # JS type helpers
│  └─ project/public/        # image assets
├─ public/                   # static assets
├─ Dockerfile
├─ package.json
├─ next.config.mjs
├─ eslint.config.mjs
```
### ⚙️ Backend (.NET 9) — `SmartGrocerySolution/`

```text
SmartGrocerySolution/
├─ SmartGrocery.API/
│  ├─ Controllers/
│  ├─ Middlewares/
│  ├─ Configurations/
│  ├─ Properties/
│  ├─ appsettings*.json
│  ├─ Dockerfile
├─ SmartGrocery.Application/
├─ SmartGrocery.Domain/
├─ SmartGrocery.Infrastructure/
├─ SmartGrocery.Tests/
└─ SmartGrocerySolution.sln
```

### 🤖 Recommendation Service (FastAPI) — `grocery-recommender/`

```text
grocery-recommender/
├─ app/
│  ├─ api/v1/routes/
│  ├─ models/
│  ├─ repository/
│  ├─ services/
│  ├─ utils/
│  ├─ main.py
├─ tests/
├─ requirements.txt
├─ Dockerfile
```

## ✅ Prerequisites

- Docker Desktop + Docker Compose

### Optional for Local Development

- Node.js 20+ and npm
- .NET 9 SDK
- Python 3.11+
- `pip`

---

## 🚀 Quick Start (All Services)

```bash
./pull-images.sh
docker-compose up --build
```
## 🌐 Service URLs

- **Frontend:** http://localhost:3000
- **.NET API + Swagger:** http://localhost:5172/swagger
- **FastAPI service:** http://localhost:8001/api/v1/health
- **PostgreSQL:** localhost:5433

---

## 🔐 Environment Variables (Compose Defaults)

### PostgreSQL
- `POSTGRES_DB=grocerydb`

### .NET API
- `ASPNETCORE_ENVIRONMENT`
- `JwtSettings__Secret`

### FastAPI
- `DOTNET_API_BASE_URL`

### Next.js
- `NEXT_PUBLIC_API_URL`

> ⚠️ Change secrets before production deployment.


### 🧑‍💻 Local Development (Per Service)
#### ⚛️ Next.js Frontend (grocery-store/)
```bash
cd grocery-store
npm install
npm run dev    # 🌐 http://localhost:3000
# ensure NEXT_PUBLIC_API_URL points to your running API

```

#### 🟦 .NET API (SmartGrocerySolution/SmartGrocery.API)
```bash
cd SmartGrocerySolution
dotnet restore
dotnet ef database update --project SmartGrocery.Infrastructure --startup-project SmartGrocery.API \
  --connection "Host=localhost;Port=5432;Database=grocerydb;Username=postgres;Password=252570"
dotnet run --project SmartGrocery.API  # 📘 http://localhost:5172/swagger

```

#### 🐍 FastAPI Recommender (grocery-recommender/)
```bash
cd grocery-recommender
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
export DOTNET_API_BASE_URL=http://localhost:5172/api
uvicorn app.main:app --reload --port 8001
```

### 🧪 Testing
- 🟦 .NET API: `dotnet test SmartGrocerySolution`
- 🐍 FastAPI: `cd grocery-recommender && pytest`
- ⚛️ Frontend: `cd grocery-store && npm run lint`

### 🔗 Notable Endpoints
- 📘 Swagger UI: `http://localhost:5172/swagger`
- ❤️ FastAPI Health Check: `GET http://localhost:8001/api/v1/health`
- 🤖 Recommendations: `GET http://localhost:8001/api/v1/recommend/{userId}` (invokes order history fetch from .NET API)

### 🚀 Deployment Notes
- 🐳 Use `docker-compose -f docker-compose.yml up --build` for reproducible deployments.
- 🔐 Set strong JWT secrets and rotate them regularly.
- 🔒 Add HTTPS via a reverse proxy (nginx / traefik) for production.
- 🌍 Configure proper CORS, logging, and PostgreSQL backups.
  
### 📦 Pushing to GitHub
```bash
git init
git add .
git commit -m "Add Smart Grocery platform and README"
git remote add origin https://github.com/FaisalFayaz709/Grocery-store.git
git push -u origin main   # or master

```

📌 If the GitHub repository is empty, this command will upload the entire project along with this README.



### 📄 License
📜 This project is licensed under the MIT License.

# Grocery-store 