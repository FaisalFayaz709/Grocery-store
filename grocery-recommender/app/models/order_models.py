# app/models/order_models.py

from pydantic import BaseModel


class Order(BaseModel):
    productId: int
    quantity: int
class OrderModel(BaseModel):
    orderId: int
    items: list[Order]  # List of Order items