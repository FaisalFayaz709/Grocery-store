// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import useUserProducts from "@/hooks/useUserProducts";

// export default function ProductsPage() {
//   const { products, categories, loading } = useUserProducts();

//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortOrder, setSortOrder] = useState("");

//   // Get category name by ID
//   const getCategoryName = (categoryId) => {
//     const category = categories.find((c) => c.id === categoryId);
//     return category ? category.name : "Unknown";
//   };

//   // Filter products by category and search
//   let filteredProducts = products.filter((p) => {
//     const categoryName = getCategoryName(p.categoryId);
//     const matchesCategory =
//       selectedCategory === "All" || categoryName === selectedCategory;
//     const matchesSearch = p.name
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   // Sort products
//   if (sortOrder === "low-high") {
//     filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
//   } else if (sortOrder === "high-low") {
//     filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
//   }

//   // Get unique category names
//   // const categoryNames = [
//   //   "All",
//   //   ...categories.map((c) => c.name),
//   // ];

//   //   const categoryNames = [
//   //   "All",
//   //   ...(categories?.map((c) => c.name) || []),
//   // ];

//   const categoryNames = ["All"];

//   if (categories && categories.length > 0) {
//     categoryNames.push(...categories.map((c) => c.name));
//   }

//   const handleAddToCart = (product) => {
//     alert(`Added ${product.name} to cart!`);
//   };




//   return (
//     <div className="min-h-screen bg-[#F9F9F9] p-6">
//       {/* Page Title */}
//       <h1 className="text-3xl font-bold text-[#333333] mb-6 text-center font-[Poppins]">
//         Shop Products 🛒
//       </h1>

//       {/* Loading State */}
//       {loading && (
//         <div className="text-center py-12">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#4CAF50]"></div>
//           <p className="mt-4 text-gray-600">Loading products...</p>
//         </div>
//       )}

//       {/* Main Content */}
//       {!loading && (
//         <>
//           {/* Search + Sort Row */}
//           <div className="flex flex-col md:flex-row gap-4 mb-6">
//             {/* Search Bar */}
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="w-full md:w-1/3 p-2 text-gray-800 border border-gray-500 rounded-md"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />

//             {/* Sort Dropdown */}
//             <select
//               className="w-full md:w-40 p-2 border text-gray-800 border-gray-500 rounded-md"
//               onChange={(e) => setSortOrder(e.target.value)}
//             >
//               <option value="">Sort By</option>
//               <option value="low-high">Price: Low → High</option>
//               <option value="high-low">Price: High → Low</option>
//             </select>
//           </div>

//           {/* Category Filter Buttons */}
//           <div className="flex flex-wrap gap-3 mb-6">
//             {categoryNames.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setSelectedCategory(cat)}
//                 className={`px-4 py-2 rounded-md border transition ${selectedCategory === cat
//                   ? "bg-[#4CAF50] text-white border-[#4CAF50]"
//                   : "bg-white text-[#333333] border-[#E5E5E5] hover:bg-[#f2f2f2]"
//                   }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>

//           {/* Product Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {filteredProducts.length > 0 ? (
//               filteredProducts.map((p) => (
//                 <div
//                   key={p.id}
//                   className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition cursor-pointer"
//                 >
//                   <Link href={`/products/${p.id}`}>
//                     <img
//                       src={p.imageUrl || "/placeholder.png"}
//                       alt={p.name}
//                       className="w-full h-48 object-cover rounded-md mb-3"
//                     />
//                     <h2 className="text-lg font-semibold text-[#333333] mb-1">
//                       {p.name}
//                     </h2>
//                     <p className="text-sm text-gray-500 mb-2">
//                       {getCategoryName(p.categoryId)}
//                     </p>
//                     <p className="text-[#4CAF50] font-bold text-lg mb-3">
//                       ${p.price.toFixed(2)}
//                     </p>
//                   </Link>

//                   <button
//                     onClick={() => handleAddToCart(p)}
//                     disabled={p.stock === 0}
//                     className="w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white py-4 rounded-lg font-semibold text-lg transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {p.stock > 0 ? "Add to Cart" : "Out of Stock"}
//                   </button>

//                 </div>
//               ))
//             ) : (
//               <div className="text-center text-gray-500 col-span-full py-12">
//                 <p className="text-xl">No products found.</p>
//                 <p className="text-sm mt-2">Try adjusting your filters.</p>
//               </div>
//             )}
//           </div>

//           {/* Stats Footer */}
//           <div className="mt-8 text-center text-gray-600">
//             <p>
//               Showing {filteredProducts.length} of {products.length} products
//             </p>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import Link from "next/link";
import useUserProducts from "@/hooks/useUserProducts";
import useCart from "@/hooks/useCart";

export default function ProductsPage() {
  const { products, categories, loading } = useUserProducts();
  const { addToCart } = useCart();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  // Get category name by ID
  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : "Unknown";
  };

  // Filter products by category and search
  let filteredProducts = products.filter((p) => {
    const categoryName = getCategoryName(p.categoryId);
    const matchesCategory =
      selectedCategory === "All" || categoryName === selectedCategory;
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  if (sortOrder === "low-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  // Get unique category names
  const categoryNames = [
    "All",
    ...categories.map((c) => c.name),
  ];

  return (
    <div className="min-h-screen bg-[#F9F9F9] p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-[#333333] mb-6 text-center font-[Poppins]">
        Shop Products 🛒
      </h1>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#4CAF50]"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      )}

      {/* Main Content */}
      {!loading && (
        <>
          {/* Search + Sort Row */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search products..."
              className="w-full md:w-1/3 p-2 text-gray-800 border border-gray-500 rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Sort Dropdown */}
            <select
              className="w-full md:w-40 p-2 border text-gray-800 border-gray-500 rounded-md"
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="low-high">Price: Low → High</option>
              <option value="high-low">Price: High → Low</option>
            </select>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            {categoryNames.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-md border transition ${
                  selectedCategory === cat
                    ? "bg-[#4CAF50] text-white border-[#4CAF50]"
                    : "bg-white text-[#333333] border-[#E5E5E5] hover:bg-[#f2f2f2]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition cursor-pointer"
                >
                  <Link href={`/products/${p.id}`}>
                    <img
                      src={p.imageUrl || "/placeholder.png"}
                      alt={p.name}
                      className="w-full h-48 object-cover rounded-md mb-3"
                    />
                    <h2 className="text-lg font-semibold text-[#333333] mb-1">
                      {p.name}
                    </h2>
                    <p className="text-sm text-gray-500 mb-2">
                      {getCategoryName(p.categoryId)}
                    </p>
                    <p className="text-[#4CAF50] font-bold text-lg mb-3">
                      ${p.price.toFixed(2)}
                    </p>
                  </Link>
{/* 
                  <button 
                    onClick={() => handleAddToCart(p)}
                    className="w-full bg-[#4CAF50] text-white py-2 rounded-md hover:bg-[#388E3C] transition">
                    Add to Cart
                  </button> */}
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 col-span-full py-12">
                <p className="text-xl">No products found.</p>
                <p className="text-sm mt-2">Try adjusting your filters.</p>
              </div>
            )}
          </div>

          {/* Stats Footer */}
          <div className="mt-8 text-center text-gray-600">
            <p>
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>
        </>
      )}
    </div>
  );
}