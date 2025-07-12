// this code fetches the products and can be used in many databases
export async function getProducts() {
  const res = await fetch(`${process.env.baseURL}/api/products`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}
