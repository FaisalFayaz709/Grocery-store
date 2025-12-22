// "use client";

// import { use, useState, useEffect } from "react";
// import Link from "next/link";
// import useProducts from "@/hooks/useProducts";

// export default function ViewProductPage({ params }) {
//   const { id } = use(params);
//   const { categories, getProductById, loading } = useProducts();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     const loadProduct = async () => {
//       const result = await getProductById(id);
//       if (result.success) {
//         setProduct(result.data);
//       }
//     };
//     if (id) loadProduct();
//   }, [id]);

//   const getCategoryName = (categoryId) => {
//     const category = categories.find((c) => c.id === categoryId);
//     return category ? category.name : "Unknown";
//   };

//   const getStockStatus = (stock) => {
//     if (stock === 0) return { text: "Out of Stock", color: "text-red-600" };
//     if (stock < 20) return { text: "Low Stock", color: "text-yellow-600" };
//     return { text: "In Stock", color: "text-green-600" };
//   };

//   if (loading || !product) {
//     return (
//       <div className="text-center py-12">
//         <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#4CAF50]"></div>
//         <p className="mt-4 text-gray-600">Loading product...</p>
//       </div>
//     );
//   }

//   const stockStatus = getStockStatus(product.stock);

//   return (
//     <div>
//       {/* Header */}
//       <div className="flex items-center gap-4 mb-8">
//         <Link href="/Admin/products">
//           <button className="text-[#333333] hover:text-[#4CAF50] text-2xl">←</button>
//         </Link>
//         <div>
//           <h1 className="text-4xl font-bold text-[#333333] mb-2">Product Details</h1>
//           <p className="text-gray-600">View product information</p>
//         </div>
//       </div>

//       {/* Product Details */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
//         {/* Left: Image */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <img
//             src={product.imageUrl || "/placeholder.png"}
//             alt={product.name}
//             className="w-full h-96 object-contain rounded-lg mb-4"
//           />
          
//           <div className="flex gap-3">
//             <Link href={`/Admin/products/edit/${product.id}`} className="flex-1">
//               <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition">
//                 Edit Product
//               </button>
//             </Link>
//             <Link href="/Admin/products" className="flex-1">
//               <button className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition">
//                 Back
//               </button>
//             </Link>
//           </div>
//         </div>

//         {/* Right: Details */}
//         <div className="lg:col-span-2 space-y-6">
          
//           {/* Basic Info */}
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h2 className="text-2xl font-bold text-[#333333] mb-6">Basic Information</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
//               <div>
//                 <label className="block text-sm font-semibold text-gray-600 mb-1">Product Name</label>
//                 <p className="text-lg font-semibold text-[#333333]">{product.name}</p>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-600 mb-1">Category</label>
//                 <p className="text-lg font-semibold text-[#333333]">
//                   {getCategoryName(product.categoryId)}
//                 </p>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-600 mb-1">Price</label>
//                 <p className="text-2xl font-bold text-[#4CAF50]">${product.price.toFixed(2)}</p>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-600 mb-1">Stock</label>
//                 <p className={`text-lg font-semibold ${stockStatus.color}`}>
//                   {product.stock} units ({stockStatus.text})
//                 </p>
//               </div>

//               <div className="md:col-span-2">
//                 <label className="block text-sm font-semibold text-gray-600 mb-1">Description</label>
//                 <p className="text-[#333333] leading-relaxed">
//                   {product.description || "No description available"}
//                 </p>
//               </div>

//             </div>
//           </div>

//           {/* System Info */}
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h2 className="text-2xl font-bold text-[#333333] mb-6">System Information</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
//               <div>
//                 <label className="block text-sm font-semibold text-gray-600 mb-1">Product ID</label>
//                 <p className="text-sm text-[#333333] font-mono">{product.id}</p>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-600 mb-1">Created At</label>
//                 <p className="text-sm text-[#333333]">
//                   {new Date(product.createdAt).toLocaleString()}
//                 </p>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-600 mb-1">Category ID</label>
//                 <p className="text-sm text-[#333333] font-mono">{product.categoryId}</p>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-600 mb-1">Total Value</label>
//                 <p className="text-lg font-bold text-[#4CAF50]">
//                   ${(product.price * product.stock).toFixed(2)}
//                 </p>
//               </div>

//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useProducts from "@/hooks/useProducts";

export default function EditProductPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const { categories, getProductById, updateProduct, loading } = useProducts();

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
  const [productLoading, setProductLoading] = useState(true);

  // Load product data
  useEffect(() => {
    const loadProduct = async () => {
      const result = await getProductById(id);
      if (result.success) {
        const p = result.data;
        setFormData({
          name: p.name,
          categoryId: p.categoryId,
          price: p.price.toString(),
          stock: p.stock.toString(),
          description: p.description,
          imageUrl: p.imageUrl,
        });
        setImagePreview(p.imageUrl);
      }
      setProductLoading(false);
    };

    if (id) loadProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
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

    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      categoryId: formData.categoryId,
      imageUrl: formData.imageUrl,
    };

    const result = await updateProduct(id, productData);

    setSubmitting(false);

    if (result.success) {
      alert("Product updated successfully! 🎉");
      router.push("/Admin/products");
    } else {
      alert(`Error: ${result.message}`);
    }
  };

  if (productLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#4CAF50]"></div>
        <p className="mt-4 text-gray-600">Loading product...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/Admin/products">
          <button className="text-[#333333] hover:text-[#4CAF50] text-2xl">←</button>
        </Link>
        <div>
          <h1 className="text-4xl font-bold text-[#333333] mb-2">Edit Product</h1>
          <p className="text-gray-600">Update product information</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column */}
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
                    errors.name ? "border-red-500" : ""
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
                  className={`w-full p-3 border border-gray-500 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
                    errors.categoryId ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
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
                      errors.price ? "border-red-500" : ""
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
                      errors.stock ? "border-red-500" : ""
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
                    errors.description ? "border-red-500" : ""
                  }`}
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
              </div>

            </div>
          </div>

        </div>

        {/* Right Column */}
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
                {submitting ? "Updating..." : "Update Product"}
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