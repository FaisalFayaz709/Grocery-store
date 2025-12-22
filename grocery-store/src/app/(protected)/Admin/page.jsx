// "use client";

// import Link from "next/link";
// import { useEffect } from "react";
// import useAuth from "@/hooks/useAuth";

// export default function AdminDashboard() {

//     const { user, isAuthenticated } = useAuth();

//   useEffect(() => {
//     if (!isAuthenticated || user?.role !== "Admin") {
//       window.location.href = "/Home";
//     }
//   }, [isAuthenticated, user]);
//   // Mock statistics data
//   const stats = [
//     {
//       title: "Total Revenue",
//       value: "$12,450",
//       change: "+12.5%",
//       changeType: "positive",
//       icon: "💰",
//       bgColor: "bg-green-100",
//       textColor: "text-green-800",
//     },
//     {
//       title: "Total Orders",
//       value: "248",
//       change: "+8.2%",
//       changeType: "positive",
//       icon: "📦",
//       bgColor: "bg-blue-100",
//       textColor: "text-blue-800",
//     },
//     {
//       title: "Total Products",
//       value: "156",
//       change: "+5",
//       changeType: "positive",
//       icon: "🛍️",
//       bgColor: "bg-purple-100",
//       textColor: "text-purple-800",
//     },
//     {
//       title: "Total Customers",
//       value: "1,234",
//       change: "+15.3%",
//       changeType: "positive",
//       icon: "👥",
//       bgColor: "bg-orange-100",
//       textColor: "text-orange-800",
//     },
//   ];

//   // Recent orders
//   const recentOrders = [
//     { id: "101", customer: "John Doe", total: 45.99, status: "Processing", date: "2025-01-28" },
//     { id: "102", customer: "Jane Smith", total: 32.50, status: "Shipped", date: "2025-01-28" },
//     { id: "103", customer: "Mike Johnson", total: 78.20, status: "Delivered", date: "2025-01-27" },
//     { id: "104", customer: "Sarah Williams", total: 25.00, status: "Processing", date: "2025-01-27" },
//     { id: "105", customer: "Tom Brown", total: 54.75, status: "Shipped", date: "2025-01-26" },
//   ];

//   // Top products
//   const topProducts = [
//     { id: 1, name: "Apple", sales: 234, revenue: "$585.00", image: "/apple.png" },
//     { id: 2, name: "Banana", sales: 189, revenue: "$189.00", image: "/banana.png" },
//     { id: 3, name: "Avocado", sales: 156, revenue: "$468.00", image: "/avocado.png" },
//     { id: 4, name: "Orange", sales: 142, revenue: "$312.40", image: "/orange.png" },
//   ];

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Processing":
//         return "bg-yellow-100 text-yellow-800";
//       case "Shipped":
//         return "bg-blue-100 text-blue-800";
//       case "Delivered":
//         return "bg-green-100 text-green-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <>
//       {/* Page Header */}
//       <div className="mb-8">
//         <h1 className="text-4xl font-bold text-[#333333] mb-2">Dashboard</h1>
//         <p className="text-gray-600">Welcome back, Admin! Here's what's happening today.</p>
//       </div>

//       {/* Statistics Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {stats.map((stat, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center text-2xl`}>
//                 {stat.icon}
//               </div>
//               <span className={`text-sm font-semibold ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
//                 {stat.change}
//               </span>
//             </div>
//             <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
//             <p className="text-3xl font-bold text-[#333333]">{stat.value}</p>
//           </div>
//         ))}
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

//         {/* Revenue Chart Placeholder */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <h2 className="text-2xl font-bold text-[#333333] mb-6">Revenue Overview</h2>
//           <div className="h-64 flex items-center justify-center bg-[#F9F9F9] rounded-lg">
//             <div className="text-center">
//               <p className="text-4xl mb-2">📈</p>
//               <p className="text-gray-600">Chart will be displayed here</p>
//             </div>
//           </div>
//         </div>

//         {/* Orders Chart Placeholder */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <h2 className="text-2xl font-bold text-[#333333] mb-6">Order Statistics</h2>
//           <div className="h-64 flex items-center justify-center bg-[#F9F9F9] rounded-lg">
//             <div className="text-center">
//               <p className="text-4xl mb-2">📊</p>
//               <p className="text-gray-600">Chart will be displayed here</p>
//             </div>
//           </div>
//         </div>

//       </div>

//       {/* Recent Orders & Top Products */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

//         {/* Recent Orders */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-2xl font-bold text-[#333333]">Recent Orders</h2>
//             <Link href="/Admin/orders" className="text-[#4CAF50] hover:underline font-medium">
//               View All →
//             </Link>
//           </div>

