// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import useUserProducts from "@/hooks/useUserProducts";
// import useCart from "@/hooks/useCart";

// export default function HomePage() {
//   const { products, categories, loading } = useUserProducts();
//   const { addToCart } = useCart();

//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [cart, setCart] = useState([
//     { id: 1, name: "Apple", qty: 2, price: 2.5, image: "/apple.png" },
//     { id: 2, name: "Banana", qty: 3, price: 1.0, image: "/banana.png" },
//     { id: 3, name: "Avocado", qty: 1, price: 3.0, image: "/avacado.png" },
//   ]);

//   // Get category name by ID
//   const getCategoryName = (categoryId) => {
//     const category = categories.find((c) => c.id === categoryId);
//     return category ? category.name : "Unknown";
//   };

//   // Filter products by selected category
//   const filteredProducts = selectedCategory === "All" 
//     ? products.slice(0, 8) // Show first 8 products if "All"
//     : products.filter(p => getCategoryName(p.categoryId) === selectedCategory).slice(0, 8);

//   // Get category buttons
//   const categoryButtons = ["All", ...categories.map(c => c.name)];

//   // Cart total
//   const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

//   // Add to cart handler
//   const handleAddToCart = async (product) => {
//     const result = await addToCart(product, 1);
//     if (result.success) {
//       alert(`${product.name} added to cart! 🛒`);
//     } else {
//       alert(result.message || "Please login to add items to cart");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#F9F9F9]">
//       {/* ========== HERO SECTION ========== */}
//       <section className="bg-linear-to-br from-[#4CAF50] to-[#45a049] text-white px-6 py-20 md:py-32">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10">
//           <div>
//             <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
//               Fresh & Healthy<br />Groceries
//             </h1>
//             <p className="text-lg md:text-xl mb-8 text-white/90">
//               Get your daily groceries delivered to your doorstep
//             </p>
//             <Link href="/products">
//               <button className="bg-[#FF9800] hover:bg-[#F57C00] text-white px-8 py-4 rounded-lg font-semibold text-lg transition shadow-lg">
//                 Shop Now
//               </button>
//             </Link>
//           </div>

//           <div className="flex justify-center">
//             <img 
//               src="grocery-store/src/project/public/avacado.png" 
//               alt="Avocado" 
//               className="w-80 h-80 object-contain drop-shadow-2xl"
//             />
//           </div>
//         </div>
//       </section>

//       {/* ========== PRODUCTS SECTION ========== */}
//       <section className="px-6 py-12 max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-3xl font-bold text-[#333333]">Products</h2>
//           <Link href="/products">
//             <button className="text-[#4CAF50] hover:text-[#388E3C] font-semibold">
//               View All →
//             </button>
//           </Link>
//         </div>

//         {/* Loading State */}
//         {loading ? (
//           <div className="text-center py-12">
//             <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#4CAF50]"></div>
//             <p className="mt-4 text-gray-600">Loading products...</p>
//           </div>
//         ) : (
//           <>
//             {/* Category Filters */}
//             <div className="flex flex-wrap gap-3 mb-8">
//               {categoryButtons.map((cat) => (
//                 <button
//                   key={cat}
//                   onClick={() => setSelectedCategory(cat)}
//                   className={`px-6 py-3 rounded-lg font-medium transition ${
//                     selectedCategory === cat
//                       ? "bg-[#4CAF50] text-white"
//                       : "bg-white text-[#333333] border border-[#E5E5E5] hover:bg-[#f2f2f2]"
//                   }`}
//                 >
//                   {cat}
//                 </button>
//               ))}
//             </div>

//             {/* Product Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {filteredProducts.length > 0 ? (
//                 filteredProducts.map((product) => (
//                   <div
//                     key={product.id}
//                     className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition relative"
//                   >
//                     {product.stock < 20 && product.stock > 0 && (
//                       <span className="absolute top-3 left-3 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
//                         Low Stock
//                       </span>
//                     )}
//                     {product.stock === 0 && (
//                       <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
//                         Out of Stock
//                       </span>
//                     )}

//                     <Link href={`/products/${product.id}`}>
//                       <img
//                         src={product.imageUrl || "/placeholder.png"}
//                         alt={product.name}
//                         className="w-full h-48 object-contain mb-4 cursor-pointer"
//                       />

//                       <h3 className="text-xl font-semibold text-[#333333] mb-2">
//                         {product.name}
//                       </h3>

//                       <p className="text-sm text-gray-500 mb-2">
//                         {getCategoryName(product.categoryId)}
//                       </p>

//                       <p className="text-2xl font-bold text-[#4CAF50] mb-4">
//                         ${product.price.toFixed(2)}
//                       </p>
//                     </Link>

