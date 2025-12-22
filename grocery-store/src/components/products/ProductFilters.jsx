"use client";

import { useState } from "react";

/**
 * ProductFilters Component
 * Provides filtering and sorting options for products
 * 
 * Usage:
 * <ProductFilters 
 *   filters={filters}
 *   onFilterChange={handleFilterChange}
 * />
 */

export default function ProductFilters({
  categories = [],
  priceRange = { min: 0, max: 100 },
  onFilterChange,
  onSortChange,
  onSearchChange,
  activeFilters = {},
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(activeFilters.category || "all");
  const [sortBy, setSortBy] = useState(activeFilters.sort || "");
  const [priceMin, setPriceMin] = useState(activeFilters.priceMin || priceRange.min);
  const [priceMax, setPriceMax] = useState(activeFilters.priceMax || priceRange.max);
  const [showFilters, setShowFilters] = useState(false);

  // Handle search
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearchChange) {
      onSearchChange(query);
    }
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (onFilterChange) {
      onFilterChange({ category, priceMin, priceMax });
    }
  };

  // Handle sort change
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    if (onSortChange) {
      onSortChange(value);
    }
  };

  // Handle price filter
  const handlePriceFilter = () => {
    if (onFilterChange) {
      onFilterChange({ category: selectedCategory, priceMin, priceMax });
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("");
    setPriceMin(priceRange.min);
    setPriceMax(priceRange.max);
    if (onFilterChange) {
      onFilterChange({ category: "all", priceMin: priceRange.min, priceMax: priceRange.max });
    }
    if (onSortChange) {
      onSortChange("");
    }
    if (onSearchChange) {
      onSearchChange("");
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Search Bar & Sort */}
      <div className="flex flex-col md:flex-row gap-4">
        
        {/* Search Input */}
        <div className="flex-1">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-11 pr-4 py-3 border border-[#E5E5E5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
            />
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="w-full md:w-64">
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="w-full p-3 border border-[#E5E5E5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
          >
            <option value="">Sort By</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest First</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
        >
          <span>🔧</span> Filters
        </button>

      </div>

      {/* Filters Panel */}
      <div className={`${showFilters ? "block" : "hidden"} md:block`}>
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
          
          {/* Category Filter */}
          <div>
            <h3 className="text-lg font-bold text-[#333333] mb-4">Categories</h3>
            <div className="space-y-2">
              <button
                onClick={() => handleCategoryChange("all")}
                className={`w-full text-left px-4 py-2 rounded-lg transition ${
                  selectedCategory === "all"
                    ? "bg-[#4CAF50] text-white"
                    : "bg-[#F9F9F9] text-[#333333] hover:bg-[#E5E5E5]"
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    selectedCategory === category
                      ? "bg-[#4CAF50] text-white"
                      : "bg-[#F9F9F9] text-[#333333] hover:bg-[#E5E5E5]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <h3 className="text-lg font-bold text-[#333333] mb-4">Price Range</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-1">Min</label>
                  <input
                    type="number"
                    value={priceMin}
                    onChange={(e) => setPriceMin(Number(e.target.value))}
                    min={priceRange.min}
                    max={priceMax}
                    className="w-full p-2 border border-[#E5E5E5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                  />
                </div>
                <span className="text-gray-500 mt-6">-</span>
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-1">Max</label>
                  <input
                    type="number"
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    min={priceMin}
                    max={priceRange.max}
                    className="w-full p-2 border border-[#E5E5E5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                  />
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="pt-2">
                <input
                  type="range"
                  min={priceRange.min}
                  max={priceRange.max}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <button
                onClick={handlePriceFilter}
                className="w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white py-2 rounded-lg font-semibold transition"
              >
                Apply Price Filter
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategory !== "all" || sortBy || searchQuery) && (
            <div>
              <h3 className="text-lg font-bold text-[#333333] mb-4">Active Filters</h3>
              <div className="flex flex-wrap gap-2">
                {selectedCategory !== "all" && (
                  <span className="px-3 py-1 bg-[#4CAF50] text-white rounded-full text-sm font-medium flex items-center gap-2">
                    {selectedCategory}
                    <button onClick={() => handleCategoryChange("all")} className="hover:text-red-200">
                      ×
                    </button>
                  </span>
                )}
                {sortBy && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium flex items-center gap-2">
                    Sort: {sortBy}
                    <button onClick={() => handleSortChange({ target: { value: "" } })} className="hover:text-red-600">
                      ×
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium flex items-center gap-2">
                    Search: {searchQuery}
                    <button onClick={() => handleSearch({ target: { value: "" } })} className="hover:text-red-600">
                      ×
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Clear All Button */}
          <button
            onClick={clearFilters}
            className="w-full bg-white border-2 border-[#E5E5E5] text-[#333333] hover:bg-[#F9F9F9] py-2 rounded-lg font-semibold transition"
          >
            Clear All Filters
          </button>

        </div>
      </div>

    </div>
  );
}

// Compact Filter Bar (horizontal layout)
export function CompactFilterBar({
  categories = [],
  onCategoryChange,
  onSortChange,
  activeCategory = "all",
}) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 bg-white rounded-xl shadow-md p-4">
      
      {/* Category Buttons */}
      <div className="flex flex-wrap gap-2 flex-1">
        <button
          onClick={() => onCategoryChange("all")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            activeCategory === "all"
              ? "bg-[#4CAF50] text-white"
              : "bg-[#F9F9F9] text-[#333333] hover:bg-[#E5E5E5]"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeCategory === category
                ? "bg-[#4CAF50] text-white"
                : "bg-[#F9F9F9] text-[#333333] hover:bg-[#E5E5E5]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Sort Dropdown */}
      <select
        onChange={(e) => onSortChange(e.target.value)}
        className="px-4 py-2 border border-[#E5E5E5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
      >
        <option value="">Sort By</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A to Z</option>
      </select>

    </div>
  );
}