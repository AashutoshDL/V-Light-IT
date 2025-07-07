import { NextResponse } from "next/server";
import { getProducts, postProducts } from "@/controller/ProductController";

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const product = await postProducts(body);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add products" },
      { status: 500 }
    );
  }
}
