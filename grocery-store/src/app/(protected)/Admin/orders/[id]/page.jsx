// "use client";

// import { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import useOrders from "@/hooks/useOrder";
// import Image from "next/image";

// export default function AdminOrderDetailsPage() {
//   const params = useParams();
//   const router = useRouter();
//   const orderId = params.id;
  
//   const { getOrderById, updateOrderStatus, loading } = useOrders();
//   const [order, setOrder] = useState(null);
//   const [newStatus, setNewStatus] = useState("");

//   // Fetch order details
//   useEffect(() => {
//     if (orderId) {
//       loadOrder();
//     }
//   }, [orderId]);

//   const loadOrder = async () => {
//     const result = await getOrderById(orderId);
//     if (result.success) {
//       setOrder(result.data);
//       setNewStatus(result.data.status);
//     } else {
//       alert("Order not found");
//       router.push("/Admin/orders");
//     }
//   };

//   const handleStatusUpdate = async () => {
//     if (!newStatus || newStatus === order.status) return;
    
//     const result = await updateOrderStatus(orderId, newStatus);
//     if (result.success) {
//       alert("Order status updated successfully!");
//       loadOrder(); // Reload order
//     } else {
//       alert(`Failed: ${result.message}`);
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Pending":
//         return "bg-gray-100 text-gray-800";
//       case "Processing":
//         return "bg-yellow-100 text-yellow-800";
//       case "Shipped":
//         return "bg-blue-100 text-blue-800";
//       case "Delivered":
//         return "bg-green-100 text-green-800";
//       case "Cancelled":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   if (loading || !order) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#4CAF50]"></div>
//           <p className="mt-4 text-gray-600">Loading order details...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto">
//       {/* Header */}
//       <div className="mb-8">
//         <Link href="/Admin/orders">
//           <button className="mb-4 text-[#4CAF50] hover:text-[#45a049] font-medium flex items-center gap-2">
//             ← Back to Orders
//           </button>
//         </Link>
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <h1 className="text-4xl font-bold text-[#333333] mb-2">
//               Order #{order.id.slice(0, 8)}...
//             </h1>
//             <p className="text-gray-600">
//               Placed on {new Date(order.createdAt).toLocaleDateString()} at{" "}
//               {new Date(order.createdAt).toLocaleTimeString()}
//             </p>
//           </div>
//           <div>
//             <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
//               {order.status}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Order Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <p className="text-gray-600 text-sm mb-2">Total Items</p>
//           <p className="text-3xl font-bold text-[#333333]">
//             {order.orderItems?.length || 0}
//           </p>
//         </div>

//         <div className="bg-white rounded-xl shadow-md p-6">
//           <p className="text-gray-600 text-sm mb-2">Total Quantity</p>
//           <p className="text-3xl font-bold text-[#4CAF50]">
//             {order.orderItems?.reduce((sum, item) => sum + item.quantity, 0) || 0}
//           </p>
//         </div>

//         <div className="bg-white rounded-xl shadow-md p-6">
//           <p className="text-gray-600 text-sm mb-2">Order Total</p>
//           <p className="text-3xl font-bold text-[#4CAF50]">
//             ${order.totalAmount?.toFixed(2)}
//           </p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Main Content - Order Items */}
//         <div className="lg:col-span-2">
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h2 className="text-2xl font-bold text-[#333333] mb-6">Order Items</h2>
            
//             {!order.orderItems || order.orderItems.length === 0 ? (
//               <p className="text-gray-500 text-center py-8">No items in this order</p>
//             ) : (
//               <div className="space-y-4">
//                 {order.orderItems.map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-[#4CAF50] transition"
//                   >
//                     {/* Product Image */}
//                     <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
//                       {item.product?.imageUrl ? (
//                         <Image
//                           src={item.product.imageUrl}
//                           alt={item.product.name}
//                           fill
//                           className="object-cover"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center text-gray-400">
//                           <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                           </svg>
//                         </div>
//                       )}
//                     </div>

//                     {/* Product Details */}
//                     <div className="flex-1">
//                       <h3 className="font-bold text-[#333333] text-lg">
//                         {item.product?.name || "Unknown Product"}
//                       </h3>
//                       <p className="text-sm text-gray-600 mt-1">
//                         {item.product?.category || "No category"}
//                       </p>
//                       <p className="text-sm text-gray-600">
//                         Price: ${item.price?.toFixed(2)} each
//                       </p>
//                     </div>

