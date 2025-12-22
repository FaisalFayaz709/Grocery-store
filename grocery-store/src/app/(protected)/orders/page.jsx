
// "use client";

// import { useEffect } from "react";
// import Link from "next/link";
// import useOrders from "@/hooks/useOrder";
// import useAuth from "@/hooks/useAuth";

// export default function OrdersPage() {
//   const { orders, fetchOrders, loading } = useOrders();
//   const { isAuthenticated } = useAuth();

//   useEffect(() => {
//     if (isAuthenticated) {
//       fetchOrders();
//     }
//   }, [isAuthenticated]);

//   const getStatusIcon = (status) => {
//     const icons = {
//       Pending: "📝",
//       Processing: "⏳",
//       Shipped: "🚚",
//       Delivered: "✅",
//       Cancelled: "❌"
//     };
//     return icons[status] || "📦";
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

//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center">
//         <div className="bg-white rounded-xl shadow-md p-12 text-center max-w-md">
//           <h2 className="text-2xl font-bold text-[#333333] mb-4">Please Login</h2>
//           <p className="text-gray-600 mb-6">You need to login to view your orders</p>
//           <Link href="/auth/login">
//             <button className="bg-[#4CAF50] hover:bg-[#388E3C] text-white px-8 py-3 rounded-lg font-semibold transition">
//               Go to Login
//             </button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#F9F9F9]">
//       <div className="max-w-5xl mx-auto px-6 py-12">
        
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-[#333333] mb-2">Your Orders</h1>
//           <p className="text-gray-600">Track and manage all your orders in one place</p>
//         </div>

//         {loading ? (
//           <div className="text-center py-12">
//             <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#4CAF50]"></div>
//             <p className="mt-4 text-gray-600">Loading orders...</p>
//           </div>
//         ) : orders.length === 0 ? (
//           <div className="bg-white rounded-xl shadow-md p-16 text-center">
//             <div className="text-6xl mb-4">📦</div>
//             <p className="text-2xl text-gray-500 mb-6">No orders yet</p>
//             <Link href="/products">
//               <button className="bg-[#4CAF50] hover:bg-[#388E3C] text-white px-8 py-3 rounded-lg font-semibold transition">
//                 Start Shopping
//               </button>
//             </Link>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {orders.map((order) => (
//               <Link
//                 key={order.id}
//                 href={`/orders/${order.id}`}
//                 className="block bg-white rounded-xl shadow-md hover:shadow-xl transition p-6"
//               >
//                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  
//                   <div className="flex items-start gap-4">
//                     <div className="text-4xl">{getStatusIcon(order.status)}</div>
                    
//                     <div>
//                       <h2 className="text-xl font-bold text-[#333333] mb-1">
//                         Order #{order.id?.slice(0, 8)}...
//                       </h2>
//                       <p className="text-gray-600 text-sm mb-2">
//                         Placed on {new Date(order.createdAt).toLocaleDateString("en-US", {
//                           year: "numeric",
//                           month: "long",
//                           day: "numeric",
//                         })}
//                       </p>
//                       {/* ✅ Fixed: Use orderItems instead of items */}
//                       <p className="text-gray-600 text-sm">
//                         {order.orderItems?.length || 0} item{order.orderItems?.length !== 1 ? "s" : ""}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex flex-col items-end gap-2">
//                     <span className={`px-4 py-2 rounded-full font-semibold text-sm ${getStatusColor(order.status)}`}>
//                       {order.status}
//                     </span>
//                     <p className="text-2xl font-bold text-[#4CAF50]">
//                       ${order.totalAmount?.toFixed(2)}
//                     </p>
//                     <span className="text-[#4CAF50] text-sm font-medium hover:underline">
//                       View Details →
//                     </span>
//                   </div>

//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}

//         {orders.length > 0 && (
//           <div className="mt-12 bg-white rounded-xl shadow-md p-8 text-center">
//             <h3 className="text-xl font-bold text-[#333333] mb-3">
//               Need Help with Your Orders?
//             </h3>
//             <p className="text-gray-600 mb-6">
//               Our customer support team is here to help you
//             </p>
//             <Link href="/contact">
//               <button className="bg-[#4CAF50] hover:bg-[#388E3C] text-white px-8 py-3 rounded-lg font-semibold transition">
//                 Contact Support
//               </button>
//             </Link>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import useOrders from "@/hooks/useOrder";
import useAuth from "@/hooks/useAuth";

export default function OrdersPage() {
  const { orders, fetchOrders, cancelOrder, loading } = useOrders();
  const { isAuthenticated } = useAuth();
  const [cancellingOrderId, setCancellingOrderId] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  const getStatusIcon = (status) => {
    const icons = {
      Pending: "📝",
      Processing: "⏳",
      Shipped: "🚚",
      Delivered: "✅",
      Cancelled: "❌"
    };
    return icons[status] || "📦";
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

  // ✅ NEW: Handle order cancellation
  const handleCancelOrder = async (orderId, e) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation();
    
    if (!confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    setCancellingOrderId(orderId);
    const result = await cancelOrder(orderId);
    
    if (result.success) {
      alert("Order cancelled successfully!");
      fetchOrders(); // Refresh orders list
    } else {
      alert(`Failed to cancel order: ${result.message}`);
    }
    
    setCancellingOrderId(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-md p-12 text-center max-w-md">
          <h2 className="text-2xl font-bold text-[#333333] mb-4">Please Login</h2>
          <p className="text-gray-600 mb-6">You need to login to view your orders</p>
          <Link href="/auth/login">
            <button className="bg-[#4CAF50] hover:bg-[#388E3C] text-white px-8 py-3 rounded-lg font-semibold transition">
              Go to Login
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="max-w-5xl mx-auto px-6 py-12">
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#333333] mb-2">Your Orders</h1>
          <p className="text-gray-600">Track and manage all your orders in one place</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#4CAF50]"></div>
            <p className="mt-4 text-gray-600">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-16 text-center">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-2xl text-gray-500 mb-6">No orders yet</p>
            <Link href="/products">
              <button className="bg-[#4CAF50] hover:bg-[#388E3C] text-white px-8 py-3 rounded-lg font-semibold transition">
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6"
              >
                <Link href={`/orders/${order.id}`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{getStatusIcon(order.status)}</div>
                      
                      <div>
                        <h2 className="text-xl font-bold text-[#333333] mb-1">
                          Order #{order.id?.slice(0, 8)}...
                        </h2>
                        <p className="text-gray-600 text-sm mb-2">
                          Placed on {new Date(order.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {order.orderItems?.length || 0} item{order.orderItems?.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-4 py-2 rounded-full font-semibold text-sm ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <p className="text-2xl font-bold text-[#4CAF50]">
                        ${order.totalAmount?.toFixed(2)}
                      </p>
                      <span className="text-[#4CAF50] text-sm font-medium hover:underline">
                        View Details →
                      </span>
                    </div>

                  </div>
                </Link>

                {/* ✅ NEW: Cancel button - Only show for Pending orders */}
                {order.status === "Pending" && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={(e) => handleCancelOrder(order.id, e)}
                      disabled={cancellingOrderId === order.id}
                      className="w-full md:w-auto px-6 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2"
                    >
                      {cancellingOrderId === order.id ? (
                        <>
                          <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Cancelling...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Cancel Order
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {orders.length > 0 && (
          <div className="mt-12 bg-white rounded-xl shadow-md p-8 text-center">
            <h3 className="text-xl font-bold text-[#333333] mb-3">
              Need Help with Your Orders?
            </h3>
            <p className="text-gray-600 mb-6">
              Our customer support team is here to help you
            </p>
            <Link href="/contact">
              <button className="bg-[#4CAF50] hover:bg-[#388E3C] text-white px-8 py-3 rounded-lg font-semibold transition">
                Contact Support
              </button>
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}