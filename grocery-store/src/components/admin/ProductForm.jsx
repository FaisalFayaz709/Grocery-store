"use client";

import { useState } from "react";

/**
 * ProductForm Component
 * Reusable form for creating and editing products in admin panel
 * 
 * Usage:
 * <ProductForm 
 *   initialData={productData}
 *   onSubmit={handleSubmit}
 *   submitLabel="Create Product"
 * />
 */

export default function ProductForm({
  initialData = null,
  onSubmit,
  onCancel,
  submitLabel = "Submit",
  isLoading = false,
}) {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      category: "Fruits",
      price: "",
      stock: "",
      description: "",
      image: "",
      weight: "",
      sku: "",
      tags: "",
      featured: false,
      active: true,
    }
  );

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(initialData?.image || null);

  const categories = [
    "Fruits",
    "Vegetables",
    "Dairy",
    "Snacks",
    "Beverages",
    "Bakery",
    "Meat & Seafood",
    "Frozen Foods",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, image: "Image size must be less than 5MB" });
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors({ ...errors, image: "Please select a valid image file" });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, image: reader.result });
        setErrors({ ...errors, image: "" });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!formData.stock) {
      newErrors.stock = "Stock quantity is required";
    } else if (parseInt(formData.stock) < 0) {
      newErrors.stock = "Stock cannot be negative";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (!formData.image) {
      newErrors.image = "Product image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (onSubmit) {
        onSubmit(formData);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Basic Information Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-[#333333] mb-4">Basic Information</h3>

        <div className="space-y-4">
          
          {/* Product Name */}
          <div>
            <label className="block text-sm font-semibold text-[#333333] mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g., Fresh Organic Apples"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
                errors.name ? "border-red-500" : "border-[#E5E5E5]"
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Category & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-[#333333] mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-3 border border-[#E5E5E5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-[#333333] mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                name="price"
                placeholder="0.00"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
                  errors.price ? "border-red-500" : "border-[#E5E5E5]"
                }`}
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

          </div>

          {/* Stock & Weight */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Stock */}
            <div>
              <label className="block text-sm font-semibold text-[#333333] mb-2">
                Stock Quantity *
              </label>
              <input
                type="number"
                name="stock"
                placeholder="0"
                min="0"
                value={formData.stock}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
                  errors.stock ? "border-red-500" : "border-[#E5E5E5]"
                }`}
              />
              {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm font-semibold text-[#333333] mb-2">
                Weight/Unit (optional)
              </label>
              <input
                type="text"
                name="weight"
                placeholder="e.g., 500g, 1kg, 1 piece"
                value={formData.weight}
                onChange={handleInputChange}
                className="w-full p-3 border border-[#E5E5E5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
              />
            </div>

          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-[#333333] mb-2">
              Description *
            </label>
            <textarea
              name="description"
              placeholder="Describe the product, its features, benefits, etc."
              rows="4"
              value={formData.description}
              onChange={handleInputChange}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
                errors.description ? "border-red-500" : "border-[#E5E5E5]"
              }`}
            ></textarea>
            <p className="text-sm text-gray-600 mt-1">
              {formData.description.length} characters (minimum 10)
            </p>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

        </div>
      </div>

      {/* Additional Details Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-[#333333] mb-4">Additional Details</h3>

        <div className="space-y-4">
          
          {/* SKU & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* SKU */}
            <div>
              <label className="block text-sm font-semibold text-[#333333] mb-2">
                SKU (optional)
              </label>
              <input
                type="text"
                name="sku"
                placeholder="e.g., FRUIT-001"
                value={formData.sku}
                onChange={handleInputChange}
                className="w-full p-3 border border-[#E5E5E5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-semibold text-[#333333] mb-2">
                Tags (optional)
              </label>
              <input
                type="text"
                name="tags"
                placeholder="organic, fresh, local (comma separated)"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full p-3 border border-[#E5E5E5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
              />
            </div>

          </div>

          {/* Checkboxes */}
          <div className="flex flex-wrap gap-6">
            
            {/* Featured */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="w-5 h-5 text-[#4CAF50] rounded focus:ring-2 focus:ring-[#4CAF50]"
              />
              <span className="text-[#333333] font-medium">Featured Product</span>
            </label>

            {/* Active */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleInputChange}
                className="w-5 h-5 text-[#4CAF50] rounded focus:ring-2 focus:ring-[#4CAF50]"
              />
              <span className="text-[#333333] font-medium">Active (Visible to customers)</span>
            </label>

          </div>

        </div>
      </div>

      {/* Product Image Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-[#333333] mb-4">Product Image</h3>

        <div className="space-y-4">
          
          {/* Image Preview */}
          <div className="border-2 border-dashed border-[#E5E5E5] rounded-lg p-6 text-center">
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-w-md h-64 object-contain mx-auto mb-4 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    setFormData({ ...formData, image: "" });
                  }}
                  className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="py-12">
                <p className="text-4xl mb-2">🖼️</p>
                <p className="text-gray-600">No image selected</p>
              </div>
            )}
          </div>

          {/* Upload Button */}
          <label className="block">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="w-full bg-[#F9F9F9] hover:bg-[#E5E5E5] border-2 border-[#E5E5E5] text-[#333333] py-3 rounded-lg font-semibold text-center cursor-pointer transition">
              {imagePreview ? "Change Image" : "Upload Image"}
            </div>
          </label>

          {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}

          <p className="text-sm text-gray-600">
            Recommended: 500x500px, PNG or JPG, max 5MB
          </p>

        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className={`flex-1 py-4 rounded-lg font-semibold text-lg transition shadow-lg ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#4CAF50] hover:bg-[#388E3C] text-white"
          }`}
        >
          {isLoading ? "Submitting..." : submitLabel}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 bg-white border-2 border-[#E5E5E5] text-[#333333] hover:bg-[#F9F9F9] py-4 rounded-lg font-semibold text-lg transition"
          >
            Cancel
          </button>
        )}
      </div>

    </form>
  );
}