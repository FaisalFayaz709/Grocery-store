

// "use client";

// import { use, useState, useEffect } from "react";
// import Link from "next/link";
// import useOrders from "@/hooks/useOrder";
// import Image from "next/image";

// export default function OrderTracking({ params }) {
//   const { id } = use(params);
//   const { getOrderById, loading } = useOrders();
  
//   const [order, setOrder] = useState(null);

//   useEffect(() => {
//     const loadOrder = async () => {
//       const result = await getOrderById(id);
//       if (result.success) {
//         setOrder(result.data);
//       }
//     };
    
//     if (id) {
//       loadOrder();
//     }
//   }, [id]);

//   const getTrackingSteps = (currentStatus) => {
//     const allSteps = [
//       {
//         step: "Order Placed",
//         icon: "📝",
//         status: "completed",
//         statusName: "Pending",
//         description: "Your order has been received",
//       },
//       {
//         step: "Processing",
//         icon: "⚙️",
//         status: "pending",
//         statusName: "Processing",
//         description: "We're preparing your items",
//       },
//       {
//         step: "Shipped",
//         icon: "🚚",
//         status: "pending",
//         statusName: "Shipped",
//         description: "Your order is on the way",
//       },
//       {
//         step: "Delivered",
//         icon: "✅",
//         status: "pending",
//         statusName: "Delivered",
//         description: "Order successfully delivered",
//       },
//     ];

//     const statusOrder = ["Pending", "Processing", "Shipped", "Delivered"];
//     const currentIndex = statusOrder.indexOf(currentStatus);

//     return allSteps.map((step, index) => {
//       const stepIndex = statusOrder.indexOf(step.statusName);
      
//       if (stepIndex < currentIndex) {
//         return { ...step, status: "completed", date: "" };
//       } else if (stepIndex === currentIndex) {
//         return { ...step, status: "active", date: "In Progress" };
//       } else {
//         return { ...step, status: "pending", date: "" };
//       }
//     });
//   };

//   if (loading || !order) {
//     return (
//       <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#4CAF50]"></div>
//           <p className="mt-4 text-gray-600">Loading order details...</p>
//         </div>
//       </div>
//     );
//   }

//   const trackingSteps = getTrackingSteps(order.status);

//   return (
//     <div className="min-h-screen bg-[#F9F9F9]">
      
//       <nav className="bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-50">
//         <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-[#333333]">
//           <span className="text-3xl">🥬</span> GROCERY
//         </Link>
//         <Link href="/orders" className="text-[#03A9F4] hover:underline">
//           ← Back to Orders
//         </Link>
//       </nav>

//       <div className="max-w-5xl mx-auto px-6 py-12">
        
//         {/* Header */}
//         <div className="bg-white rounded-xl shadow-md p-8 mb-8">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//             <div>
//               <h1 className="text-3xl font-bold text-[#333333] mb-2">
//                 Order #{order.id.slice(0, 13)}
//               </h1>
//               <p className="text-gray-600">
//                 Placed on {new Date(order.createdAt).toLocaleDateString("en-US", {
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 })}
//               </p>
//             </div>
//             <div className="text-right">
//               <p className="text-sm text-gray-600 mb-1">Order Total</p>
//               <p className="text-3xl font-bold text-[#4CAF50]">
//                 ${order.totalAmount.toFixed(2)}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Tracking Progress */}
//         <div className="bg-white rounded-xl shadow-md p-8 mb-8">
//           <h2 className="text-2xl font-bold text-[#333333] mb-6">
//             Tracking Information
//           </h2>

//           <div className="space-y-6">
//             {trackingSteps.map((step, index) => (
//               <div
//                 key={index}
//                 className={`flex gap-6 pb-6 ${
//                   index < trackingSteps.length - 1 ? "border-b" : ""
//                 }`}
//               >
//                 <div className="relative flex-shrink-0">
//                   <div
//                     className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${
//                       step.status === "completed"
//                         ? "bg-green-100"
//                         : step.status === "active"
//                         ? "bg-blue-100"
//                         : "bg-gray-100"
//                     }`}
//                   >
//                     {step.icon}
//                   </div>
//                   {index < trackingSteps.length - 1 && (
//                     <div
//                       className={`absolute left-1/2 top-16 w-0.5 h-6 transform -translate-x-1/2 ${
//                         step.status === "completed" ? "bg-green-500" : "bg-gray-300"
//                       }`}
//                     ></div>
//                   )}
//                 </div>

//                 <div className="flex-1">
//                   <h3
//                     className={`text-lg font-bold mb-1 ${
//                       step.status === "completed" || step.status === "active"
//                         ? "text-[#333333]"
//                         : "text-gray-400"
//                     }`}
//                   >
//                     {step.step}
//                   </h3>
//                   <p
//                     className={`text-sm mb-2 ${
//                       step.status === "completed" || step.status === "active"
//                         ? "text-gray-600"
//                         : "text-gray-400"
//                     }`}
//                   >
//                     {step.description}
//                   </p>
//                   {step.date && (
//                     <p className="text-sm text-[#4CAF50] font-medium">{step.date}</p>
//                   )}
//                 </div>

