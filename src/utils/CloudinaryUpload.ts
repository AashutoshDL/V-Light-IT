// utils/uploadToCloudinary.ts
import { Readable } from "stream";
import cloudinary from "./Cloudinary";
import type { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";

export const uploadToCloudinary = (
  buffer: Buffer,
  folder: string
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (
        error: UploadApiErrorResponse | undefined,
        result: UploadApiResponse | undefined
      ) => {
        if (error || !result) return reject(error);
        resolve(result);
      }
    );

    // Convert buffer to readable stream and pipe to Cloudinary
    Readable.from(buffer).pipe(uploadStream);
  });
};
