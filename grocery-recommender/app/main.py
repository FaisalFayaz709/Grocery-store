# from fastapi import FastAPI
# from app.api.v1.routes.recommend import router as recommend_router
# from app.api.v1.routes.health import router as health_router

# app = FastAPI(title="Grocery Recommender Service")

# app.include_router(health_router, prefix="/api/v1/health")
# app.include_router(recommend_router, prefix="/api/v1/recommend")


# app/main.py

from fastapi import FastAPI
from app.api.v1.routes import recommend, health
from pydantic import BaseModel
from typing import List
import random

app = FastAPI(
    title="SmartGrocery Recommendation Service",
    version="1.0.0",
    description="AI-powered recommendation engine for SmartGrocery",
)

# Routes
app.include_router(recommend.router, prefix="/api/v1")
app.include_router(health.router, prefix="/api/v1")


# Root route
@app.get("/")
async def root():
    return {"message": "SmartGrocery AI Recommendation Service is running"}

