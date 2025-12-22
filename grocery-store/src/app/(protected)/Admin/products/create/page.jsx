// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";


// export default function CreateProductPage() {
//   const router = useRouter();
  

//   const [formData, setFormData] = useState({
//     name: "",
//     category: "Fruits",
//     price: "",
//     stock: "",
//     description: "",
//     image: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [imagePreview, setImagePreview] = useState(null);

//   const categories = ["Fruits", "Vegetables", "Dairy", "Snacks", "Beverages", "Bakery"];

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setErrors({ ...errors, [name]: "" });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//         setFormData({ ...formData, image: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.name.trim()) newErrors.name = "Product name is required";
//     if (!formData.price) newErrors.price = "Price is required";
//     else if (parseFloat(formData.price) <= 0) newErrors.price = "Price must be greater than 0";
//     if (!formData.stock) newErrors.stock = "Stock quantity is required";
//     else if (parseInt(formData.stock) < 0) newErrors.stock = "Stock cannot be negative";
//     if (!formData.description.trim()) newErrors.description = "Description is required";
//     if (!formData.image) newErrors.image = "Product image is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       // Simulate API call (replace with actual API call)
//       alert("Product created successfully! 🎉");
//       router.push("/admin/products");
//     }
//   };

//   return (
//     <div>
//       {/* Page Header */}
//       <div className="flex items-center gap-4 mb-8">
//         <Link href="/Admin/products">
//           <button className="text-[#333333] hover:text-[#4CAF50] text-2xl">←</button>
//         </Link>
//         <div>
//           <h1 className="text-4xl font-bold text-[#333333] mb-2">Add New Product</h1>
//           <p className="text-gray-600">Create a new product for your store</p>
//         </div>
//       </div>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
//         {/* Left Column - Main Info */}
//         <div className="lg:col-span-2 space-y-6">
          
//           {/* Basic Information */}
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h2 className="text-2xl font-bold text-[#333333] mb-6">Basic Information</h2>

//             <div className="space-y-4">
              
//               {/* Product Name */}
//               <div>
//                 <label className="block text-sm font-semibold text-[#333333] mb-2">
//                   Product Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Enter product name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className={`w-full p-3 border border-gray-500 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
//                     errors.name ? "border-red-500" : "border-[#E5E5E5]"
//                   }`}
//                 />
//                 {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
//               </div>

//               {/* Category */}
//               <div>
//                 <label className="block text-sm font-semibold text-[#333333] mb-2">
//                   Category *
//                 </label>
//                 <select
//                   name="category"
//                   value={formData.category}
//                   onChange={handleInputChange}
//                   className="w-full p-3 border border-gray-500 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
//                 >
//                   {categories.map((cat) => (
//                     <option key={cat} value={cat}>
//                       {cat}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Price & Stock */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
//                 {/* Price */}
//                 <div>
//                   <label className="block text-sm font-semibold text-[#333333] mb-2">
//                     Price ($) *
//                   </label>
//                   <input
//                     type="number"
//                     name="price"
//                     placeholder="0.00"
//                     step="0.01"
//                     value={formData.price}
//                     onChange={handleInputChange}
//                     className={`w-full p-3 border border-gray-500 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
//                       errors.price ? "border-red-500" : "border-[#E5E5E5]"
//                     }`}
//                   />
//                   {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
//                 </div>

//                 {/* Stock */}
//                 <div>
//                   <label className="block text-sm font-semibold text-[#333333] mb-2">
//                     Stock Quantity *
//                   </label>
//                   <input
//                     type="number"
//                     name="stock"
//                     placeholder="0"
//                     value={formData.stock}
//                     onChange={handleInputChange}
//                     className={`w-full p-3 border border-gray-500 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
//                       errors.stock ? "border-red-500" : "border-[#E5E5E5]"
//                     }`}
//                   />
//                   {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
//                 </div>

//               </div>

