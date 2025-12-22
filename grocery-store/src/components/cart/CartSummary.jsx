"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * CartSummary Component
 * Displays order summary with pricing breakdown
 * 
 * Usage:
 * <CartSummary 
 *   items={cartItems}
 *   showCheckoutButton={true}
 *   onCheckout={handleCheckout}
 * />
 */

export default function CartSummary({
  items = [],
  showCheckoutButton = true,
  showCoupon = true,
  deliveryFee = 3.99,
  freeDeliveryThreshold = 20,
  tax = 0,
  onCheckout,
  className = "",
}) {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const actualDeliveryFee = subtotal >= freeDeliveryThreshold ? 0 : deliveryFee;
  const discount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0;
  const taxAmount = tax > 0 ? (subtotal * tax) / 100 : 0;
  const total = subtotal + actualDeliveryFee + taxAmount - discount;

  // Mock coupon codes
  const validCoupons = {
    SAVE10: { discount: 10, description: "10% off" },
    SAVE20: { discount: 20, description: "20% off" },
    WELCOME: { discount: 15, description: "15% off for new users" },
  };

  const handleApplyCoupon = () => {
    const coupon = validCoupons[couponCode.toUpperCase()];
    if (coupon) {
      setAppliedCoupon({ code: couponCode.toUpperCase(), ...coupon });
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code");
      setAppliedCoupon(null);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  return (
    <div className={`bg-white rounded-xl shadow-md p-6 sticky top-6 ${className}`}>
      
      {/* Header */}
      <h2 className="text-2xl font-bold text-[#333333] mb-6">Order Summary</h2>

      {/* Items Count */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b">
        <span className="text-gray-600">Items ({items.length})</span>
        <span className="font-semibold text-[#333333]">${subtotal.toFixed(2)}</span>
      </div>

      {/* Coupon Section */}
      {showCoupon && (
        <div className="mb-4 pb-4 border-b">
          <label className="block text-sm font-semibold text-[#333333] mb-2">
            Have a coupon?
          </label>
          
          {!appliedCoupon ? (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                className="flex-1 p-2 border border-[#E5E5E5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
              />
              <button
                onClick={handleApplyCoupon}
                className="px-4 py-2 bg-[#4CAF50] hover:bg-[#388E3C] text-white rounded-lg font-medium transition"
              >
                Apply
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 bg-green-100 rounded-lg">
              <div>
                <p className="font-semibold text-green-800">{appliedCoupon.code}</p>
                <p className="text-sm text-green-600">{appliedCoupon.description}</p>
              </div>
              <button
                onClick={handleRemoveCoupon}
                className="text-red-600 hover:text-red-800 font-bold"
              >
                ×
              </button>
            </div>
          )}

          {couponError && (
            <p className="text-red-500 text-sm mt-1">{couponError}</p>
          )}
        </div>
      )}

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        
        {/* Subtotal */}
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold text-[#333333]">${subtotal.toFixed(2)}</span>
        </div>

        {/* Delivery Fee */}
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Delivery Fee</span>
          <span className={`font-semibold ${actualDeliveryFee === 0 ? "text-[#4CAF50]" : "text-[#333333]"}`}>
            {actualDeliveryFee === 0 ? "Free" : `$${actualDeliveryFee.toFixed(2)}`}
          </span>
        </div>

        {/* Free Delivery Progress */}
        {subtotal < freeDeliveryThreshold && (
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              Add <strong>${(freeDeliveryThreshold - subtotal).toFixed(2)}</strong> more for free delivery! 🚚
            </p>
            <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${(subtotal / freeDeliveryThreshold) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Tax */}
        {tax > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Tax ({tax}%)</span>
            <span className="font-semibold text-[#333333]">${taxAmount.toFixed(2)}</span>
          </div>
        )}

        {/* Discount */}
        {appliedCoupon && (
          <div className="flex items-center justify-between text-green-600">
            <span>Discount ({appliedCoupon.discount}%)</span>
            <span className="font-semibold">-${discount.toFixed(2)}</span>
          </div>
        )}

      </div>

      {/* Total */}
      <div className="flex items-center justify-between mb-6 pt-4 border-t">
        <span className="text-xl font-bold text-[#333333]">Total</span>
        <span className="text-2xl font-bold text-[#4CAF50]">${total.toFixed(2)}</span>
      </div>

      {/* Checkout Button */}
      {showCheckoutButton && (
        <div className="space-y-3">
          {items.length > 0 ? (
            <>
              <Link href="/checkout">
                <button
                  onClick={onCheckout}
                  className="w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white py-4 rounded-lg font-semibold text-lg transition shadow-lg"
                >
                  Proceed to Checkout
                </button>
              </Link>
              <Link href="/products">
                <button className="w-full bg-white border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white py-3 rounded-lg font-semibold transition">
                  Continue Shopping
                </button>
              </Link>
            </>
          ) : (
            <Link href="/products">
              <button className="w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white py-4 rounded-lg font-semibold text-lg transition">
                Start Shopping
              </button>
            </Link>
          )}
        </div>
      )}

      {/* Security Badge */}
      <div className="mt-6 pt-6 border-t text-center">
        <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
          <span>🔒</span> Secure Checkout
        </p>
      </div>

      {/* Payment Methods */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <span className="text-xs text-gray-500">We accept:</span>
        <div className="flex gap-1">
          <span className="text-lg">💳</span>
          <span className="text-lg">💵</span>
          <span className="text-lg">📱</span>
        </div>
      </div>

    </div>
  );
}

// Mini Cart Summary (for dropdown/modal)
export function MiniCartSummary({ items = [] }) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const itemCount = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="bg-[#F9F9F9] p-4 rounded-lg">
      
      <div className="flex items-center justify-between mb-3">
        <span className="text-gray-600">Subtotal ({itemCount} items)</span>
        <span className="text-xl font-bold text-[#4CAF50]">${subtotal.toFixed(2)}</span>
      </div>

      <Link href="/checkout">
        <button className="w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white py-3 rounded-lg font-semibold transition">
          Checkout
        </button>
      </Link>

      <Link href="/cart">
        <button className="w-full mt-2 bg-white border-2 border-[#E5E5E5] text-[#333333] hover:bg-[#F9F9F9] py-2 rounded-lg font-semibold transition">
          View Cart
        </button>
      </Link>

    </div>
  );
}

// Order Summary (for confirmation page)
export function OrderSummary({ order }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      
      <h2 className="text-2xl font-bold text-[#333333] mb-6">Order Details</h2>

      {/* Order Items */}
      <div className="space-y-3 mb-6 pb-6 border-b">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={item.image} alt={item.name} className="w-12 h-12 object-contain rounded" />
              <div>
                <p className="font-semibold text-[#333333]">{item.name}</p>
                <p className="text-sm text-gray-600">Qty: {item.qty}</p>
              </div>
            </div>
            <p className="font-semibold text-[#333333]">
              ${(item.price * item.qty).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>${order.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Delivery</span>
          <span>{order.delivery === 0 ? "Free" : `$${order.delivery.toFixed(2)}`}</span>
        </div>
        {order.tax > 0 && (
          <div className="flex justify-between text-gray-600">
            <span>Tax</span>
            <span>${order.tax.toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="flex justify-between items-center pt-4 border-t">
        <span className="text-xl font-bold text-[#333333]">Total</span>
        <span className="text-2xl font-bold text-[#4CAF50]">
          ${order.total.toFixed(2)}
        </span>
      </div>

    </div>
  );
}