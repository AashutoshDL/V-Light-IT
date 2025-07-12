"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type ImageType = {
  url: string;
  public_id: string;
  _id?: string;
};

type ProductType = {
  _id?: string | number; // depending on your DB
  name: string;
  price: number;
  images: ImageType[];
  image_count: number;
  product_description?: string;
};

export default function ProductsCard({ product }: { product: ProductType }) {
  const router = useRouter();

  const handleClick = () => {
    if (product._id) router.push(`/products/${product._id}`);
  };

  if (!product.images || product.images.length === 0) {
    return <div>No Image Available</div>;
  }

  return (
    <div
      className="group rounded-xl p-6 mx-5 shadow-md hover:shadow-xl transition-all duration-300 text-center bg-white cursor-pointer transform hover:scale-[1.02] border border-gray-100"
      onClick={handleClick}
    >
      <div className="flex justify-center mb-4 overflow-hidden rounded-lg">
        <Image
          className="rounded-lg object-cover transition-transform duration-300 group-hover:scale-110"
          src={product.images[0].url}
          alt={product.name}
          width={500}
          height={400}
          priority
        />
      </div>
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 mx-6 mt-4 group-hover:text-green-600 transition-colors duration-200">
          {product.name}
        </h2>
        <p className="text-xl font-semibold text-green-600 mx-6 mt-4">
          Rs.{product.price}
        </p>
      </div>
    </div>
  );
}