//                 {step.status === "completed" && (
//                   <span className="text-green-600 font-bold text-xl">✓</span>
//                 )}
//                 {step.status === "active" && (
//                   <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold h-fit">
//                     In Progress
//                   </span>
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="mt-8 p-6 bg-[#F9F9F9] rounded-lg">
//             <div className="flex items-center gap-3">
//               <span className="text-3xl">📊</span>
//               <div>
//                 <p className="text-sm text-gray-600">Current Status</p>
//                 <p className="text-xl font-bold text-[#333333]">{order.status}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Order Items */}
//         <div className="bg-white rounded-xl shadow-md p-8 mb-8">
//           <h2 className="text-2xl font-bold text-[#333333] mb-6">Order Items</h2>

//           <div className="space-y-4">
//             {/* ✅ Fixed: Use orderItems instead of items */}
//             {order.orderItems && order.orderItems.length > 0 ? (
//               order.orderItems.map((item) => (
//                 <div key={item.id} className="flex items-center gap-4 pb-4 border-b">
//                   {/* ✅ Fixed: Use Next.js Image component with proper handling */}
//                   <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
//                     {item.productImage ? (
//                       <Image
//                         src={item.productImage}
//                         alt={item.productName}
//                         fill
//                         className="object-cover"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center text-gray-400">
//                         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                         </svg>
//                       </div>
//                     )}
//                   </div>
                  
//                   <div className="flex-1">
//                     <h3 className="font-semibold text-[#333333] mb-1">
//                       {item.productName}
//                     </h3>
//                     <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
//                     <p className="text-sm text-gray-500">
//                       ${item.price?.toFixed(2)} each
//                     </p>
//                   </div>
//                   <p className="font-bold text-[#4CAF50]">
//                     ${(item.price * item.quantity).toFixed(2)}
//                   </p>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 text-center py-8">No items found</p>
//             )}
//           </div>

//           <div className="mt-6 pt-6 border-t">
//             <div className="flex justify-between text-lg font-bold text-[#333333]">
//               <span>Total Amount</span>
//               <span className="text-[#4CAF50]">${order.totalAmount.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row gap-4">
//           <Link href="/products" className="flex-1">
//             <button className="w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white py-4 rounded-lg font-semibold transition">
//               Continue Shopping
//             </button>
//           </Link>
//           <Link href="/contact" className="flex-1">
//             <button className="w-full bg-white border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#F9F9F9] py-4 rounded-lg font-semibold transition">
//               Contact Support
//             </button>
//           </Link>
//         </div>

//       </div>
//     </div>
//   );
// }


"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useOrders from "@/hooks/useOrder";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";

