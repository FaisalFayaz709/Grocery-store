
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// export default function CheckoutPage() {
//   const router = useRouter();
  
//   const [cart, setCart] = useState([
//     { id: 1, name: "Apple", price: 2.5, qty: 2, image: "/apple.png" },
//     { id: 2, name: "Banana", price: 1.0, qty: 3, image: "/banana.png" },
//     { id: 3, name: "Avocado", price: 3.0, qty: 1, image: "/avocado.png" },
//   ]);

//   const [payment, setPayment] = useState("cod");
//   const [formData, setFormData] = useState({
//     fullName: "",
//     phone: "",
//     email: "",
//     address: "",
//     city: "",
//     postalCode: "",
//   });

//   const [errors, setErrors] = useState({});

//   // Calculate totals
//   const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
//   const deliveryFee = subtotal > 20 ? 0 : 3.99;
//   const total = subtotal + deliveryFee;

//   // Quantity update
//   const updateQty = (id, change) => {
//     setCart((prev) =>
//       prev.map((item) =>
//         item.id === id
//           ? { ...item, qty: Math.max(1, item.qty + change) }
//           : item
//       )
//     );
//   };

//   const removeItem = (id) => {
//     setCart((prev) => prev.filter((item) => item.id !== id));
//   };

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
//     if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
//     if (!formData.email.trim()) newErrors.email = "Email is required";
//     if (!formData.address.trim()) newErrors.address = "Address is required";
//     if (!formData.city.trim()) newErrors.city = "City is required";
//     if (!formData.postalCode.trim()) newErrors.postalCode = "Postal code is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handlePlaceOrder = () => {
//     if (validateForm()) {
//       // Simulate order placement
//       alert("Order placed successfully! 🎉");
//       router.push("/orders");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#F9F9F9]">
      
//       {/* Navigation Bar */}
//       <nav className="bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-50">
//         <Link href="" className="flex items-center gap-2 text-2xl font-bold text-[#333333]">
//           <span className="text-3xl">🥬</span> GROCERY
//         </Link>

//         <Link href="/cart" className="text-[#03A9F4] hover:underline">
//           ← Back to Cart
//         </Link>
//       </nav>

//       {/* Page Content */}
//       <div className="max-w-7xl mx-auto px-6 py-12">
        
//         <h1 className="text-4xl font-bold text-[#333333] mb-8 text-center">
//           Checkout 🧾
//         </h1>

//         {cart.length === 0 ? (
//           <div className="bg-white rounded-xl shadow-md p-16 text-center">
//             <p className="text-2xl text-gray-500 mb-6">Your cart is empty</p>
//             <Link href="/products">
//               <button className="bg-[#4CAF50] hover:bg-[#388E3C] text-white px-8 py-3 rounded-lg font-semibold transition">
//                 Start Shopping
//               </button>
//             </Link>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//             {/* ------------------------- LEFT: DELIVERY FORM ---------------------------- */}
//             <div className="lg:col-span-2 space-y-6">
              
//               {/* Delivery Information */}
//               <div className="bg-white p-8 rounded-xl shadow-md">
//                 <h2 className="text-2xl font-bold mb-6 text-[#333333]">
//                   Delivery Information
//                 </h2>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
//                   <div>
//                     <input
//                       type="text"
//                       name="fullName"
//                       placeholder="Full Name"
//                       value={formData.fullName}
//                       onChange={handleInputChange}
//                       className={`w-full p-3 border border-gray-500 text-gray-800 rounded-lg ${
//                         errors.fullName ? "border-red-500" : "border-[#E5E5E5]"
//                       }`}
//                     />
//                     {errors.fullName && (
//                       <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
//                     )}
//                   </div>

//                   <div>
//                     <input
//                       type="text"
//                       name="phone"
//                       placeholder="Phone Number"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       className={`w-full p-3 border border-gray-500 rounded-lg text-gray-800 ${
//                         errors.phone ? "border-red-500" : "border-[#E5E5E5]"
//                       }`}
//                     />
//                     {errors.phone && (
//                       <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
//                     )}
//                   </div>

//                   <div className="sm:col-span-2">
//                     <input
//                       type="email"
//                       name="email"
//                       placeholder="Email Address"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className={`w-full p-3 border border-gray-500 rounded-lg text-gray-800 ${
//                         errors.email ? "border-red-500" : "border-[#E5E5E5]"
//                       }`}
//                     />
//                     {errors.email && (
//                       <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//                     )}
//                   </div>

