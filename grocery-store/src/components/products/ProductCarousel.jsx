"use client";

import { useState, useRef, useEffect } from "react";
import ProductCard from "./ProductCard";

/**
 * ProductCarousel Component
 * Displays products in a scrollable carousel
 * 
 * Usage:
 * <ProductCarousel 
 *   title="Best Sellers"
 *   products={products}
 *   onAddToCart={handleAddToCart}
 * />
 */

export default function ProductCarousel({ 
  title,
  products = [],
  onAddToCart,
  itemsPerView = 4,
  showNavigation = true,
  autoPlay = false,
  interval = 5000,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const carouselRef = useRef(null);

  // Calculate total pages
  const totalPages = Math.ceil(products.length / itemsPerView);
  const canGoNext = currentIndex < totalPages - 1;
  const canGoPrev = currentIndex > 0;

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      if (canGoNext) {
        goToNext();
      } else {
        setCurrentIndex(0);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isAutoPlaying, currentIndex, canGoNext]);

  const goToNext = () => {
    if (canGoNext) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const goToPrev = () => {
    if (canGoPrev) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const goToPage = (pageIndex) => {
    setCurrentIndex(pageIndex);
  };

  // Get visible products for current page
  const visibleProducts = products.slice(
    currentIndex * itemsPerView,
    (currentIndex + 1) * itemsPerView
  );

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      
      {/* Header */}
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-[#333333]">{title}</h2>
          
          {/* Desktop Navigation */}
          {showNavigation && totalPages > 1 && (
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={goToPrev}
                disabled={!canGoPrev}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
                  canGoPrev
                    ? "bg-[#4CAF50] hover:bg-[#388E3C] text-white"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                ‹
              </button>
              <button
                onClick={goToNext}
                disabled={!canGoNext}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
                  canGoNext
                    ? "bg-[#4CAF50] hover:bg-[#388E3C] text-white"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                ›
              </button>
            </div>
          )}
        </div>
      )}

      {/* Carousel Container */}
      <div className="relative" ref={carouselRef}>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

      </div>

      {/* Dots Navigation */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-[#4CAF50] w-8"
                  : "bg-gray-300 hover:bg-gray-400 w-2"
              }`}
            />
          ))}
        </div>
      )}

    </div>
  );
}

// Scrollable Product Carousel (alternative layout)
export function ScrollableProductCarousel({ 
  title,
  products = [],
  onAddToCart,
}) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full">
      
      {/* Header */}
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-[#333333]">{title}</h2>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 bg-[#4CAF50] hover:bg-[#388E3C] text-white rounded-full flex items-center justify-center transition"
            >
              ‹
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 bg-[#4CAF50] hover:bg-[#388E3C] text-white rounded-full flex items-center justify-center transition"
            >
              ›
            </button>
          </div>
        </div>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-72">
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>

    </div>
  );
}

// Featured Product Carousel (large cards)
export function FeaturedProductCarousel({ products = [], onAddToCart }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  if (products.length === 0) return null;

  const currentProduct = products[currentIndex];

  return (
    <div className="relative bg-gradient-to-r from-[#4CAF50] to-[#45a049] rounded-xl p-8 text-white">
      
      <div className="flex flex-col md:flex-row items-center gap-8">
        
        {/* Product Image */}
        <div className="flex-1">
          <img
            src={currentProduct.image}
            alt={currentProduct.name}
            className="w-full max-w-md mx-auto h-80 object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 text-center md:text-left">
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
            Featured Product
          </span>
          <h2 className="text-4xl font-bold mb-4">{currentProduct.name}</h2>
          <p className="text-white/90 text-lg mb-6">{currentProduct.description}</p>
          <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
            <p className="text-5xl font-bold">${currentProduct.price.toFixed(2)}</p>
            {currentProduct.originalPrice && (
              <p className="text-2xl line-through text-white/60">
                ${currentProduct.originalPrice.toFixed(2)}
              </p>
            )}
          </div>
          <button
            onClick={() => onAddToCart && onAddToCart(currentProduct, 1)}
            className="bg-white text-[#4CAF50] hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition"
          >
            Add to Cart
          </button>
        </div>

      </div>

      {/* Navigation */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition"
      >
        <span className="text-3xl">‹</span>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition"
      >
        <span className="text-3xl">›</span>
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-white w-8" : "bg-white/40 w-2"
            }`}
          />
        ))}
      </div>

    </div>
  );
}