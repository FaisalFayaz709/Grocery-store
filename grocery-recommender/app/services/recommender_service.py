# from collections import Counter, defaultdict
# from typing import List, Dict, Any
# from app.models.order_models import Order


# def recommend_for_user(user_id: int, orders: List[Order]) -> List[Dict[str, Any]]:
#     """
#     Simple, effective recommender:
#     - Count frequency of items user already bought (to know favorites)
#     - Build co-occurrence map across user's orders to recommend items often bought together
#     - Return top N suggestions by score (not including items already frequently purchased)
#     """

#     # Flatten purchased counts
#     purchased = Counter()
#     cooccurrence = defaultdict(Counter)  # product_id -> Counter(other_product_id)

#     for order in orders:
#         item_ids = [item.product_id for item in order.items]
#         for pid in item_ids:
#             purchased[pid] += 1
#         # update co-occurrence
#         for i in range(len(item_ids)):
#             for j in range(i+1, len(item_ids)):
#                 a, b = item_ids[i], item_ids[j]
#                 cooccurrence[a][b] += 1
#                 cooccurrence[b][a] += 1

#     # If user has no orders, return empty or a fallback (popularity-based) — here empty
#     if not purchased:
#         return []

#     # Score candidate items by sum of cooccurrence with user's purchased items
#     scores = Counter()
#     for owned_pid, owned_count in purchased.items():
#         for candidate_pid, co_count in cooccurrence.get(owned_pid, {}).items():
#             # candidate shouldn't be a product the user already buys frequently
#             scores[candidate_pid] += co_count * owned_count

#     # Remove already frequently purchased items from candidates
#     for pid in list(purchased.keys()):
#         if pid in scores:
#             del scores[pid]

#     # Create sorted list of recommendations
#     rec_list = [{"product_id": pid, "score": float(score)} for pid, score in scores.most_common(10)]
#     return rec_list


# app/services/recommender_service.py

from typing import Dict, List

from app.repository.order_repository import OrderRepository
from app.models.order_models import Order
from app.models.response_models import RecommendationResponse
from app.services.analytics import (
    calculate_frequently_bought_items,
    calculate_item_similarity,
    collaborative_filtering
)


class RecommenderService:
    def __init__(self, base_url: str):
        # Inject .NET API base URL
        self.order_repo = OrderRepository(base_url)

    async def get_recommendations(self, user_id: int) -> RecommendationResponse:
        """
        Fetch orders from .NET API using repository → 
        Apply multiple recommendation algorithms.
        """

        # ⬇️ THIS IS WHERE YOU USE THE REPOSITORY
        orders: List[Order] = await self.order_repo.get_user_orders(user_id)

        # If no orders found
        if not orders:
            return RecommendationResponse(
                user_id=user_id,
                recommendations=[],
                message="User has no order history"
            )

        # Run algorithms
        freq = calculate_frequently_bought_items(orders)
        sim = calculate_item_similarity(orders)
        collab = collaborative_filtering(user_id, orders)

        # Merge & dedupe
        final_recommendations = list(set(freq + sim + collab))

        return RecommendationResponse(
            user_id=user_id,
            recommendations=final_recommendations,
            message="Success"
        )
