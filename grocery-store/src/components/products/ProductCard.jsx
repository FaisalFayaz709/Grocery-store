"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * ProductCard Component
 * 
 * Usage:
 * <ProductCard product={productData} onAddToCart={handleAddToCart} />
 */

export default function ProductCard({ product, onAddToCart, showQuickView = false }) {
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    if (onAddToCart) {
      await onAddToCart(product, quantity);
    }
    
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 1000);
  };

  const hasDiscount = product.discount || product.originalPrice;
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition relative group">
      
      {/* Discount Badge */}
      {hasDiscount && (
        <div className="absolute top-2 left-2 z-10">
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.discount || `-${discountPercentage}%`}
          </span>
        </div>
      )}

      {/* Stock Status Badge */}
      {product.stock !== undefined && product.stock <= 10 && (
        <div className="absolute top-2 right-2 z-10">
          <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.stock === 0 ? "Out of Stock" : `Only ${product.stock} left`}
          </span>
        </div>
      )}

      {/* Product Image */}
      <Link href={`/products/${product.id}`}>
        <div className="relative mb-4 cursor-pointer">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Quick View Button (appears on hover) */}
          {showQuickView && (
            <button className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold">
              Quick View
            </button>
          )}
        </div>
      </Link>

      {/* Category */}
      {product.category && (
        <span className="text-xs text-gray-500 font-medium uppercase">
          {product.category}
        </span>
      )}

      {/* Product Name */}
      <Link href={`/products/${product.id}`}>
        <h3 className="text-lg font-semibold text-[#333333] mt-1 mb-2 hover:text-[#4CAF50] transition line-clamp-2">
          {product.name}
        </h3>
      </Link>

      {/* Rating (if available) */}
      {product.rating && (
        <div className="flex items-center gap-1 mb-2">
          <span className="text-yellow-500">⭐</span>
          <span className="text-sm font-medium text-[#333333]">{product.rating}</span>
          {product.reviewCount && (
            <span className="text-xs text-gray-500">({product.reviewCount})</span>
          )}
        </div>
      )}

      {/* Price */}
      <div className="flex items-center gap-2 mb-3">
        <p className="text-2xl font-bold text-[#4CAF50]">
          ${product.price.toFixed(2)}
        </p>
        {product.originalPrice && (
          <p className="text-sm text-gray-500 line-through">
            ${product.originalPrice.toFixed(2)}
          </p>
        )}
      </div>

      {/* Quantity Selector + Add to Cart */}
      <div className="flex items-center gap-2">
        {/* Quantity Controls */}
        <div className="flex items-center border border-[#E5E5E5] rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-2 hover:bg-[#F9F9F9] transition"
          >
            −
          </button>
          <span className="px-3 py-2 font-semibold min-w-[2rem] text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-2 hover:bg-[#F9F9F9] transition"
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding || (product.stock !== undefined && product.stock === 0)}
          className={`flex-1 py-2 rounded-lg font-semibold transition ${
            isAdding
              ? "bg-[#388E3C] text-white"
              : product.stock === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#4CAF50] hover:bg-[#388E3C] text-white"
          }`}
        >
          {isAdding ? "✓ Added" : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>

      {/* Wishlist Button (optional) */}
      <button className="absolute top-2 right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-50">
        <span className="text-xl">🤍</span>
      </button>

    </div>
  );
}

// Compact Product Card (for smaller spaces)
export function ProductCardCompact({ product, onAddToCart }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-3 hover:shadow-lg transition flex items-center gap-3">
      
      {/* Product Image */}
      <Link href={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-20 h-20 object-contain rounded-lg"
        />
      </Link>

      {/* Product Info */}
      <div className="flex-1">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-[#333333] hover:text-[#4CAF50] transition line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-lg font-bold text-[#4CAF50] mt-1">
          ${product.price.toFixed(2)}
        </p>
      </div>

      {/* Add Button */}
      <button
        onClick={() => onAddToCart && onAddToCart(product, 1)}
        className="w-10 h-10 bg-[#4CAF50] hover:bg-[#388E3C] text-white rounded-full flex items-center justify-center transition"
      >
        +
      </button>

    </div>
  );
}

// Product Card Skeleton (for loading state)
export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 animate-pulse">
      <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
      <div className="h-8 bg-gray-200 rounded w-1/2 mb-3"></div>
      <div className="h-10 bg-gray-200 rounded w-full"></div>
    </div>
  );
}