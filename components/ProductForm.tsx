"use client";
import { useState, useEffect } from "react";

interface ProductFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
}

const categories = [
  "Wall Clock",
  "Money Bank",
  "Car Stand",
  "Wall Art Piece",
  "Card Holder",
  "Key Holder Stand",
  "Wooden Hamper Box",
  "Gifting Box",
  "Night Lamps",
  "Wooden Hanging Lights",
  "Kapoor Dani",
  "Wooden Hanuman Chalisa",
  "Wooden Calendar",
  "Tea Coaster",
];

export default function ProductForm({
  initialData,
  onSubmit,
}: ProductFormProps) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: categories[0],
    image: "",
    description: "",
    size: "",
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
      setPreview(initialData.image || null);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ☁️ Upload directly to Cloudinary
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "CRAFT ECOM"); // 👈 your unsigned upload preset name

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dq9oubuhu/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const uploaded = await res.json();
      if (uploaded.secure_url) {
        setForm({ ...form, image: uploaded.secure_url });
        setPreview(uploaded.secure_url);
      }
    } catch (err) {
      console.error("Upload failed", err);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedData = {
      ...form,
      category: form.category.trim(), // remove extra spaces
    };
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center">
        {initialData ? "Edit Product" : "Add Product"}
      </h2>

      {/* 🖼️ Image Upload + Preview */}
      <div className="flex flex-col space-y-2 items-center">
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-40 h-40 object-cover rounded-lg border shadow"
          />
        ) : (
          <div className="w-40 h-40 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-400 dark:text-gray-500">
            No Image
          </div>
        )}

        <label className="cursor-pointer">
          <span className="block mt-2 text-sm font-medium text-indigo-600 hover:underline">
            {uploading ? "Uploading..." : "Choose Image"}
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* 📝 Form Fields */}
      <div className="flex flex-col space-y-2">
        <label className="text-gray-700 dark:text-gray-200">Name</label>
        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-gray-700 dark:text-gray-200">Price</label>
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-gray-700 dark:text-gray-200">Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-gray-700 dark:text-gray-200">Size</label>
        <input
          name="size"
          placeholder="e.g. 4x4 inch or 4x1.25 inch"
          value={form.size || ""}
          onChange={handleChange}
          required
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        />
      </div>

      {/* <div className="flex flex-col space-y-2">
        <label className="text-gray-700 dark:text-gray-200">Description</label>
        <textarea
          name="description"
          placeholder="Product Description"
          value={form.description}
          onChange={handleChange}
          required
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 resize-none"
          rows={4}
        />
      </div> */}

      <div className="flex flex-col space-y-2">
        <label className="text-gray-700 dark:text-gray-200">
          Description (you can use points or table style)
        </label>
        <textarea
          name="description"
          placeholder={`Example:\n• Handmade wooden wall clock\n• Size: 12x12 inch\n• Material: Premium Sheesham Wood\n\nOR\nFeature | Details\n--- | ---\nMaterial | Wood\nSize | 12x12 inch\nWeight | 1.2 kg`}
          value={form.description}
          onChange={handleChange}
          required
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 resize-none"
          rows={6}
        />
      </div>

      <button
        type="submit"
        disabled={uploading}
        className={`w-full py-2 ${
          uploading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
        } text-white font-semibold rounded-md shadow transition-colors`}
      >
        {uploading
          ? "Uploading..."
          : initialData
          ? "Update Product"
          : "Add Product"}
      </button>
    </form>
  );
}