//                   <div className="sm:col-span-2">
//                     <input
//                       type="text"
//                       name="address"
//                       placeholder="Street Address"
//                       value={formData.address}
//                       onChange={handleInputChange}
//                       className={`w-full p-3 border border-gray-500 text-gray-800 rounded-lg ${
//                         errors.address ? "border-red-500" : "border-[#E5E5E5]"
//                       }`}
//                     />
//                     {errors.address && (
//                       <p className="text-red-500 text-sm mt-1">{errors.address}</p>
//                     )}
//                   </div>

//                   <div>
//                     <input
//                       type="text"
//                       name="city"
//                       placeholder="City"
//                       value={formData.city}
//                       onChange={handleInputChange}
//                       className={`w-full p-3 border border-gray-500 text-gray-800 rounded-lg ${
//                         errors.city ? "border-red-500" : "border-[#E5E5E5]"
//                       }`}
//                     />
//                     {errors.city && (
//                       <p className="text-red-500 text-sm mt-1">{errors.city}</p>
//                     )}
//                   </div>

//                   <div>
//                     <input
//                       type="text"
//                       name="postalCode"
//                       placeholder="Postal Code"
//                       value={formData.postalCode}
//                       onChange={handleInputChange}
//                       className={`w-full p-3 border border-gray-500 text-gray-800 rounded-lg ${
//                         errors.postalCode ? "border-red-500" : "border-[#E5E5E5]"
//                       }`}
//                     />
//                     {errors.postalCode && (
//                       <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* ------------------------- PAYMENT METHOD --------------------------- */}
//               <div className="bg-white p-8 rounded-xl shadow-md">
//                 <h2 className="text-2xl font-bold mb-6 text-[#333333]">
//                   Payment Method
//                 </h2>

//                 <div className="space-y-4">
//                   <label className="flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer hover:bg-[#F9F9F9] transition">
//                     <input
//                       type="radio"
//                       name="payment"
//                       value="cod"
//                       checked={payment === "cod"}
//                       onChange={(e) => setPayment(e.target.value)}
//                       className="w-5 h-5 text-[#4CAF50]"
//                     />
//                     <div>
//                       <span className="text-[#333333] font-semibold text-lg">
//                         Cash on Delivery
//                       </span>
//                       <p className="text-gray-500 text-sm">Pay when you receive your order</p>
//                     </div>
//                   </label>

//                   <label className="flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer hover:bg-[#F9F9F9] transition">
//                     <input
//                       type="radio"
//                       name="payment"
//                       value="card"
//                       checked={payment === "card"}
//                       onChange={(e) => setPayment(e.target.value)}
//                       className="w-5 h-5 text-[#4CAF50]"
//                     />
//                     <div>
//                       <span className="text-[#333333] font-semibold text-lg">
//                         Credit/Debit Card
//                       </span>
//                       <p className="text-gray-500 text-sm">Secure payment via card</p>
//                     </div>
//                   </label>

//                   <label className="flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer hover:bg-[#F9F9F9] transition">
//                     <input
//                       type="radio"
//                       name="payment"
//                       value="online"
//                       checked={payment === "online"}
//                       onChange={(e) => setPayment(e.target.value)}
//                       className="w-5 h-5 text-[#4CAF50]"
//                     />
//                     <div>
//                       <span className="text-[#333333] font-semibold text-lg">
//                         Online Payment
//                       </span>
//                       <p className="text-gray-500 text-sm">Pay via online banking</p>
//                     </div>
//                   </label>
//                 </div>
//               </div>

//             </div>

//             {/* --------------------------- RIGHT: ORDER SUMMARY ---------------------------- */}
//             <div className="space-y-6">
              
//               {/* Order Items */}
//               <div className="bg-white p-6 rounded-xl shadow-md">
//                 <h2 className="text-2xl font-bold mb-6 text-[#333333]">
//                   Order Summary
//                 </h2>

//                 <div className="space-y-4 mb-6">
//                   {cart.map((item) => (
//                     <div key={item.id} className="flex gap-4 border-b pb-4">
                      
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-20 h-20 rounded-lg object-contain"
//                       />

//                       <div className="flex-1">
//                         <h3 className="font-semibold text-[#333333] mb-1">
//                           {item.name}
//                         </h3>
//                         <p className="text-[#4CAF50] font-bold mb-2">
//                           ${item.price.toFixed(2)}
//                         </p>

//                         {/* Quantity Selector */}
//                         <div className="flex items-center  gap-2">
//                        <div className="flex items-center gap-3 border border-[#E5E5E5] rounded-lg">
//                            <button
//                             onClick={() => updateQty(item.id, -1)}
//                             className="px-3 py-1  font-bold rounded-r-lg text-[#333333] hover:bg-[#F9F9F9]"
//                           >
//                             −
//                           </button>

