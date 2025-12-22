// "use client";

// import { useState } from "react";
// import Link from "next/link";

// export default function AdminProductsPage() {
//   const [products, setProducts] = useState([
//     { id: 1, name: "Apple", price: 2.5, category: "Fruits", stock: 150, image: "/apple.png", status: "Active" },
//     { id: 2, name: "Banana", price: 1.0, category: "Fruits", stock: 200, image: "/banana.png", status: "Active" },
//     { id: 3, name: "Avocado", price: 3.0, category: "Fruits", stock: 80, image: "/avocado.png", status: "Active" },
//     { id: 4, name: "Orange", price: 2.2, category: "Fruits", stock: 120, image: "/orange.png", status: "Active" },
//     { id: 5, name: "Carrot", price: 1.5, category: "Vegetables", stock: 95, image: "/carrot.png", status: "Active" },
//     { id: 6, name: "Broccoli", price: 1.8, category: "Vegetables", stock: 50, image: "/broccoli.png", status: "Low Stock" },
//     { id: 7, name: "Milk", price: 2.0, category: "Dairy", stock: 180, image: "/milk.png", status: "Active" },
//     { id: 8, name: "Cheese", price: 4.0, category: "Dairy", stock: 75, image: "/cheese.png", status: "Active" },
//   ]);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterCategory, setFilterCategory] = useState("All");
//   const [filterStatus, setFilterStatus] = useState("All");

//   // Filter products
//   const filteredProducts = products.filter((product) => {
//     const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = filterCategory === "All" || product.category === filterCategory;
//     const matchesStatus = filterStatus === "All" || product.status === filterStatus;
//     return matchesSearch && matchesCategory && matchesStatus;
//   });

//   const handleDelete = (id) => {
//     if (confirm("Are you sure you want to delete this product?")) {
//       setProducts(products.filter((p) => p.id !== id));
//       alert("Product deleted successfully!");
//     }
//   };

//   const getStockStatusColor = (status) => {
//     switch (status) {
//       case "Active":
//         return "bg-green-100 text-green-800";
//       case "Low Stock":
//         return "bg-yellow-100 text-yellow-800";
//       case "Out of Stock":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div>
//       {/* Page Header */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//         <div>
//           <h1 className="text-4xl font-bold text-[#333333] mb-2">Products</h1>
//           <p className="text-gray-600">Manage your product inventory</p>
//         </div>
//         <Link href="/Admin/products/create">
//           <button className="bg-[#4CAF50] hover:bg-[#388E3C] text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg flex items-center gap-2">
//             <span className="text-xl">➕</span> Add New Product
//           </button>
//         </Link>
//       </div>

//       {/* Statistics Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <p className="text-gray-600 text-sm mb-1">Total Products</p>
//           <p className="text-3xl font-bold text-[#333333]">{products.length}</p>
//         </div>
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <p className="text-gray-600 text-sm mb-1">Active Products</p>
//           <p className="text-3xl font-bold text-green-600">
//             {products.filter((p) => p.status === "Active").length}
//           </p>
//         </div>
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <p className="text-gray-600 text-sm mb-1">Low Stock</p>
//           <p className="text-3xl font-bold text-yellow-600">
//             {products.filter((p) => p.status === "Low Stock").length}
//           </p>
//         </div>
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <p className="text-gray-600 text-sm mb-1">Total Value</p>
//           <p className="text-3xl font-bold text-[#4CAF50]">
//             ${products.reduce((sum, p) => sum + p.price * p.stock, 0).toFixed(2)}
//           </p>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-xl shadow-md p-6 mb-8">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
//           {/* Search */}
//           <div>
//             <label className="block text-sm font-semibold text-[#333333] mb-2">
//               Search Products
//             </label>
//             <input
//               type="text"
//               placeholder="Search by name..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full p-3 border border-gray-500 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
//             />
//           </div>

//           {/* Category Filter */}
//           <div>
//             <label className="block text-sm font-semibold text-[#333333] mb-2">
//               Category
//             </label>
//             <select
//               value={filterCategory}
//               onChange={(e) => setFilterCategory(e.target.value)}
//               className="w-full p-3 border border-gray-500 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
//             >
//               <option value="All">All Categories</option>
//               <option value="Fruits">Fruits</option>
//               <option value="Vegetables">Vegetables</option>
//               <option value="Dairy">Dairy</option>
//               <option value="Snacks">Snacks</option>
//             </select>
//           </div>

//           {/* Status Filter */}
//           <div>
//             <label className="block text-sm font-semibold text-[#333333] mb-2">
//               Status
//             </label>
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//               className="w-full p-3 border border-gray-500 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
//             >
//               <option value="All">All Status</option>
//               <option value="Active">Active</option>
//               <option value="Low Stock">Low Stock</option>
//               <option value="Out of Stock">Out of Stock</option>
//             </select>
//           </div>

//         </div>
//       </div>

//       {/* Products Table */}
//       <div className="bg-white rounded-xl shadow-md overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-[#F9F9F9] border-b">
//               <tr>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-[#333333]">Product</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-[#333333]">Category</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-[#333333]">Price</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-[#333333]">Stock</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-[#333333]">Status</th>
//                 <th className="px-6 py-4 text-center text-sm font-semibold text-[#333333]">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredProducts.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
//                     No products found
//                   </td>
//                 </tr>
//               ) : (
//                 filteredProducts.map((product) => (
//                   <tr key={product.id} className="border-b hover:bg-[#F9F9F9] transition">
                    
