import ProductsCard from "@/components/ProductsCard";
import { getProducts } from "@/components/products";

export default async function Page() {
  const products = await getProducts();
  console.log(products);
  return (
    <>
      <div className="text-center mt-10">
        <h1 className="text-5xl">Our Products</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5">
        {products.map((product: any) => (
          <ProductsCard key={product._id} product={product} />
        ))}
      </div>
    </>
  );
}
