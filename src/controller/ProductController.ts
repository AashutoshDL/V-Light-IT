import { Product } from "@/models/Product";
import { connectDB } from "@/lib/db";

export const getProducts = async () => {
  await connectDB();

  const products = await Product.find();
  return products;
};

type ProductData = {
  name: string;
  price: number;
  product_description?: string;
  image_count?: number;
  images?: any;
};

export const postProducts = async (data: ProductData) => {
  try {
    await connectDB();
    const newProduct = await Product.create(data);
    return newProduct;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};