//                     {/* Quantity & Subtotal */}
//                     <div className="text-right">
//                       <p className="text-sm text-gray-600 mb-1">Quantity</p>
//                       <p className="text-2xl font-bold text-[#333333] mb-2">
//                         ×{item.quantity}
//                       </p>
//                       <p className="text-lg font-bold text-[#4CAF50]">
//                         ${(item.price * item.quantity).toFixed(2)}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Order Total */}
//             <div className="mt-6 pt-6 border-t border-gray-200">
//               <div className="flex justify-between items-center">
//                 <p className="text-xl font-bold text-[#333333]">Order Total</p>
//                 <p className="text-2xl font-bold text-[#4CAF50]">
//                   ${order.totalAmount?.toFixed(2)}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Sidebar - Order Info & Actions */}
//         <div className="lg:col-span-1">
//           <div className="space-y-6">
//             {/* Customer Information */}
//             <div className="bg-white rounded-xl shadow-md p-6">
//               <h3 className="text-xl font-bold text-[#333333] mb-4">Customer Info</h3>
//               <div className="space-y-3">
//                 <div>
//                   <p className="text-sm text-gray-600">User ID</p>
//                   <p className="font-medium text-[#333333]">
//                     {order.userId?.slice(0, 8)}...
//                   </p>
//                 </div>
//                 {order.user?.email && (
//                   <div>
//                     <p className="text-sm text-gray-600">Email</p>
//                     <p className="font-medium text-[#333333]">{order.user.email}</p>
//                   </div>
//                 )}
//                 {order.user?.name && (
//                   <div>
//                     <p className="text-sm text-gray-600">Name</p>
//                     <p className="font-medium text-[#333333]">{order.user.name}</p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Delivery Address */}
//             {order.deliveryAddress && (
//               <div className="bg-white rounded-xl shadow-md p-6">
//                 <h3 className="text-xl font-bold text-[#333333] mb-4">Delivery Address</h3>
//                 <p className="text-[#333333] whitespace-pre-line">
//                   {order.deliveryAddress}
//                 </p>
//               </div>
//             )}

//             {/* Update Status */}
//             <div className="bg-white rounded-xl shadow-md p-6">
//               <h3 className="text-xl font-bold text-[#333333] mb-4">Update Status</h3>
//               <select
//                 value={newStatus}
//                 onChange={(e) => setNewStatus(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] text-[#333333]"
//               >
//                 <option value="Pending">Pending</option>
//                 <option value="Processing">Processing</option>
//                 <option value="Shipped">Shipped</option>
//                 <option value="Delivered">Delivered</option>
//                 <option value="Cancelled">Cancelled</option>
//               </select>
//               <button
//                 onClick={handleStatusUpdate}
//                 disabled={newStatus === order.status}
//                 className="w-full py-3 bg-[#4CAF50] hover:bg-[#45a049] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-lg transition"
//               >
//                 Update Status
//               </button>
//             </div>

//             {/* Order Timeline */}
//             <div className="bg-white rounded-xl shadow-md p-6">
//               <h3 className="text-xl font-bold text-[#333333] mb-4">Order Timeline</h3>
//               <div className="space-y-3">
//                 <div className="flex items-start gap-3">
//                   <div className="w-2 h-2 bg-[#4CAF50] rounded-full mt-2"></div>
//                   <div>
//                     <p className="font-medium text-[#333333]">Order Placed</p>
//                     <p className="text-sm text-gray-600">
//                       {new Date(order.createdAt).toLocaleString()}
//                     </p>
//                   </div>
//                 </div>
//                 {order.updatedAt !== order.createdAt && (
//                   <div className="flex items-start gap-3">
//                     <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
//                     <div>
//                       <p className="font-medium text-[#333333]">Last Updated</p>
//                       <p className="text-sm text-gray-600">
//                         {new Date(order.updatedAt).toLocaleString()}
//                       </p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import useOrders from "@/hooks/useOrder";
// import Image from "next/image";

// export default function AdminOrderDetailsPage() {
//   const params = useParams();
//   const router = useRouter();
//   const orderId = params.id;
  