//                           <span className="font-semibold text-gray-600 px-2">{item.qty}</span>

//                           <button
//                             onClick={() => updateQty(item.id, +1)}
//                             className="px-3 py-1 bg-[#4CAF50] rounded-r-lg text-white hover:bg-[#388E3C]"
//                           >
//                             +
//                           </button>
//                        </div>

//                           <button
//                             onClick={() => removeItem(item.id)}
//                             className="ml-auto text-red-500 hover:text-red-700"
//                           >
//                             🗑️
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Price Details */}
//                 <div className="border-t pt-4 space-y-3 text-[#333333]">
//                   <div className="flex justify-between">
//                     <span>Subtotal</span>
//                     <span className="font-semibold">${subtotal.toFixed(2)}</span>
//                   </div>

//                   <div className="flex justify-between">
//                     <span>Delivery Fee</span>
//                     <span className="font-semibold">
//                       {deliveryFee === 0 ? (
//                         <span className="text-[#4CAF50]">Free</span>
//                       ) : (
//                         `$${deliveryFee.toFixed(2)}`
//                       )}
//                     </span>
//                   </div>

//                   <div className="flex justify-between font-bold text-xl pt-3 border-t">
//                     <span>Total</span>
//                     <span className="text-[#4CAF50]">${total.toFixed(2)}</span>
//                   </div>
//                 </div>

//                 {/* Place Order Button */}
//                 <button
//                   onClick={handlePlaceOrder}
//                   className="w-full mt-6 bg-[#4CAF50] hover:bg-[#388E3C] text-white py-4 rounded-lg font-semibold text-lg transition shadow-lg"
//                 >
//                   Place Order
//                 </button>

//               </div>

//               {/* Security Badge */}
//               <div className="bg-white p-6 rounded-xl shadow-md text-center">
//                 <p className="text-sm text-gray-600">
//                   🔒 Secure Checkout - Your information is safe with us
//                 </p>
//               </div>

