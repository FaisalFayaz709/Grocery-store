# app/models/request_models.py

from pydantic import BaseModel

class RecommendRequest(BaseModel):
    userId: int
    orders: list  # List of user's past orders