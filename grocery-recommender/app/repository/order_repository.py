# app/repository/order_repository.py

import httpx
from typing import List
from app.models.order_models import Order


class OrderRepository:
    """
    Handles communication with the .NET API
    to fetch the user's order history.
    """

    def __init__(self, base_url: str):
        self.base_url = base_url.rstrip("/")

    async def get_user_orders(self, user_id: int) -> List[Order]:
        """
        Calls .NET API endpoint:
        GET /api/orders/user/{userId}
        Returns: List[Order]
        """

        url = f"{self.base_url}/api/orders/user/{user_id}"

        async with httpx.AsyncClient() as client:
            response = await client.get(url)

        if response.status_code != 200:
            raise Exception(
                f"Failed to fetch orders for user {user_id}, "
                f"status: {response.status_code}"
            )

        orders_json = response.json()

        # Convert to Pydantic models
        orders = [Order(**order) for order in orders_json]

        return orders