//   const { getOrderById, updateOrderStatus, loading } = useOrders();
//   const [order, setOrder] = useState(null);
//   const [newStatus, setNewStatus] = useState("");

//   useEffect(() => {
//     if (orderId) {
//       loadOrder();
//     }
//   }, [orderId]);

//   const loadOrder = async () => {
//     const result = await getOrderById(orderId);
//     if (result.success) {
//       setOrder(result.data);
//       setNewStatus(result.data.status);
//     } else {
//       alert("Order not found");
//       router.push("/Admin/orders");
//     }
//   };

//   const handleStatusUpdate = async () => {
//     if (!newStatus || newStatus === order.status) return;
    
//     const result = await updateOrderStatus(orderId, newStatus);
//     if (result.success) {
//       alert("Order status updated successfully!");
//       loadOrder();
//     } else {
//       alert(`Failed: ${result.message}`);
//     }
//   };

//   const getStatusColor = (status) => {
//     const colors = {
//       Pending: "bg-gray-100 text-gray-800",
//       Processing: "bg-yellow-100 text-yellow-800",
//       Shipped: "bg-blue-100 text-blue-800",
//       Delivered: "bg-green-100 text-green-800",
//       Cancelled: "bg-red-100 text-red-800"
//     };
//     return colors[status] || "bg-gray-100 text-gray-800";
//   };

//   if (loading || !order) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#4CAF50]"></div>
//           <p className="mt-4 text-gray-600">Loading order details...</p>
//         </div>
//       </div>
//     );
//   }

//   const totalItems = order.items?.length || 0;
//   const totalQuantity = order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       {/* Header */}
//       <div className="mb-8">
//         <Link href="/Admin/orders">
//           <button className="mb-4 text-[#4CAF50] hover:text-[#45a049] font-medium flex items-center gap-2">
//             ← Back to Orders
//           </button>
//         </Link>
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <h1 className="text-4xl font-bold text-[#333333] mb-2">
//               Order #{order.id.slice(0, 8)}...
//             </h1>
//             <p className="text-gray-600">
//               Placed on {new Date(order.createdAt).toLocaleDateString()} at{" "}
//               {new Date(order.createdAt).toLocaleTimeString()}
//             </p>
//           </div>
//           <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
//             {order.status}
//           </span>
//         </div>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <p className="text-gray-600 text-sm mb-2">Unique Items</p>
//           <p className="text-3xl font-bold text-[#333333]">{totalItems}</p>
//         </div>
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <p className="text-gray-600 text-sm mb-2">Total Quantity</p>
//           <p className="text-3xl font-bold text-[#4CAF50]">{totalQuantity}</p>
//         </div>
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <p className="text-gray-600 text-sm mb-2">Order Total</p>
//           <p className="text-3xl font-bold text-[#4CAF50]">
//             ${order.totalAmount?.toFixed(2)}
//           </p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Order Items */}
//         <div className="lg:col-span-2 space-y-6">
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h2 className="text-2xl font-bold text-[#333333] mb-6">Order Items</h2>
            
//             {!order.orderItems || order.orderItems.length === 0 ? (
//               <p className="text-gray-500 text-center py-8">No items in this order</p>
//             ) : (
//               <div className="space-y-4">
//                 {order.orderItems.map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-[#4CAF50] transition"
//                   >
//                     <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
//                       {item.productImage ? (
//                         <Image
//                           src={item.productImage}
//                           alt={item.productName}
//                           fill
//                           className="object-cover"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center text-gray-400">
//                           <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                           </svg>
//                         </div>
//                       )}
//                     </div>

//                     <div className="flex-1">
//                       <h3 className="font-bold text-[#333333] text-lg">
//                         {item.productName}
//                       </h3>
//                       {item.categoryName && (
//                         <p className="text-sm text-gray-600 mt-1">
//                           Category: {item.categoryName}
//                         </p>
//                       )}
//                       <p className="text-sm text-gray-600">
//                         Price: ${item.price?.toFixed(2)} each
//                       </p>
//                     </div>

