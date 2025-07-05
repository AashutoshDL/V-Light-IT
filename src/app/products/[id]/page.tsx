"use client";

import { useParams, notFound } from "next/navigation";
import { products } from "@/components/products"; // adjust path if needed
import Image from "next/image";
import { Star, Heart, Truck, RefreshCw, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductDetailPage() {
  const params = useParams();
  const product = products.find((p) => p.id.toString() === params.id);
  const router = useRouter();

  const handleCartClick = () => {
    router.push("/cart");
  };

  if (!product) return notFound();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  const handleQuantityChange = (action: "increase" | "decrease") => {
    if (action === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <span>Home</span> / <span>Products</span> /{" "}
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg group">
              <Image
                src={productImages[selectedImage]}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                  isWishlisted
                    ? "bg-red-500 text-white"
                    : "bg-white/80 text-gray-600 hover:bg-white hover:text-red-500"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
                />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === index
                      ? "border-green-500 ring-2 ring-green-200"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  (4.0) • 127 reviews
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-bold text-green-600">
                  Rs.{product.price}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-200">
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">30-Day Returns</span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">Quantity:</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  disabled={quantity <= 1}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-green-800 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl">
                Buy Now - Rs.{(product.price * quantity).toFixed(2)}
              </button>

              <button
                className="w-full bg-white border-2 border-green-600 text-green-600 py-4 px-6 rounded-xl font-semibold text-lg hover:bg-green-50 transform hover:scale-[1.02] transition-all duration-200"
                onClick={handleCartClick}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Additional Product Info Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button className="py-4 px-1 border-b-2 border-green-500 text-green-600 font-medium">
                Description
              </button>
            </nav>
          </div>

          <div className="py-8">
            <div className="prose prose-gray max-w-none">
              <h3 className="text-xl font-semibold mb-4">Product Details</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {product.description}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