//                     <button 
//                       onClick={() => handleAddToCart(product)}
//                       disabled={product.stock === 0}
//                       className="w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
//                     </button>
//                   </div>
//                 ))
//               ) : (
//                 <div className="col-span-4 text-center py-12 text-gray-500">
//                   <p className="text-xl">No products found in this category.</p>
//                 </div>
//               )}
//             </div>
//           </>
//         )}
//       </section>

//       {/* ========== RECOMMENDED FOR YOU ========== */}
//       <section className="px-6 py-12 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-3xl font-bold text-[#333333] mb-8">
//             Recommended for You
//           </h2>

//           <div className="bg-[#F9F9F9] p-8 rounded-xl text-center">
//             <p className="text-lg text-gray-600 mb-4">
//               🤖 AI-Powered Recommendations Coming Soon!
//             </p>
//             <p className="text-sm text-gray-500">
//               Our Python recommendation engine will suggest products based on your purchase history.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* ========== ORDER OVERVIEW (CART SUMMARY) ========== */}
//       <section className="px-6 py-12 max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-3xl font-bold text-[#333333]">Your Cart</h2>
//           <Link href="/cart">
//             <button className="text-[#4CAF50] hover:text-[#388E3C] font-semibold">
//               View Full Cart →
//             </button>
//           </Link>
//         </div>

//         {cart.length > 0 ? (
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <div className="space-y-4 mb-6">
//               {cart.map((item) => (
//                 <div key={item.id} className="flex items-center justify-between border-b pb-4">
//                   <div className="flex items-center gap-4">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-12 h-12 object-contain"
//                     />
//                     <span className="font-semibold text-[#333333]">{item.name}</span>
//                   </div>

//                   <div className="flex items-center gap-8">
//                     <span className="text-gray-600">{item.qty} × ${item.price.toFixed(2)}</span>
//                     <span className="font-bold text-[#333333]">
//                       ${(item.qty * item.price).toFixed(2)}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="flex justify-between items-center pt-4 border-t">
//               <span className="text-xl font-bold text-[#333333]">Total:</span>
//               <span className="text-2xl font-bold text-[#4CAF50]">
//                 ${totalAmount.toFixed(2)}
//               </span>
//             </div>

//             <div className="mt-6">
//               <Link href="/checkout">
//                 <button className="w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white px-8 py-4 rounded-lg font-semibold transition shadow-lg">
//                   Proceed to Checkout
//                 </button>
//               </Link>
//             </div>
//           </div>
//         ) : (
//           <div className="bg-white rounded-xl shadow-md p-12 text-center">
//             <p className="text-xl text-gray-500 mb-4">Your cart is empty</p>
//             <Link href="/products">
//               <button className="bg-[#4CAF50] hover:bg-[#388E3C] text-white px-6 py-3 rounded-lg font-semibold transition">
//                 Start Shopping
//               </button>
//             </Link>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import useRecommendations from "@/hooks/useRecommendations";
import useUserProducts from "@/hooks/useUserProducts";
import useCart from "@/hooks/useCart";

