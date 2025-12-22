# app/models/response_models.py

from pydantic import BaseModel
from typing import List


class RecommendationItem(BaseModel):
    productId: int


class RecommendationResponse(BaseModel):
    userId: int
    recommendations: List[RecommendationItem]
    message: str | None = None
    error: str | None = None