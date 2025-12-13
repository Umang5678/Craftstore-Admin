// "use client";
// import { useState, useEffect } from "react";

// interface ProductFormProps {
//   initialData?: any;
//   onSubmit: (data: any) => void;
// }

// export default function ProductForm({
//   initialData,
//   onSubmit,
// }: ProductFormProps) {
//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     category: "",
//     image: "",
//     description: "",
//   });

//   useEffect(() => {
//     if (initialData) setForm(initialData);
//   }, [initialData]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(form);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4"
//     >
//       <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center">
//         {initialData ? "Edit Product" : "Add Product"}
//       </h2>

//       <div className="flex flex-col space-y-2">
//         <label className="text-gray-700 dark:text-gray-200">Name</label>
//         <input
//           name="name"
//           placeholder="Product Name"
//           value={form.name}
//           onChange={handleChange}
//           required
//           className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//         />
//       </div>

//       <div className="flex flex-col space-y-2">
//         <label className="text-gray-700 dark:text-gray-200">Price</label>
//         <input
//           name="price"
//           type="number"
//           placeholder="Price"
//           value={form.price}
//           onChange={handleChange}
//           required
//           className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//         />
//       </div>

//       <div className="flex flex-col space-y-2">
//         <label className="text-gray-700 dark:text-gray-200">Category</label>
//         <input
//           name="category"
//           placeholder="Category"
//           value={form.category}
//           onChange={handleChange}
//           required
//           className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//         />
//       </div>

//       <div className="flex flex-col space-y-2">
//         <label className="text-gray-700 dark:text-gray-200">Image URL</label>
//         <input
//           name="image"
//           placeholder="https://example.com/image.jpg"
//           value={form.image}
//           onChange={handleChange}
//           required
//           className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//         />
//       </div>

//       <div className="flex flex-col space-y-2">
//         <label className="text-gray-700 dark:text-gray-200">Description</label>
//         <textarea
//           name="description"
//           placeholder="Product Description"
//           value={form.description}
//           onChange={handleChange}
//           required
//           className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 resize-none"
//           rows={4}
//         />
//       </div>

//       <button
//         type="submit"
//         className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 transition-colors"
//       >
//         {initialData ? "Update Product" : "Add Product"}
//       </button>
//     </form>
//   );
// }

// "use client";
// import { useState, useEffect } from "react";

// interface ProductFormProps {
//   initialData?: any;
//   onSubmit: (data: any) => void;
// }

// export default function ProductForm({
//   initialData,
//   onSubmit,
// }: ProductFormProps) {
//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     category: "",
//     image: "",
//     description: "",
//   });

//   const [preview, setPreview] = useState<string | null>(null);

//   useEffect(() => {
//     if (initialData) {
//       setForm(initialData);
//       setPreview(initialData.image || null);
//     }
//   }, [initialData]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // 📸 Handle file input (for local image preview)
//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     // Create preview URL
//     const imageURL = URL.createObjectURL(file);
//     setPreview(imageURL);

//     // Optional: If backend expects a URL, handle upload logic here (e.g., Cloudinary)
//     // For now, we'll just store file object in state
//     setForm({ ...form, image: file });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // If you’re uploading images, you’ll want to send FormData instead of JSON
//     const formData = new FormData();
//     formData.append("name", form.name);
//     formData.append("price", form.price);
//     formData.append("category", form.category);
//     formData.append("description", form.description);

//     if (form.image instanceof File) {
//       formData.append("image", form.image);
//     } else {
//       formData.append("image", form.image);
//     }

//     onSubmit(formData);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4"
//       encType="multipart/form-data"
//     >
//       <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center">
//         {initialData ? "Edit Product" : "Add Product"}
//       </h2>

//       {/* 🖼️ Image Upload + Preview */}
//       <div className="flex flex-col space-y-2 items-center">
//         {preview ? (
//           <img
//             src={preview}
//             alt="Preview"
//             className="w-40 h-40 object-cover rounded-lg border shadow"
//           />
//         ) : (
//           <div className="w-40 h-40 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-400 dark:text-gray-500">
//             No Image
//           </div>
//         )}

//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageUpload}
//           className="block text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
//         />
//       </div>

//       {/* 📝 Text Inputs */}
//       <div className="flex flex-col space-y-2">
//         <label className="text-gray-700 dark:text-gray-200">Name</label>
//         <input
//           name="name"
//           placeholder="Product Name"
//           value={form.name}
//           onChange={handleChange}
//           required
//           className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//         />
//       </div>

//       <div className="flex flex-col space-y-2">
//         <label className="text-gray-700 dark:text-gray-200">Price</label>
//         <input
//           name="price"
//           type="number"
//           placeholder="Price"
//           value={form.price}
//           onChange={handleChange}
//           required
//           className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//         />
//       </div>

//       <div className="flex flex-col space-y-2">
//         <label className="text-gray-700 dark:text-gray-200">Category</label>
//         <input
//           name="category"
//           placeholder="Category"
//           value={form.category}
//           onChange={handleChange}
//           required
//           className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//         />
//       </div>

//       <div className="flex flex-col space-y-2">
//         <label className="text-gray-700 dark:text-gray-200">Description</label>
//         <textarea
//           name="description"
//           placeholder="Product Description"
//           value={form.description}
//           onChange={handleChange}
//           required
//           className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 resize-none"
//           rows={4}
//         />
//       </div>

//       <button
//         type="submit"
//         className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 transition-colors"
//       >
//         {initialData ? "Update Product" : "Add Product"}
//       </button>
//     </form>
//   );
// }

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

      <div className="flex flex-col space-y-2">
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
