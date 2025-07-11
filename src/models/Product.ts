import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  product_description: { type: String, required: true },
  image_count: { type: Number, required: true },
  images: [
    {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
  ],
});

export const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