//           <div className="space-y-4">
//             {recentOrders.map((order) => (
//               <div key={order.id} className="flex items-center justify-between p-4 hover:bg-[#F9F9F9] rounded-lg transition">
//                 <div className="flex-1">
//                   <p className="font-semibold text-[#333333]">Order #{order.id}</p>
//                   <p className="text-sm text-gray-600">{order.customer}</p>
//                   <p className="text-xs text-gray-500">{order.date}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-bold text-[#333333] mb-2">${order.total.toFixed(2)}</p>
//                   <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
//                     {order.status}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Top Products */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-2xl font-bold text-[#333333]">Top Products</h2>
//             <Link href="/Admin/products" className="text-[#4CAF50] hover:underline font-medium">
//               View All →
//             </Link>
//           </div>

//           <div className="space-y-4">
//             {topProducts.map((product, index) => (
//               <div key={product.id} className="flex items-center gap-4 p-4 hover:bg-[#F9F9F9] rounded-lg transition">
//                 <div className="text-2xl font-bold text-gray-400 w-8">
//                   #{index + 1}
//                 </div>
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="w-12 h-12 object-contain rounded-lg"
//                 />
//                 <div className="flex-1">
//                   <p className="font-semibold text-[#333333]">{product.name}</p>
//                   <p className="text-sm text-gray-600">{product.sales} sales</p>
//                 </div>
//                 <p className="font-bold text-[#4CAF50]">{product.revenue}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>

