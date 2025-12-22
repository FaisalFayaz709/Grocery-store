"use client";

import { useState, useEffect } from "react";

/**
 * Reusable Carousel Component
 * 
 * Usage:
 * <Carousel images={['/img1.jpg', '/img2.jpg']} autoPlay={true} interval={3000} />
 * <Carousel items={customItems} showDots={true} showArrows={true} />
 */

export default function Carousel({
  images = [],
  items = [],
  autoPlay = false,
  interval = 3000,
  showDots = true,
  showArrows = true,
  height = "h-96",
  className = "",
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = items.length > 0 ? items : images;

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, slides.length, currentIndex]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (slides.length === 0) {
    return (
      <div className={`${height} bg-gray-200 rounded-xl flex items-center justify-center`}>
        <p className="text-gray-500">No items to display</p>
      </div>
    );
  }

  return (
    <div className={`relative ${height} overflow-hidden rounded-xl ${className}`}>
      
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            {typeof slide === "string" ? (
              // If slide is an image URL
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              // If slide is a custom component
              slide
            )}
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      {showArrows && slides.length > 1 && (
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition shadow-lg"
        >
          <span className="text-2xl text-[#333333]">‹</span>
        </button>
      )}

      {/* Right Arrow */}
      {showArrows && slides.length > 1 && (
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition shadow-lg"
        >
          <span className="text-2xl text-[#333333]">›</span>
        </button>
      )}

      {/* Dots */}
      {showDots && slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentIndex
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      )}

      {/* Slide Counter */}
      <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 text-white text-sm rounded-full">
        {currentIndex + 1} / {slides.length}
      </div>

    </div>
  );
}

// Product Carousel (specialized for products)
export function ProductCarousel({ products = [], className = "" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? totalPages - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === totalPages - 1 ? 0 : currentIndex + 1);
  };

  const visibleProducts = products.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <div className={`relative ${className}`}>
      
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-contain mb-3 rounded-lg"
            />
            <h3 className="font-semibold text-[#333333] mb-1">{product.name}</h3>
            <p className="text-xl font-bold text-[#4CAF50] mb-3">
              ${product.price.toFixed(2)}
            </p>
            <button className="w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white py-2 rounded-lg transition">
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {totalPages > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute -left-12 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-[#4CAF50] hover:bg-[#388E3C] text-white rounded-full flex items-center justify-center transition shadow-lg"
          >
            ‹
          </button>

          <button
            onClick={goToNext}
            className="absolute -right-12 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-[#4CAF50] hover:bg-[#388E3C] text-white rounded-full flex items-center justify-center transition shadow-lg"
          >
            ›
          </button>
        </>
      )}

      {/* Dots */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentIndex
                  ? "bg-[#4CAF50] w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}

    </div>
  );
}