"use client";

import React, { useState } from "react";

export default function Page() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<(File | null)[]>([null]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleImageChange = (index: number, file: File | null) => {
    const updated = [...images];
    updated[index] = file;
    setImages(updated);
  };

  const handleAddSlot = () => {
    if (images.length < 10) {
      setImages([...images, null]);
    }
  };

  const handleRemoveSlot = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validImages = images.filter((img) => img !== null) as File[];

    if (!name || !price || validImages.length === 0) {
      setMessage("Please fill all required fields and add at least one image.");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("product_description", description);
    validImages.forEach((img) => formData.append("images", img));

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Product added successfully!");
        setName("");
        setPrice("");
        setDescription("");
        setImages([null]);
      } else {
        setMessage("❌ Failed to add product: " + data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-2xl font-semibold mb-6 text-center">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Product Name*</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price (NPR)*</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Product Images (max 10)</label>
          <div className="grid grid-cols-3 gap-3">
            {images.map((img, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square w-full border rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                  {img ? (
                    <img
                      src={URL.createObjectURL(img)}
                      alt={`Image ${index}`}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">No image</span>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="mt-1 w-full"
                  onChange={(e) =>
                    handleImageChange(index, e.target.files?.[0] || null)
                  }
                />
                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveSlot(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            {images.length < 10 && (
              <button
                type="button"
                onClick={handleAddSlot}
                className="aspect-square w-full border-2 border-dashed border-blue-400 rounded-md flex items-center justify-center text-blue-500 hover:border-blue-600"
              >
                + Add Image
              </button>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Uploading..." : "Add Product"}
        </button>

        {message && (
          <p className="text-center text-sm mt-4 text-gray-700">{message}</p>
        )}
      </form>
    </div>
  );
}
