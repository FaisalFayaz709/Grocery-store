
"use client";

import { useEffect } from "react";
import Link from "next/link";
import useCart from "@/hooks/useCart";
import useAuth from "@/hooks/useAuth";

export default function CartPage() {
  const { items, removeFromCart, updateItemQty, loadCart, subtotal, itemCount } = useCart();
  const { isAuthenticated, user } = useAuth();

  // Load cart on mount
  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    }
  }, [isAuthenticated]);

  const updateQty = async (productId, change) => {
    const item = items.find(i => i.id === productId);
    if (!item) return;
    
    const newQty = Math.max(1, item.quantity + change);
    await updateItemQty(productId, newQty);
  };

  const removeItem = async (productId) => {
    if (confirm("Remove this item from cart?")) {
      await removeFromCart(productId);
    }
  };

  const deliveryFee = subtotal > 20 ? 0 : 3.99;
  const total = subtotal + deliveryFee;

  // Check if user is authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-md p-12 text-center max-w-md">
          <h2 className="text-2xl font-bold text-[#333333] mb-4">Please Login</h2>
          <p className="text-gray-600 mb-6">You need to login to view your cart</p>
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
        <Link
          href=""
          className="flex items-center gap-2 text-2xl font-bold text-[#333333]"
        >
          <span className="text-3xl">🥬</span> GROCERY
        </Link>

        {/* <Link href="/products" className="text-[#03A9F4] hover:underline">
          ← Continue Shopping
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

      {/* Cart Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-[#333333]">
            Shopping Cart 🛒
          </h1>
          <div className="text-lg text-gray-600">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </div>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-16 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-2xl text-gray-500 mb-6">Your cart is empty</p>
            <Link href="/products">
              <button className="bg-[#4CAF50] hover:bg-[#388E3C] text-white px-8 py-3 rounded-lg font-semibold transition">
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md p-6 flex items-center gap-6"
                >
                  <img
                    src={item.image || "/placeholder.png"}
                    alt={item.name}
                    className="w-24 h-24 object-contain"
                  />

                  <div className="flex-1">
                    <Link href={`/products/${item.id}`}>
                      <h3 className="text-xl font-semibold text-[#333333] mb-2 hover:text-[#4CAF50] cursor-pointer">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-2xl font-bold text-[#4CAF50]">
                      ${item.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Subtotal: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 border border-[#E5E5E5] rounded-lg">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      disabled={item.quantity <= 1}
                      className="px-4 py-2 text-xl font-bold text-[#333333] hover:bg-[#F9F9F9] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      −
                    </button>

                    <span className="px-6 py-2 text-gray-800 font-semibold text-lg">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => updateQty(item.id, +1)}
                      className="px-4 py-2 text-xl font-bold text-white bg-[#4CAF50] hover:bg-[#388E3C] rounded-r-lg"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 text-2xl transition"
                    title="Remove item"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="bg-white rounded-xl shadow-md p-6 h-fit sticky top-24">
              <h2 className="text-2xl font-bold text-[#333333] mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-[#333333]">
                  <span>Subtotal ({itemCount} items)</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-[#333333]">
                  <span>Delivery Fee</span>
                  <span className="font-semibold">
                    {deliveryFee === 0 ? (
                      <span className="text-[#4CAF50]">Free ✓</span>
                    ) : (
                      `$${deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>

                {subtotal < 20 && subtotal > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm text-yellow-800">
                      💡 Add <span className="font-bold">${(20 - subtotal).toFixed(2)}</span> more for free delivery!
                    </p>
                  </div>
                )}

                <div className="border-t pt-4 flex justify-between text-[#333333] text-xl font-bold">
                  <span>Total</span>
                  <span className="text-[#4CAF50]">${total.toFixed(2)}</span>
                </div>
              </div>

              <Link href="/checkout">
                <button className="w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white py-4 rounded-lg font-semibold text-lg transition shadow-lg mb-3">
                  Proceed to Checkout
                </button>
              </Link>

              <Link href="/products">
                <button className="w-full bg-white border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#F9F9F9] py-4 rounded-lg font-semibold text-lg transition">
                  Continue Shopping
                </button>
              </Link>

              {/* Guarantees */}
              <div className="mt-6 pt-6 border-t space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Free returns within 30 days</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Delivery within 24 hours</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}