//                     <div className="text-right">
//                       <p className="text-sm text-gray-600 mb-1">Quantity</p>
//                       <p className="text-2xl font-bold text-[#333333] mb-2">
//                         ×{item.quantity}
//                       </p>
//                       <p className="text-lg font-bold text-[#4CAF50]">
//                         ${(item.price * item.quantity).toFixed(2)}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             <div className="mt-6 pt-6 border-t border-gray-200">
//               <div className="flex justify-between items-center">
//                 <p className="text-xl font-bold text-[#333333]">Order Total</p>
//                 <p className="text-2xl font-bold text-[#4CAF50]">
//                   ${order.totalAmount?.toFixed(2)}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Sidebar */}
//         <div className="lg:col-span-1 space-y-6">
//           {/* Customer Information */}
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h3 className="text-xl font-bold text-[#333333] mb-4 flex items-center gap-2">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//               </svg>
//               Customer Information
//             </h3>
//             <div className="space-y-3">
//               <div>
//                 <p className="text-sm text-gray-600">Full Name</p>
//                 <p className="font-bold text-[#333333] text-lg">
//                   {order.user?.Name || "N/A"}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Email</p>
//                 <p className="font-medium text-[#333333]">
//                   {order.user?.Email || "N/A"}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Phone Number</p>
//                 <p className="font-medium text-[#333333]">
//                   {order.phone || order.user?.Phone || "N/A"}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">User ID</p>
//                 <p className="font-mono text-xs text-gray-500">
//                   {order.userId?.slice(0, 8)}...
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Delivery Address */}
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h3 className="text-xl font-bold text-[#333333] mb-4 flex items-center gap-2">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//               </svg>
//               Delivery Address
//             </h3>
//             <div className="space-y-2">
//               <p className="text-[#333333] font-medium">
//                 {order.deliveryAddress || "No address provided"}
//               </p>
//               {order.city && (
//                 <p className="text-gray-600">City: {order.city}</p>
//               )}
//               {order.postalCode && (
//                 <p className="text-gray-600">Postal Code: {order.postalCode}</p>
//               )}
//             </div>
//           </div>

//           {/* Payment Method */}
//           {order.paymentMethod && (
//             <div className="bg-white rounded-xl shadow-md p-6">
//               <h3 className="text-xl font-bold text-[#333333] mb-4">Payment Method</h3>
//               <p className="text-[#333333] font-medium">{order.paymentMethod}</p>
//             </div>
//           )}

//           {/* Update Status */}
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h3 className="text-xl font-bold text-[#333333] mb-4">Update Status</h3>
//             <select
//               value={newStatus}
//               onChange={(e) => setNewStatus(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] text-[#333333]"
//             >
//               <option value="Pending">Pending</option>
//               <option value="Processing">Processing</option>
//               <option value="Shipped">Shipped</option>
//               <option value="Delivered">Delivered</option>
//               <option value="Cancelled">Cancelled</option>
//             </select>
//             <button
//               onClick={handleStatusUpdate}
//               disabled={newStatus === order.status}
//               className="w-full py-3 bg-[#4CAF50] hover:bg-[#45a049] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-lg transition"
//             >
//               Update Status
//             </button>
//           </div>

//           {/* Timeline */}
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h3 className="text-xl font-bold text-[#333333] mb-4">Order Timeline</h3>
//             <div className="space-y-3">
//               <div className="flex items-start gap-3">
//                 <div className="w-2 h-2 bg-[#4CAF50] rounded-full mt-2"></div>
//                 <div>
//                   <p className="font-medium text-[#333333]">Order Placed</p>
//                   <p className="text-sm text-gray-600">
//                     {new Date(order.createdAt).toLocaleString()}
//                   </p>
//                 </div>
//               </div>
//               {order.updatedAt && order.updatedAt !== order.createdAt && (
//                 <div className="flex items-start gap-3">
//                   <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
//                   <div>
//                     <p className="font-medium text-[#333333]">Last Updated</p>
//                     <p className="text-sm text-gray-600">
//                       {new Date(order.updatedAt).toLocaleString()}
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import useOrders from "@/hooks/useOrder";
import Image from "next/image";

