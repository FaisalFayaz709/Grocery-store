"use client";

import Link from "next/link";

/**
 * CartItem Component
 * Displays individual cart item with quantity controls
 * 
 * Usage:
 * <CartItem 
 *   item={cartItem}
 *   onUpdateQuantity={handleUpdateQty}
 *   onRemove={handleRemove}
 * />
 */

export default function CartItem({ 
  item, 
  onUpdateQuantity, 
  onRemove,
  showActions = true,
  compact = false,
}) {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    if (onUpdateQuantity) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove(item.id);
    }
  };

  const itemTotal = (item.price * item.qty).toFixed(2);

  // Compact version (for checkout summary)
  if (compact) {
    return (
      <div className="flex items-center gap-3 py-3 border-b last:border-b-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-12 h-12 object-contain rounded"
        />
        <div className="flex-1">
          <p className="font-semibold text-[#333333] text-sm">{item.name}</p>
          <p className="text-xs text-gray-600">Qty: {item.qty}</p>
        </div>
        <p className="font-bold text-[#333333]">${itemTotal}</p>
      </div>
    );
  }

  // Full version
  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
      <div className="flex flex-col sm:flex-row gap-4">
        
        {/* Product Image */}
        <Link href={`/products/${item.id}`} className="flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-24 h-24 object-contain rounded-lg cursor-pointer hover:scale-105 transition"
          />
        </Link>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          
          {/* Name & Category */}
          <Link href={`/products/${item.id}`}>
            <h3 className="text-lg font-semibold text-[#333333] hover:text-[#4CAF50] transition mb-1 truncate">
              {item.name}
            </h3>
          </Link>
          
          {item.category && (
            <p className="text-sm text-gray-500 mb-2">{item.category}</p>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <p className="text-xl font-bold text-[#4CAF50]">
              ${item.price.toFixed(2)}
            </p>
            {item.originalPrice && (
              <p className="text-sm text-gray-500 line-through">
                ${item.originalPrice.toFixed(2)}
              </p>
            )}
          </div>

          {/* Quantity Controls & Actions */}
          {showActions && (
            <div className="flex flex-wrap items-center gap-4">
              
              {/* Quantity Selector */}
              <div className="flex items-center border border-[#E5E5E5] rounded-lg">
                <button
                  onClick={() => handleQuantityChange(item.qty - 1)}
                  className="px-3 py-2 hover:bg-[#F9F9F9] transition text-[#333333] font-bold"
                >
                  −
                </button>
                <span className="px-4 py-2 font-semibold text-[#333333] min-w-[3rem] text-center">
                  {item.qty}
                </span>
                <button
                  onClick={() => handleQuantityChange(item.qty + 1)}
                  className="px-3 py-2 hover:bg-[#F9F9F9] transition text-[#333333] font-bold"
                >
                  +
                </button>
              </div>

              {/* Subtotal */}
              <div className="hidden sm:block text-right">
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className="text-xl font-bold text-[#333333]">${itemTotal}</p>
              </div>

              {/* Remove Button */}
              <button
                onClick={handleRemove}
                className="ml-auto text-red-500 hover:text-red-700 transition font-medium flex items-center gap-1"
              >
                <span className="text-xl">🗑️</span>
                <span className="hidden sm:inline">Remove</span>
              </button>

            </div>
          )}

        </div>

        {/* Mobile Subtotal */}
        {showActions && (
          <div className="sm:hidden text-right border-t pt-3 mt-3">
            <p className="text-sm text-gray-600">Subtotal</p>
            <p className="text-xl font-bold text-[#333333]">${itemTotal}</p>
          </div>
        )}

      </div>

      {/* Stock Warning */}
      {item.stock !== undefined && item.stock < item.qty && (
        <div className="mt-3 p-2 bg-yellow-100 border border-yellow-300 rounded-lg">
          <p className="text-sm text-yellow-800 font-medium">
            ⚠️ Only {item.stock} items left in stock
          </p>
        </div>
      )}

      {/* Out of Stock */}
      {item.stock === 0 && (
        <div className="mt-3 p-2 bg-red-100 border border-red-300 rounded-lg">
          <p className="text-sm text-red-800 font-medium">
            ❌ This item is currently out of stock
          </p>
        </div>
      )}

    </div>
  );
}

// Wishlist Item (similar to cart item but for wishlist)
export function WishlistItem({ item, onAddToCart, onRemove }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
      <div className="flex gap-4">
        
        {/* Product Image */}
        <Link href={`/products/${item.id}`}>
          <img
            src={item.image}
            alt={item.name}
            className="w-24 h-24 object-contain rounded-lg cursor-pointer"
          />
        </Link>

        {/* Product Info */}
        <div className="flex-1">
          <Link href={`/products/${item.id}`}>
            <h3 className="text-lg font-semibold text-[#333333] hover:text-[#4CAF50] transition mb-2">
              {item.name}
            </h3>
          </Link>
          
          <p className="text-xl font-bold text-[#4CAF50] mb-3">
            ${item.price.toFixed(2)}
          </p>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onAddToCart && onAddToCart(item)}
              className="px-4 py-2 bg-[#4CAF50] hover:bg-[#388E3C] text-white rounded-lg font-medium transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => onRemove && onRemove(item.id)}
              className="px-4 py-2 bg-white border-2 border-red-500 text-red-500 hover:bg-red-50 rounded-lg font-medium transition"
            >
              Remove
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

// Mini Cart Item (for dropdown/modal)
export function MiniCartItem({ item, onRemove }) {
  const itemTotal = (item.price * item.qty).toFixed(2);

  return (
    <div className="flex items-center gap-3 p-2 hover:bg-[#F9F9F9] rounded-lg transition">
      
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 object-contain rounded"
      />

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[#333333] text-sm truncate">
          {item.name}
        </p>
        <p className="text-xs text-gray-600">
          {item.qty} × ${item.price.toFixed(2)}
        </p>
        <p className="text-sm font-bold text-[#4CAF50]">${itemTotal}</p>
      </div>

      <button
        onClick={() => onRemove && onRemove(item.id)}
        className="text-red-500 hover:text-red-700 transition"
      >
        ×
      </button>

    </div>
  );
}