export default function HomePage() {
  const { products, categories } = useUserProducts();
  const { user, isAuthenticated } = useAuth();
  const { recommendations, loading, fetchUserRecommendations, fetchPopularProducts } = useRecommendations();
  const { addToCart } = useCart();

  const [selectedCategory, setSelectedCategory] = useState("All");

  //   // Get category name by ID
  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : "Unknown";
  };

  //   // Filter products by selected category
  const filteredProducts = selectedCategory === "All" 
    ? products.slice(0, 8) // Show first 8 products if "All"
    : products.filter(p => getCategoryName(p.categoryId) === selectedCategory).slice(0, 8);

   // Get category buttons
  const categoryButtons = ["All", ...categories.map(c => c.name)];

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      // Fetch personalized recommendations for logged-in users
      fetchUserRecommendations(user.id);
    } else {
      // Fetch popular products for guests
      fetchPopularProducts();
    }
  }, [isAuthenticated, user]);

  const handleAddToCart = async (product) => {
    const result = await addToCart(product, 1);
    if (result.success) {
      alert(`${product.name} added to cart!`);
    } else {
      alert(`Failed to add to cart: ${result.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#4CAF50] to-[#45a049] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Welcome to Smart Grocery Store 🥬
          </h1>
          <p className="text-xl mb-8">
            Fresh groceries delivered to your doorstep
          </p>
          <Link href="/products">
            <button className="bg-[#FF9800] hover:bg-[#F57C00] text-white px-8 py-4 rounded-lg font-semibold text-lg transition shadow-lg">
              Shop Now
            </button>
          </Link>
        </div>
      </section>

      {/* ========== PRODUCTS SECTION ========== */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-[#333333]">Products</h2>
          <Link href="/products">
            <button className="text-[#4CAF50] hover:text-[#388E3C] font-semibold">
              View All →
            </button>
          </Link>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#4CAF50]"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : (
          <>
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 mb-8">
              {categoryButtons.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-3 rounded-lg font-medium transition ${selectedCategory === cat
                      ? "bg-[#4CAF50] text-white"
                      : "bg-white text-[#333333] border border-[#E5E5E5] hover:bg-[#f2f2f2]"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition relative"
                  >
                    {product.stock < 20 && product.stock > 0 && (
                      <span className="absolute top-3 left-3 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                        Low Stock
                      </span>
                    )}

                    {product.stock === 0 && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        Out of Stock
                      </span>
                    )}

                    <Link href={`/products/${product.id}`}>
                      <img
                        src={product.imageUrl || "/placeholder.png"}
                        alt={product.name}
                        className="w-full h-48 object-contain mb-4 cursor-pointer"
                      />

                      <h3 className="text-xl font-semibold text-[#333333] mb-2">
                        {product.name}
                      </h3>

                      <p className="text-sm text-gray-500 mb-2">
                        {getCategoryName(product.categoryId)}
                      </p>

                      <p className="text-2xl font-bold text-[#4CAF50] mb-4">
                        ${product.price.toFixed(2)}
                      </p>
                    </Link>

                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      className="w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-4 text-center py-12 text-gray-500">
                  <p className="text-xl">No products found in this category.</p>
                </div>
              )}
            </div>
          </>
        )}
      </section>

      {/* Recommendations Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#333333] mb-2">
            {isAuthenticated ? "Recommended For You 🎯" : "Popular Products 🔥"}
          </h2>
          <p className="text-gray-600">
            {isAuthenticated
              ? "Personalized recommendations based on your shopping history"
              : "Top picks loved by our customers"}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#4CAF50]"></div>
            <p className="mt-4 text-gray-600">Loading recommendations...</p>
          </div>
        ) : recommendations.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">No recommendations available yet</p>
            <Link href="/products">
              <button className="bg-[#4CAF50] hover:bg-[#388E3C] text-white px-6 py-3 rounded-lg font-semibold transition">
                Browse All Products
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recommendations.slice(0, 8).map((product) => (
              <div
                key={product.id || product.productId}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
              >
                <div className="relative h-48 bg-gray-100">
                  <img
                    src={product.imageUrl || "/placeholder.png"}
                    alt={product.name || product.productName}
                    className="w-full h-full object-contain p-4"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-[#333333] text-lg mb-2 truncate">
                    {product.name || product.productName}
                  </h3>

                  <p className="text-2xl font-bold text-[#4CAF50] mb-4">
                    ${product.price?.toFixed(2)}
                  </p>

                  <div className="flex gap-2">
                    <Link href={`/products/${product.id || product.productId}`} className="flex-1">
                      <button className="w-full bg-gray-200 hover:bg-gray-300 text-[#333333] py-2 rounded-lg font-semibold transition">
                        View
                      </button>
                    </Link>

                    <button
                      onClick={() => handleAddToCart({
                        id: product.id || product.productId,
                        name: product.name || product.productName,
                        price: product.price,
                        imageUrl: product.imageUrl
                      })}
                      className="flex-1 bg-[#4CAF50] hover:bg-[#388E3C] text-white py-2 rounded-lg font-semibold transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {recommendations.length > 8 && (
          <div className="text-center mt-8">
            <Link href="/products">
              <button className="bg-[#4CAF50] hover:bg-[#388E3C] text-white px-8 py-3 rounded-lg font-semibold transition">
                View All Products
              </button>
            </Link>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#333333] text-center mb-12">
            Why Choose Us?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl mb-4">🚚</div>
              <h3 className="text-xl font-bold text-[#333333] mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your groceries delivered within 24 hours</p>
            </div>

            <div className="text-center">
              <div className="text-6xl mb-4">🌿</div>
              <h3 className="text-xl font-bold text-[#333333] mb-2">Fresh Products</h3>
              <p className="text-gray-600">We source the freshest produce daily</p>
            </div>

            <div className="text-center">
              <div className="text-6xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-[#333333] mb-2">Best Prices</h3>
              <p className="text-gray-600">Competitive prices on all products</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#4CAF50] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Shopping Today!</h2>
          <p className="text-xl mb-8">Join thousands of happy customers</p>

          {!isAuthenticated ? (
            <div className="flex gap-4 justify-center">
              <Link href="/auth/register">
                <button className="bg-white text-[#4CAF50] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
                  Sign Up
                </button>
              </Link>
              <Link href="/auth/login">
                <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-[#4CAF50] transition">
                  Login
                </button>
              </Link>
            </div>
          ) : (
            <Link href="/products">
              <button className="bg-white text-[#4CAF50] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
                Browse Products
              </button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}