export default function OrderTracking({ params }) {
  const { id } = use(params);
  const { user } = useAuth();
  const router = useRouter();
  const { getOrderById, cancelOrder, loading } = useOrders();
  
  const [order, setOrder] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    if (!id) return;
    const result = await getOrderById(id);
    if (result.success) {
      setOrder(result.data);
    }
  };

  // ✅ NEW: Handle order cancellation
  const handleCancelOrder = async () => {
    if (!confirm("Are you sure you want to cancel this order? This action cannot be undone.")) {
      return;
    }

    setCancelling(true);
    const result = await cancelOrder(id);
    
    if (result.success) {
      alert("Order cancelled successfully!");
      router.push("/orders");
    } else {
      alert(`Failed to cancel order: ${result.message}`);
      setCancelling(false);
    }
  };

  const getTrackingSteps = (currentStatus) => {
    const allSteps = [
      {
        step: "Order Placed",
        icon: "📝",
        status: "completed",
        statusName: "Pending",
        description: "Your order has been received",
      },
      {
        step: "Processing",
        icon: "⚙️",
        status: "pending",
        statusName: "Processing",
        description: "We're preparing your items",
      },
      {
        step: "Shipped",
        icon: "🚚",
        status: "pending",
        statusName: "Shipped",
        description: "Your order is on the way",
      },
      {
        step: "Delivered",
        icon: "✅",
        status: "pending",
        statusName: "Delivered",
        description: "Order successfully delivered",
      },
    ];

    const statusOrder = ["Pending", "Processing", "Shipped", "Delivered"];
    const currentIndex = statusOrder.indexOf(currentStatus);

    return allSteps.map((step, index) => {
      const stepIndex = statusOrder.indexOf(step.statusName);
      
      if (stepIndex < currentIndex) {
        return { ...step, status: "completed", date: "" };
      } else if (stepIndex === currentIndex) {
        return { ...step, status: "active", date: "In Progress" };
      } else {
        return { ...step, status: "pending", date: "" };
      }
    });
  };

  if (loading || !order) {
    return (
      <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#4CAF50]"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  const trackingSteps = getTrackingSteps(order.status);
  const canCancel = order.status === "Pending";

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      
      <nav className="bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-[#333333]">
          <span className="text-3xl">🥬</span> GROCERY
        </Link>
        {/* <Link href="/orders" className="text-[#03A9F4] hover:underline">
          ← Back to Orders
        </Link> */}
           <div className="flex items-center gap-3">
                    <div className="hidden md:block text-right">
                        <p className="text-sm font-semibold text-[#333333]">
                            {user?.fullName}
                        </p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#4CAF50] text-white flex items-center justify-center font-bold">
                        {user?.fullName?.charAt(0)}
                    </div>
                </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#333333] mb-2">
                Order #{order.id.slice(0, 13)}
              </h1>
              <p className="text-gray-600">
                Placed on {new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              {/* ✅ Show cancelled badge */}
              {order.status === "Cancelled" && (
                <p className="mt-2 text-red-600 font-semibold">This order has been cancelled</p>
              )}
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Order Total</p>
              <p className="text-3xl font-bold text-[#4CAF50]">
                ${order.totalAmount.toFixed(2)}
              </p>
            </div>
          </div>

          {/* ✅ NEW: Cancel button - Only show for Pending orders */}
          {canCancel && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={handleCancelOrder}
                disabled={cancelling}
                className="w-full md:w-auto px-8 py-3 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white rounded-lg font-bold transition flex items-center justify-center gap-2"
              >
                {cancelling ? (
                  <>
                    <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Cancelling Order...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancel This Order
                  </>
                )}
              </button>
              <p className="text-sm text-gray-600 mt-2">
                You can only cancel orders that are still pending
              </p>
            </div>
          )}
        </div>

        {/* Tracking Progress - Hide if cancelled */}
        {order.status !== "Cancelled" && (
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#333333] mb-6">
              Tracking Information
            </h2>

            <div className="space-y-6">
              {trackingSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex gap-6 pb-6 ${
                    index < trackingSteps.length - 1 ? "border-b" : ""
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${
                        step.status === "completed"
                          ? "bg-green-100"
                          : step.status === "active"
                          ? "bg-blue-100"
                          : "bg-gray-100"
                      }`}
                    >
                      {step.icon}
                    </div>
                    {index < trackingSteps.length - 1 && (
                      <div
                        className={`absolute left-1/2 top-16 w-0.5 h-6 transform -translate-x-1/2 ${
                          step.status === "completed" ? "bg-green-500" : "bg-gray-300"
                        }`}
                      ></div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3
                      className={`text-lg font-bold mb-1 ${
                        step.status === "completed" || step.status === "active"
                          ? "text-[#333333]"
                          : "text-gray-400"
                      }`}
                    >
                      {step.step}
                    </h3>
                    <p
                      className={`text-sm mb-2 ${
                        step.status === "completed" || step.status === "active"
                          ? "text-gray-600"
                          : "text-gray-400"
                      }`}
                    >
                      {step.description}
                    </p>
                    {step.date && (
                      <p className="text-sm text-[#4CAF50] font-medium">{step.date}</p>
                    )}
                  </div>

                  {step.status === "completed" && (
                    <span className="text-green-600 font-bold text-xl">✓</span>
                  )}
                  {step.status === "active" && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold h-fit">
                      In Progress
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-[#F9F9F9] rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-3xl">📊</span>
                <div>
                  <p className="text-sm text-gray-600">Current Status</p>
                  <p className="text-xl font-bold text-[#333333]">{order.status}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Show cancelled message if order is cancelled */}
        {order.status === "Cancelled" && (
          <div className="bg-red-50 border border-red-200 rounded-xl shadow-md p-8 mb-8">
            <div className="flex items-center gap-4">
              <span className="text-6xl">❌</span>
              <div>
                <h2 className="text-2xl font-bold text-red-800 mb-2">Order Cancelled</h2>
                <p className="text-red-600">This order has been cancelled and will not be processed.</p>
              </div>
            </div>
          </div>
        )}

        {/* Order Items */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#333333] mb-6">Order Items</h2>

          <div className="space-y-4">
            {order.orderItems && order.orderItems.length > 0 ? (
              order.orderItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 pb-4 border-b">
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
                    <h3 className="font-semibold text-[#333333] mb-1">
                      {item.productName}
                    </h3>
                    <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                    <p className="text-sm text-gray-500">
                      ${item.price?.toFixed(2)} each
                    </p>
                  </div>
                  <p className="font-bold text-[#4CAF50]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No items found</p>
            )}
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="flex justify-between text-lg font-bold text-[#333333]">
              <span>Total Amount</span>
              <span className="text-[#4CAF50]">${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/products" className="flex-1">
            <button className="w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white py-4 rounded-lg font-semibold transition">
              Continue Shopping
            </button>
          </Link>
          <Link href="/contact" className="flex-1">
            <button className="w-full bg-white border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#F9F9F9] py-4 rounded-lg font-semibold transition">
              Contact Support
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}