//               {/* Description */}
//               <div>
//                 <label className="block text-sm font-semibold text-[#333333] mb-2">
//                   Description *
//                 </label>
//                 <textarea
//                   name="description"
//                   placeholder="Enter product description"
//                   rows="4"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   className={`w-full p-3 border border-gray-500 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
//                     errors.description ? "border-red-500" : "border-[#E5E5E5]"
//                   }`}
//                 ></textarea>
//                 {errors.description && (
//                   <p className="text-red-500 text-sm mt-1">{errors.description}</p>
//                 )}
//               </div>

//             </div>
//           </div>

//           {/* Additional Information */}
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h2 className="text-2xl font-bold text-[#333333] mb-6">Additional Information</h2>

//             <div className="space-y-4">
              
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
//                 {/* Weight */}
//                 <div>
//                   <label className="block text-sm font-semibold text-[#333333] mb-2">
//                     Weight (optional)
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="e.g., 500g, 1kg"
//                     className="w-full p-3 border border-gray-500 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
//                   />
//                 </div>

//                 {/* SKU */}
//                 <div>
//                   <label className="block text-sm font-semibold text-[#333333] mb-2">
//                     SKU (optional)
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="e.g., FRUIT-001"
//                     className="w-full p-3 border border-gray-500 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
//                   />
//                 </div>

//               </div>

//               {/* Tags */}
//               <div>
//                 <label className="block text-sm font-semibold text-[#333333] mb-2">
//                   Tags (optional)
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="organic, fresh, local (comma separated)"
//                   className="w-full p-3 border border-gray-500 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
//                 />
//               </div>

//             </div>
//           </div>

//         </div>

//         {/* Right Column - Image & Actions */}
//         <div className="space-y-6">
          
//           {/* Product Image */}
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h2 className="text-2xl font-bold text-[#333333] mb-6">Product Image</h2>

//             <div className="space-y-4">
              
//               {/* Image Preview */}
//               <div className="border-2 border-dashed border-[#E5E5E5] rounded-lg p-6 text-center">
//                 {imagePreview ? (
//                   <img
//                     src={imagePreview}
//                     alt="Preview"
//                     className="w-full h-48 object-contain mb-4"
//                   />
//                 ) : (
//                   <div className="py-12">
//                     <p className="text-4xl mb-2">🖼️</p>
//                     <p className="text-gray-600">No image selected</p>
//                   </div>
//                 )}
//               </div>

//               {/* Upload Button */}
//               <label className="block">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="hidden"
//                 />
//                 <div className="w-full bg-[#F9F9F9] hover:bg-[#E5E5E5] border-2 border-[#E5E5E5] text-[#333333] py-3 rounded-lg font-semibold text-center cursor-pointer transition">
//                   {imagePreview ? "Change Image" : "Upload Image"}
//                 </div>
//               </label>

//               {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}

//               <p className="text-sm text-gray-600">
//                 Recommended: 500x500px, PNG or JPG, max 5MB
//               </p>

//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h2 className="text-2xl font-bold text-[#333333] mb-6">Actions</h2>

//             <div className="space-y-3">
//               <button
//                 type="submit"
//                 className="w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white py-4 rounded-lg font-semibold transition shadow-lg"
//               >
//                 Create Product
//               </button>

//               <Link href="/Admin/products">
//                 <button
//                   type="button"
//                   className="w-full bg-white border-2 border-[#E5E5E5] text-[#333333] hover:bg-[#F9F9F9] py-4 rounded-lg font-semibold transition"
//                 >
//                   Cancel
//                 </button>
//               </Link>
//             </div>
//           </div>

//         </div>

//       </form>
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useProducts from "@/hooks/useProducts";