//                     {/* Product */}
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-3">
//                         <img
//                           src={product.image}
//                           alt={product.name}
//                           className="w-12 h-12 object-contain rounded-lg"
//                         />
//                         <div>
//                           <p className="font-semibold text-[#333333]">{product.name}</p>
//                           <p className="text-sm text-gray-600">ID: {product.id}</p>
//                         </div>
//                       </div>
//                     </td>

//                     {/* Category */}
//                     <td className="px-6 py-4 text-[#333333]">{product.category}</td>

//                     {/* Price */}
//                     <td className="px-6 py-4 font-semibold text-[#4CAF50]">
//                       ${product.price.toFixed(2)}
//                     </td>

//                     {/* Stock */}
//                     <td className="px-6 py-4 text-[#333333]">{product.stock} units</td>

//                     {/* Status */}
//                     <td className="px-6 py-4">
//                       <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStockStatusColor(product.status)}`}>
//                         {product.status}
//                       </span>
//                     </td>

//                     {/* Actions */}
//                     <td className="px-6 py-4">
//                       <div className="flex items-center justify-center gap-2">
//                         <Link href={`/admin/products/edit/${product.id}`}>
//                           <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition text-sm font-medium">
//                             Edit
//                           </button>
//                         </Link>
//                         <button
//                           onClick={() => handleDelete(product.id)}
//                           className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition text-sm font-medium"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Pagination (Optional) */}
//       <div className="mt-6 flex justify-center">
//         <div className="flex items-center gap-2">
//           <button className="px-4 py-2 border rounded-lg hover:bg-[#F9F9F9] transition">
//             Previous
//           </button>
//           <button className="px-4 py-2 bg-[#4CAF50] text-white rounded-lg">1</button>
//           <button className="px-4 py-2 border rounded-lg hover:bg-[#F9F9F9] transition">2</button>
//           <button className="px-4 py-2 border rounded-lg hover:bg-[#F9F9F9] transition">3</button>
//           <button className="px-4 py-2 border rounded-lg hover:bg-[#F9F9F9] transition">
//             Next
//           </button>
//         </div>
//       </div>

//     </div>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import useProducts from "@/hooks/useProducts";

export default function AdminProductsPage() {
  const { products, categories, fetchProducts, deleteProduct, loading } = useProducts();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Get category name by ID
  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : "Unknown";
  };

  // Get stock status
  const getStockStatus = (stock) => {
    if (stock === 0) return "Out of Stock";
    if (stock < 20) return "Low Stock";
    return "Active";
  };

  const getStockStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800";
      case "Out of Stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    const status = getStockStatus(product.stock);
    const categoryName = getCategoryName(product.categoryId);
    
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "All" || categoryName === filterCategory;
    const matchesStatus = filterStatus === "All" || status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const result = await deleteProduct(id);
      if (result.success) {
        alert("Product deleted successfully!");
        fetchProducts(); // Refresh list
      } else {
        alert(`Error: ${result.message}`);
      }
    }
  };

  // Calculate statistics
  const activeProducts = products.filter(p => getStockStatus(p.stock) === "Active").length;
  const lowStockProducts = products.filter(p => getStockStatus(p.stock) === "Low Stock").length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-[#333333] mb-2">Products</h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>
        <Link href="/Admin/products/create">
          <button className="bg-[#4CAF50] hover:bg-[#388E3C] text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg flex items-center gap-2">
            <span className="text-xl">➕</span> Add New Product
          </button>
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-600 text-sm mb-1">Total Products</p>
          <p className="text-3xl font-bold text-[#333333]">{products.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-600 text-sm mb-1">Active Products</p>
          <p className="text-3xl font-bold text-green-600">{activeProducts}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-600 text-sm mb-1">Low Stock</p>
          <p className="text-3xl font-bold text-yellow-600">{lowStockProducts}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-600 text-sm mb-1">Total Value</p>
          <p className="text-3xl font-bold text-[#4CAF50]">
            ${totalValue.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Search */}
          <div>
            <label className="block text-sm font-semibold text-[#333333] mb-2">
              Search Products
            </label>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 border border-gray-500 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-semibold text-[#333333] mb-2">
              Category
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full p-3 border border-gray-500 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-semibold text-[#333333] mb-2">
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full p-3 border border-gray-500 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#4CAF50]"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      )}

      {/* Products Table */}
      {!loading && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F9F9F9] border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#333333]">Product</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#333333]">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#333333]">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#333333]">Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#333333]">Status</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-[#333333]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      No products found
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => {
                    const status = getStockStatus(product.stock);
                    return (
                      <tr key={product.id} className="border-b hover:bg-[#F9F9F9] transition">
                        
                        {/* Product */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.imageUrl || "/placeholder.png"}
                              alt={product.name}
                              className="w-12 h-12 object-contain rounded-lg"
                            />
                            <div>
                              <p className="font-semibold text-[#333333]">{product.name}</p>
                              <p className="text-sm text-gray-600">ID: {product.id.slice(0, 8)}...</p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-6 py-4 text-[#333333]">
                          {getCategoryName(product.categoryId)}
                        </td>

                        {/* Price */}
                        <td className="px-6 py-4 font-semibold text-[#4CAF50]">
                          ${product.price.toFixed(2)}
                        </td>

                        {/* Stock */}
                        <td className="px-6 py-4 text-[#333333]">{product.stock} units</td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStockStatusColor(status)}`}>
                            {status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <Link href={`/Admin/products/view/${product.id}`}>
                              <button className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition text-sm font-medium">
                                View
                              </button>
                            </Link>
                            <Link href={`/Admin/products/edit/${product.id}`}>
                              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition text-sm font-medium">
                                Edit
                              </button>
                            </Link>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition text-sm font-medium"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}