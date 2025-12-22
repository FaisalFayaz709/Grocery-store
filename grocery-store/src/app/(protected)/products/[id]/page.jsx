
"use client";

import Link from "next/link";
import { use, useState, useEffect } from "react";
import useUserProducts from "@/hooks/useUserProducts";
import useCart from "@/hooks/useCart";

export default function ProductDetails({ params }) {
  const { id } = use(params);
  const { products, categories, getProductById, loading } = useUserProducts();
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(true);

  // Get category name by ID
  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : "Unknown";
  };

  // Load product on mount
  useEffect(() => {
    const loadProduct = async () => {
      setProductLoading(true);
      const result = await getProductById(id);
      
      if (result.success) {
        setProduct(result.data);

        // Find related products (same category)
        const related = products.filter(
          (p) => p.categoryId === result.data.categoryId && p.id !== result.data.id
        ).slice(0, 4);
        setRelatedProducts(related);
      }
      
      setProductLoading(false);
    };

    if (id) {
      loadProduct();
    }
  }, [id, products]);

  const handleAddToCart = async () => {
    if (product && product.stock > 0) {
      const result = await addToCart(product, quantity);
      if (result.success) {
        alert(`Added ${quantity} ${product.name}(s) to cart! 🛒`);
      } else {
        alert(result.message || "Failed to add to cart");
      }
    }
  };

  // Show loading state while fetching
  if (productLoading || loading || !product) {
    return (
      <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#4CAF50]"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      {/* Product Details Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Product Image */}
          <div className="p-10 bg-[#F9F9F9] flex items-center justify-center">
            <img
              src={product.imageUrl || "/placeholder.png"}
              alt={product.name}
              className="w-full max-w-md h-96 object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="p-10">
            
            <span className="inline-block px-3 py-1 bg-[#4CAF50] text-white text-sm font-medium rounded-full mb-4">
              {getCategoryName(product.categoryId)}
            </span>

            <h1 className="text-4xl font-bold text-[#333333] mb-4">
              {product.name}
            </h1>

            <p className="text-3xl font-bold text-[#4CAF50] mb-6">
              ${product.price.toFixed(2)}
            </p>

            <p className="text-[#666666] text-lg leading-relaxed mb-8">
              {product.description || "No description available."}
            </p>

            {/* Stock Info */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <p className="text-green-600 font-semibold">
                  ✓ In Stock ({product.stock} available)
                </p>
              ) : (
                <p className="text-red-600 font-semibold">✗ Out of Stock</p>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[#333333] font-semibold">Quantity:</span>
              
              <div className="flex items-center gap-3 border border-[#E5E5E5] rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-xl font-bold text-[#333333] hover:bg-[#F9F9F9]"
                >
                  −
                </button>

                <span className="px-6 py-2 font-semibold text-lg">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                  className="px-4 py-2 text-xl font-bold text-white bg-[#4CAF50] hover:bg-[#388E3C] rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white py-4 rounded-lg font-semibold text-lg transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>

            {/* Product Features */}
            <div className="mt-8 pt-8 border-t border-[#E5E5E5]">
              <h3 className="font-bold text-[#333333] mb-3">Product Features:</h3>
              <ul className="space-y-2 text-[#666666]">
                <li>✓ Fresh and organic</li>
                <li>✓ Farm to table quality</li>
                <li>✓ Delivered within 24 hours</li>
                <li>✓ 100% satisfaction guaranteed</li>
              </ul>
            </div>

          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#333333] mb-6">You May Also Like</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                  className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition"
                >
                  <img
                    src={relatedProduct.imageUrl || "/placeholder.png"}
                    alt={relatedProduct.name}
                    className="w-full h-32 object-contain mb-3"
                  />
                  <h3 className="font-semibold text-[#333333] mb-1">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-lg font-bold text-[#4CAF50]">
                    ${relatedProduct.price.toFixed(2)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}