# app/services/data_loader.py

import httpx
from typing import List
from app.models.order_models import Order
from app.core.settings import settings


async def get_user_orders(user_id: int) -> List[Order]:
    """
    Calls .NET API to fetch a user's orders.
    """

    url = f"{settings.DOTNET_API_URL}/orders/user/{user_id}"

    async with httpx.AsyncClient() as client:
        response = await client.get(url)

        if response.status_code != 200:
            return []

        data = response.json()

        # Convert to Pydantic models
        return [Order(**item) for item in data]