//     </>
//   );
// }

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import useOrders from "@/hooks/useOrder";
import useProducts from "@/hooks/useProducts";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const { orders, fetchAllOrders } = useOrders();
  const { products, fetchProducts } = useProducts();

  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
  });

  // const revenueChartData = orders.reduce((acc, order) => {
  //   const date = new Date(order.createdAt).toLocaleDateString();

  //   const existing = acc.find((d) => d.date === date);
  //   if (existing) {
  //     existing.revenue += order.totalAmount;
  //   } else {
  //     acc.push({ date, revenue: order.totalAmount });
  //   }

  //   return acc;
  // }, []);
  const revenueChartData = orders.map(order => ({
    time: new Date(order.createdAt).toLocaleDateString(), // or toLocaleTimeString()
    revenue: order.totalAmount,
  }));


  const orderStatusData = [
    {
      name: "Pending",
      value: orders.filter((o) => o.status === "Pending").length,
    },
    {
      name: "Processing",
      value: orders.filter((o) => o.status === "Processing").length,
    },
    {
      name: "Shipped",
      value: orders.filter((o) => o.status === "Shipped").length,
    },
    {
      name: "Delivered",
      value: orders.filter((o) => o.status === "Delivered").length,
    },
  ];

  const STATUS_COLORS = ["#9E9E9E", "#FFC107", "#2196F3", "#4CAF50"];

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "Admin") {
      window.location.href = "/Home";
    } else {
      // Fetch data
      fetchAllOrders();
      fetchProducts();
    }
  }, [isAuthenticated, user]);

  // Calculate statistics
  useEffect(() => {
    if (orders.length > 0) {
      const revenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
      const uniqueCustomers = new Set(orders.map((o) => o.userId)).size;

      setStats({
        totalRevenue: revenue,
        totalOrders: orders.length,
        totalProducts: products.length,
        totalCustomers: uniqueCustomers,
      });
    }
  }, [orders, products]);

  // Get recent orders (last 5)
  const recentOrders = orders.slice(0, 5);

  // Get top products by order frequency
  const getTopProducts = () => {
    const productCounts = {};

    orders.forEach((order) => {
      order.items?.forEach((item) => {
        if (!productCounts[item.productId]) {
          productCounts[item.productId] = {
            id: item.productId,
            name: item.productName,
            image: item.productImage,
            sales: 0,
            revenue: 0,
          };
        }
        productCounts[item.productId].sales += item.quantity;
        productCounts[item.productId].revenue += item.totalPrice;
      });
    });

    return Object.values(productCounts)
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 4);
  };

  const topProducts = getTopProducts();

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-gray-100 text-gray-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const RevenueTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white px-4 py-3 rounded-lg shadow-lg">
          <p className="text-xs text-gray-400 mb-1">{label}</p>
          <p className="text-lg font-bold text-green-400">
            Total: ${stats.totalRevenue.toFixed(2)}
          </p>
          <p className="text-xs text-gray-400">Total Revenue</p>
        </div>
      );
    }
    return null;
  };


  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#333333] mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, {user?.fullName || "Admin"}! Here's what's happening
          today.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center text-2xl">
              💰
            </div>
            <span className="text-sm font-semibold text-green-600">
              +{orders.length > 0 ? "12.5%" : "0%"}
            </span>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Total Revenue</h3>
          <p className="text-3xl font-bold text-[#333333]">
            ${stats.totalRevenue.toFixed(2)}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-2xl">
              📦
            </div>
            <span className="text-sm font-semibold text-green-600">
              +{orders.length > 0 ? "8.2%" : "0%"}
            </span>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Total Orders</h3>
          <p className="text-3xl font-bold text-[#333333]">
            {stats.totalOrders}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center text-2xl">
              🛍️
            </div>
            <span className="text-sm font-semibold text-green-600">
              +{products.length > 0 ? "5" : "0"}
            </span>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Total Products</h3>
          <p className="text-3xl font-bold text-[#333333]">
            {stats.totalProducts}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center text-2xl">
              👥
            </div>
            <span className="text-sm font-semibold text-green-600">
              +{stats.totalCustomers > 0 ? "15.3%" : "0%"}
            </span>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Total Customers</h3>
          <p className="text-3xl font-bold text-[#333333]">
            {stats.totalCustomers}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Chart Placeholder */}
        {/* <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-[#333333] mb-6">Revenue Overview</h2>
          <div className="h-64 flex items-center justify-center bg-[#F9F9F9] rounded-lg">
            <div className="text-center">
              <p className="text-4xl mb-2">📈</p>
              <p className="text-gray-600">Chart will be displayed here</p>
              <p className="text-sm text-gray-500 mt-2">Total: ${stats.totalRevenue.toFixed(2)}</p>
            </div>
          </div>
        </div> */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-[#333333] mb-4">
            Revenue Market Overview
          </h2>

          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueChartData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4CAF50" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#4CAF50" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.15} />

              <XAxis
                dataKey="time"
                tick={{ fill: "#888", fontSize: 12 }}
              />

              <YAxis
                tick={{ fill: "#888", fontSize: 12 }}
              />

              {/* ✅ Custom Tooltip */}
              <Tooltip content={<RevenueTooltip />} />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#4CAF50"
                strokeWidth={3}
                fill="url(#revenueGradient)"
                dot={false}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>


        {/* Orders Chart Placeholder */}
        {/* <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-[#333333] mb-6">Order Statistics</h2>
          <div className="h-64 flex flex-col items-center justify-center bg-[#F9F9F9] rounded-lg p-4">
            <div className="text-center mb-4">
              <p className="text-4xl mb-2">📊</p>
              <p className="text-gray-600">Order Status Breakdown</p>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-600">
                  {orders.filter(o => o.status === "Pending").length}
                </p>
                <p className="text-xs text-gray-500">Pending</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">
                  {orders.filter(o => o.status === "Processing").length}
                </p>
                <p className="text-xs text-gray-500">Processing</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {orders.filter(o => o.status === "Shipped").length}
                </p>
                <p className="text-xs text-gray-500">Shipped</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {orders.filter(o => o.status === "Delivered").length}
                </p>
                <p className="text-xs text-gray-500">Delivered</p>
              </div>
            </div>
          </div>
        </div> */}

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-[#333333] mb-6">
            Order Statistics
          </h2>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={orderStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {orderStatusData.map((_, index) => (
                  <Cell key={index} fill={STATUS_COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#333333]">Recent Orders</h2>
            <Link
              href="/Admin/orders"
              className="text-[#4CAF50] hover:underline font-medium"
            >
              View All →
            </Link>
          </div>

          {recentOrders.length > 0 ? (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 hover:bg-[#F9F9F9] rounded-lg transition"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-[#333333]">
                      Order #{order.id.slice(0, 8)}...
                    </p>
                    <p className="text-sm text-gray-600">
                      User: {order.userId.slice(0, 8)}...
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#333333] mb-2">
                      ${order.totalAmount.toFixed(2)}
                    </p>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No orders yet</p>
            </div>
          )}
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#333333]">Top Products</h2>
            <Link
              href="/Admin/products"
              className="text-[#4CAF50] hover:underline font-medium"
            >
              View All →
            </Link>
          </div>

          {topProducts.length > 0 ? (
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-4 hover:bg-[#F9F9F9] rounded-lg transition"
                >
                  <div className="text-2xl font-bold text-gray-400 w-8">
                    #{index + 1}
                  </div>
                  <img
                    src={product.image || "/placeholder.png"}
                    alt={product.name}
                    className="w-12 h-12 object-contain rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-[#333333]">
                      {product.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {product.sales} sales
                    </p>
                  </div>
                  <p className="font-bold text-[#4CAF50]">
                    ${product.revenue.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No sales data yet</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