export default function AdminOrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id;
  
  const { getOrderById, updateOrderStatus, loading } = useOrders();
  const [order, setOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    if (orderId) {
      loadOrder();
    }
  }, [orderId]);

  const loadOrder = async () => {
    const result = await getOrderById(orderId);
    if (result.success) {
      setOrder(result.data);
      setNewStatus(result.data.status);
    } else {
      alert("Order not found");
      router.push("/Admin/orders");
    }
  };

  const handleStatusUpdate = async () => {
    if (!newStatus || newStatus === order.status) return;
    
    const result = await updateOrderStatus(orderId, newStatus);
    if (result.success) {
      alert("Order status updated successfully!");
      loadOrder();
    } else {
      alert(`Failed: ${result.message}`);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      Pending: "bg-gray-100 text-gray-800",
      Processing: "bg-yellow-100 text-yellow-800",
      Shipped: "bg-blue-100 text-blue-800",
      Delivered: "bg-green-100 text-green-800",
      Cancelled: "bg-red-100 text-red-800"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (loading || !order) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#4CAF50]"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  const totalItems = order.orderItems?.length || 0;
  const totalQuantity = order.orderItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <Link href="/Admin/orders">
          <button className="mb-4 text-[#4CAF50] hover:text-[#45a049] font-medium flex items-center gap-2">
            ← Back to Orders
          </button>
        </Link>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-[#333333] mb-2">
              Order #{order.id.slice(0, 8)}...
            </h1>
            <p className="text-gray-600">
              Placed on {new Date(order.createdAt).toLocaleDateString()} at{" "}
              {new Date(order.createdAt).toLocaleTimeString()}
            </p>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
            {order.status}
          </span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-600 text-sm mb-2">Unique Items</p>
          <p className="text-3xl font-bold text-[#333333]">{totalItems}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-600 text-sm mb-2">Total Quantity</p>
          <p className="text-3xl font-bold text-[#4CAF50]">{totalQuantity}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-600 text-sm mb-2">Order Total</p>
          <p className="text-3xl font-bold text-[#4CAF50]">
            ${order.totalAmount?.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-[#333333] mb-6">Order Items</h2>
            
            {!order.orderItems || order.orderItems.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No items in this order</p>
            ) : (
              <div className="space-y-4">
                {order.orderItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-[#4CAF50] transition"
                  >
                    <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                      {item.productImage ? (
                        <Image
                          src={item.productImage}
                          alt={item.productName}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-bold text-[#333333] text-lg">
                        {item.productName}
                      </h3>
                      {item.categoryName && (
                        <p className="text-sm text-gray-600 mt-1">
                          Category: {item.categoryName}
                        </p>
                      )}
                      <p className="text-sm text-gray-600">
                        Price: ${item.price?.toFixed(2)} each
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Quantity</p>
                      <p className="text-2xl font-bold text-[#333333] mb-2">
                        ×{item.quantity}
                      </p>
                      <p className="text-lg font-bold text-[#4CAF50]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <p className="text-xl font-bold text-[#333333]">Order Total</p>
                <p className="text-2xl font-bold text-[#4CAF50]">
                  ${order.totalAmount?.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Customer Information */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-[#333333] mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Customer Information
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="font-bold text-[#333333] text-lg">
                  {order.userName || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-[#333333]">
                  {order.userEmail || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone Number</p>
                <p className="font-medium text-[#333333]">
                  {order.phone || order.userPhone || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">User ID</p>
                <p className="font-mono text-xs text-gray-500">
                  {order.userId?.slice(0, 8)}...
                </p>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-[#333333] mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Delivery Address
            </h3>
            <div className="space-y-2">
              <p className="text-[#333333] font-medium">
                {order.deliveryAddress || "No address provided"}
              </p>
              {order.city && (
                <p className="text-gray-600">City: {order.city}</p>
              )}
              {order.postalCode && (
                <p className="text-gray-600">Postal Code: {order.postalCode}</p>
              )}
            </div>
          </div>

          {/* Payment Method */}
          {order.paymentMethod && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-[#333333] mb-4">Payment Method</h3>
              <p className="text-[#333333] font-medium">{order.paymentMethod}</p>
            </div>
          )}

          {/* Update Status */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-[#333333] mb-4">Update Status</h3>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] text-[#333333]"
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <button
              onClick={handleStatusUpdate}
              disabled={newStatus === order.status}
              className="w-full py-3 bg-[#4CAF50] hover:bg-[#45a049] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-lg transition"
            >
              Update Status
            </button>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-[#333333] mb-4">Order Timeline</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#4CAF50] rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-[#333333]">Order Placed</p>
                  <p className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              {order.updatedAt && order.updatedAt !== order.createdAt && (
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-[#333333]">Last Updated</p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}