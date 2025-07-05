import React from "react";
import { products } from "@/components/products";
import ProductsCard from "@/components/ProductsCard";

export default function page() {
  return (
    <>
      <div className="text-center mt-10">
        <h1 className="text-5xl">Our Products</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5">
        {products.map((products) => (
          <ProductsCard key={products.id} product={products} />
        ))}
      </div>
    </>
  );
}
