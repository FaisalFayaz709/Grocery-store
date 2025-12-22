# from fastapi import APIRouter
# from pydantic import BaseModel
# from typing import List, Dict, Any
# from app.services.recommender_service import recommend_for_user
# from app.api.v1.models.recommend_models import RecommendRequest



# router = APIRouter()

# class OrderItem(BaseModel):
#     product_id: int
#     quantity: int

# class Order(BaseModel):
#     order_id: int
#     items: List[OrderItem]

# class RecommendRequest(BaseModel):
#     user_id: int
#     orders: List[Order]

# @router.post("/")
# def recommend(req: RecommendRequest):
#     """
#     Accepts user's order history and returns recommendations:
#     {
#       "recommendations": [{"product_id": 5, "score": 0.9}, ...]
#     }
#     """
#     recs = recommend_for_user(req.user_id, req.orders)
#     return {"user_id": req.user_id, "recommendations": recs}


# app/api/v1/routes/recommend.py

from fastapi import APIRouter, HTTPException
from app.services.recommender_service import RecommenderService
from app.models.response_models import RecommendationResponse

router = APIRouter()

# Point this to your .NET API base URL
# Will be set from environment variable or default to localhost for local development
import os
DOTNET_API_BASE_URL = os.getenv("DOTNET_API_BASE_URL", "http://localhost:5172/api")

recommender = RecommenderService(
    base_url=DOTNET_API_BASE_URL   # 👈 your .NET API
)

@router.get(
    "/recommend/{user_id}",
    response_model=RecommendationResponse,
    summary="Get product recommendations for a user",
)
async def get_recommendations(user_id: int):
    """
    This endpoint is called by your .NET API.
    It loads the user order history from .NET → runs AI → returns recommendations.
    """

    try:
        result = await recommender.get_recommendations(user_id)
        return result

    except Exception as ex:
        raise HTTPException(
            status_code=500,
            detail=f"Recommendation error: {str(ex)}"
        )
