# app/services/analytics.py

from typing import List, Dict
from collections import Counter
from app.models.order_models import Order


def calculate_frequently_bought_items(orders: List[Order]) -> List[int]:
    """
    Basic algorithm: Return the most frequently purchased product IDs.
    """
    counter = Counter([order.productId for order in orders])
    most_common = counter.most_common(5)   # top 5
    return [item[0] for item in most_common]


def calculate_item_similarity(orders: List[Order]) -> List[int]:
    """
    Very simple similarity logic:
    Recommend items that were purchased together.
    """
    product_pairs = Counter()

    product_ids = [o.productId for o in orders]

    for pid in product_ids:
        for other in product_ids:
            if pid != other:
                product_pairs[(pid, other)] += 1

    # Return items that appear frequently together
    similar_items = [
        pair[1] for pair, count in product_pairs.items()
        if count > 1
    ]

    return list(set(similar_items))[:5]


def collaborative_filtering(user_id: int, orders: List[Order]) -> List[int]:
    """
    Simple placeholder collaborative filtering.
    Replace later with ML or actual CF logic.
    """
    # For now → recommend products purchased by others (dummy)
    purchased = {o.productId for o in orders}

    # Fake recommendations by incrementing IDs
    recommendations = [pid + 1 for pid in purchased]

    return recommendations[:5]
