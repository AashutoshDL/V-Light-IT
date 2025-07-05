"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProductsCard({
  product,
}: {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
  };
}) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <div
      className="group rounded-xl p-6 mx-5 shadow-md hover:shadow-xl transition-all duration-300 text-center bg-white cursor-pointer transform hover:scale-[1.02] border border-gray-100"
      onClick={handleClick}
    >
      <div className="flex justify-center mb-4 overflow-hidden rounded-lg">
        <Image
          className="rounded-lg object-cover transition-transform duration-300 group-hover:scale-110"
          src={product.image}
          alt={product.name}
          width={500}
          height={400}
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
