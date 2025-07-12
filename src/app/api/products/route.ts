// app/api/products/route.ts
import { NextResponse } from "next/server";
import { getProducts, postProducts } from "@/controller/ProductController";
import { uploadToCloudinary } from "@/utils/CloudinaryUpload";

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
    const formData = await req.formData();

    // ✅ Get fields
    const name = formData.get("name")?.toString();
    const price = parseFloat(formData.get("price")?.toString() || "0");
    const desc = formData.get("product_description")?.toString() || "";

    if (!name || isNaN(price)) {
      return NextResponse.json(
        { message: "Missing required fields: name or price" },
        { status: 400 }
      );
    }

    // ✅ Handle multiple images
    const imageFiles: File[] = [];
    formData.forEach((value, key) => {
      if (key === "images" && value instanceof File) {
        imageFiles.push(value);
      }
    });

    if (imageFiles.length === 0) {
      return NextResponse.json(
        { message: "No image files uploaded" },
        { status: 400 }
      );
    }

    const uploadedImages = await Promise.all(
      imageFiles.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        const result = await uploadToCloudinary(buffer, "products");
        return {
          url: result.secure_url,
          public_id: result.public_id,
        };
      })
    );

    // ✅ Create the product
    const productData = {
      name,
      price,
      product_description: desc,
      image_count: uploadedImages.length,
      images: uploadedImages,
    };

    const product = await postProducts(productData);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { message: "Failed to add product" },
      { status: 500 }
    );
  }
}