export default function CreateProductPage() {
  const router = useRouter();
  const { categories, createProduct, loading } = useProducts();

  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    price: "",
    stock: "",
    description: "",
    imageUrl: "",
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Set default category when categories load
  useEffect(() => {
    if (categories.length > 0 && !formData.categoryId) {
      setFormData(prev => ({ ...prev, categoryId: categories[0].id }));
    }
  }, [categories]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, imageUrl: "Image must be less than 5MB" });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.categoryId) newErrors.categoryId = "Category is required";
    if (!formData.price) newErrors.price = "Price is required";
    else if (parseFloat(formData.price) <= 0) newErrors.price = "Price must be greater than 0";
    if (!formData.stock) newErrors.stock = "Stock quantity is required";
    else if (parseInt(formData.stock) < 0) newErrors.stock = "Stock cannot be negative";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.imageUrl) newErrors.imageUrl = "Product image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);

    // Prepare data for API
    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      categoryId: formData.categoryId,
      imageUrl: formData.imageUrl, // Base64 image
    };

    console.log("Sending product data:", productData);

    const result = await createProduct(productData);

    setSubmitting(false);

    if (result.success) {
      alert("Product created successfully! 🎉");
      router.push("/Admin/products");
    } else {
      alert(`Error: ${result.message}`);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/Admin/products">
          <button className="text-[#333333] hover:text-[#4CAF50] text-2xl">←</button>
        </Link>
        <div>
          <h1 className="text-4xl font-bold text-[#333333] mb-2">Add New Product</h1>
          <p className="text-gray-600">Create a new product for your store</p>
        </div>
      </div>

      {/* Loading State */}
      {loading && categories.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading categories...</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-[#333333] mb-6">Basic Information</h2>

            <div className="space-y-4">
              
              {/* Product Name */}
              <div>
                <label className="block text-sm font-semibold text-[#333333] mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full p-3 border border-gray-500 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
                    errors.name ? "border-red-500" : "border-[#E5E5E5]"
                  }`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-[#333333] mb-2">
                  Category *
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  disabled={categories.length === 0}
                  className={`w-full p-3 border border-gray-500 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
                    errors.categoryId ? "border-red-500" : ""
                  }`}
                >
                  {categories.length === 0 ? (
                    <option>Loading categories...</option>
                  ) : (
                    <>
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </>
                  )}
                </select>
                {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>}
              </div>

              {/* Price & Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
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
                    value={formData.price}
                    onChange={handleInputChange}
                    className={`w-full p-3 border border-gray-500 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
                      errors.price ? "border-red-500" : "border-[#E5E5E5]"
                    }`}
                  />
                  {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-sm font-semibold text-[#333333] mb-2">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    placeholder="0"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className={`w-full p-3 border border-gray-500 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
                      errors.stock ? "border-red-500" : "border-[#E5E5E5]"
                    }`}
                  />
                  {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
                </div>

              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-[#333333] mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  placeholder="Enter product description"
                  rows="4"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`w-full p-3 border border-gray-500 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
                    errors.description ? "border-red-500" : "border-[#E5E5E5]"
                  }`}
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
              </div>

            </div>
          </div>

        </div>

        {/* Right Column - Image & Actions */}
        <div className="space-y-6">
          
          {/* Product Image */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-[#333333] mb-6">Product Image</h2>

            <div className="space-y-4">
              
              {/* Image Preview */}
              <div className="border-2 border-dashed border-[#E5E5E5] rounded-lg p-6 text-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-contain mb-4"
                  />
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

              {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl}</p>}

              <p className="text-sm text-gray-600">
                Recommended: 500x500px, PNG or JPG, max 5MB
              </p>

            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-[#333333] mb-6">Actions</h2>

            <div className="space-y-3">
              <button
                type="submit"
                disabled={submitting || loading}
                className="w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white py-4 rounded-lg font-semibold transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Creating..." : "Create Product"}
              </button>

              <Link href="/Admin/products">
                <button
                  type="button"
                  className="w-full bg-white border-2 border-[#E5E5E5] text-[#333333] hover:bg-[#F9F9F9] py-4 rounded-lg font-semibold transition"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </div>

        </div>

      </form>
    </div>
  );
}