//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useCart from "@/hooks/useCart";
import useAuth from "@/hooks/useAuth";
import useOrders from "@/hooks/useOrder";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, loadCart, subtotal, itemCount, updateItemQty, removeFromCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { checkout, loading: checkoutLoading } = useOrders();
  
  const [payment, setPayment] = useState("COD");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState({});

  // Load cart and prefill user data
  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
      if (user) {
        setFormData(prev => ({
          ...prev,
          fullName: user.fullName || "",
          email: user.email || "",
        }));
      }
    }
  }, [isAuthenticated, user]);

  // Calculate totals
  const deliveryFee = subtotal > 20 ? 0 : 3.99;
  const total = subtotal + deliveryFee;

  // Quantity update
  const updateQty = async (productId, change) => {
    const item = items.find(i => i.id === productId);
    if (!item) return;
    
    const newQty = Math.max(1, item.quantity + change);
    await updateItemQty(productId, newQty);
  };

  const removeItem = async (productId) => {
    if (confirm("Remove this item?")) {
      await removeFromCart(productId);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.postalCode.trim()) newErrors.postalCode = "Postal code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    const orderData = {
      deliveryAddress: formData.address,
      city: formData.city,
      postalCode: formData.postalCode,
      phone: formData.phone,
      paymentMethod: payment,
    };

    const result = await checkout(orderData);
    
    if (result.success) {
      alert("Order placed successfully! 🎉");
      router.push(`/orders/${result.data.id}`);
    } else {
      alert(`Error: ${result.message}`);
    }
  };

  // Check auth
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-md p-12 text-center max-w-md">
          <h2 className="text-2xl font-bold text-[#333333] mb-4">Please Login</h2>
          <p className="text-gray-600 mb-6">You need to login to checkout</p>
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
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <Link href="" className="flex items-center gap-2 text-2xl font-bold text-[#333333]">
          <span className="text-3xl">🥬</span> GROCERY
        </Link>

        {/* <Link href="/cart" className="text-[#03A9F4] hover:underline">
          ← Back to Cart
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

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        <h1 className="text-4xl font-bold text-[#333333] mb-8 text-center">
          Checkout 🧾
        </h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-16 text-center">
            <p className="text-2xl text-gray-500 mb-6">Your cart is empty</p>
            <Link href="/products">
              <button className="bg-[#4CAF50] hover:bg-[#388E3C] text-white px-8 py-3 rounded-lg font-semibold transition">
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT: DELIVERY FORM */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Delivery Information */}
              <div className="bg-white p-8 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-[#333333]">
                  Delivery Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full p-3 border border-gray-500 text-gray-800 rounded-lg ${
                        errors.fullName ? "border-red-500" : ""
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full p-3 border border-gray-500 rounded-lg text-gray-800 ${
                        errors.phone ? "border-red-500" : ""
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full p-3 border border-gray-500 rounded-lg text-gray-800 ${
                        errors.email ? "border-red-500" : ""
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      name="address"
                      placeholder="Street Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full p-3 border border-gray-500 text-gray-800 rounded-lg ${
                        errors.address ? "border-red-500" : ""
                      }`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full p-3 border border-gray-500 text-gray-800 rounded-lg ${
                        errors.city ? "border-red-500" : ""
                      }`}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      name="postalCode"
                      placeholder="Postal Code"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className={`w-full p-3 border border-gray-500 text-gray-800 rounded-lg ${
                        errors.postalCode ? "border-red-500" : ""
                      }`}
                    />
                    {errors.postalCode && (
                      <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* PAYMENT METHOD */}
              <div className="bg-white p-8 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-[#333333]">
                  Payment Method
                </h2>

                <div className="space-y-4">
                  <label className="flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer hover:bg-[#F9F9F9] transition">
                    <input
                      type="radio"
                      name="payment"
                      value="COD"
                      checked={payment === "COD"}
                      onChange={(e) => setPayment(e.target.value)}
                      className="w-5 h-5 text-[#4CAF50]"
                    />
                    <div>
                      <span className="text-[#333333] font-semibold text-lg">
                        Cash on Delivery
                      </span>
                      <p className="text-gray-500 text-sm">Pay when you receive your order</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer hover:bg-[#F9F9F9] transition opacity-50">
                    <input
                      type="radio"
                      name="payment"
                      value="Card"
                      disabled
                      className="w-5 h-5"
                    />
                    <div>
                      <span className="text-[#333333] font-semibold text-lg">
                        Credit/Debit Card
                      </span>
                      <p className="text-gray-500 text-sm">Coming Soon</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer hover:bg-[#F9F9F9] transition opacity-50">
                    <input
                      type="radio"
                      name="payment"
                      value="Online"
                      disabled
                      className="w-5 h-5"
                    />
                    <div>
                      <span className="text-[#333333] font-semibold text-lg">
                        Online Banking (JazzCash/Easypaisa)
                      </span>
                      <p className="text-gray-500 text-sm">Coming Soon</p>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* RIGHT: ORDER SUMMARY */}
            <div className="space-y-6">
              
              {/* Order Items */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-[#333333]">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b pb-4">
                      
                      <img
                        src={item.image || "/placeholder.png"}
                        alt={item.name}
                        className="w-20 h-20 rounded-lg object-contain"
                      />

                      <div className="flex-1">
                        <h3 className="font-semibold text-[#333333] mb-1">
                          {item.name}
                        </h3>
                        <p className="text-[#4CAF50] font-bold mb-2">
                          ${item.price.toFixed(2)}
                        </p>

                        {/* Quantity */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-2 border border-[#E5E5E5] rounded-lg">
                            <button
                              onClick={() => updateQty(item.id, -1)}
                              className="px-3 py-1 font-bold text-[#333333] hover:bg-[#F9F9F9]"
                            >
                              −
                            </button>

                            <span className="font-semibold text-gray-600 px-2">{item.quantity}</span>

                            <button
                              onClick={() => updateQty(item.id, +1)}
                              className="px-3 py-1 bg-[#4CAF50] rounded-r-lg text-white hover:bg-[#388E3C]"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto text-red-500 hover:text-red-700"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Details */}
                <div className="border-t pt-4 space-y-3 text-[#333333]">
                  <div className="flex justify-between">
                    <span>Subtotal ({itemCount} items)</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="font-semibold">
                      {deliveryFee === 0 ? (
                        <span className="text-[#4CAF50]">Free</span>
                      ) : (
                        `$${deliveryFee.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between font-bold text-xl pt-3 border-t">
                    <span>Total</span>
                    <span className="text-[#4CAF50]">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={checkoutLoading}
                  className="w-full mt-6 bg-[#4CAF50] hover:bg-[#388E3C] text-white py-4 rounded-lg font-semibold text-lg transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {checkoutLoading ? "Processing..." : "Place Order"}
                </button>

              </div>

              {/* Security Badge */}
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <p className="text-sm text-gray-600">
                  🔒 Secure Checkout - Your information is safe with us
                </p>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}