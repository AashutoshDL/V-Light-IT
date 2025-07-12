import { v2 as cloudinary } from "cloudinary";

const cloud_url = process.env.CLOUDINARY_URL;

if (!cloud_url) {
  throw new Error("Missing url in the environment variable");
}

cloudinary.config(cloud_url);

export default cloudinary;
