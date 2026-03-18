// "use client";

// import { useState } from "react";
// import API from "@/utils/api";

// export default function AddBlog() {
//   const [form, setForm] = useState({
//     title: "",
//     content: "",
//     excerpt: "",
//     coverImage: "",
//     tags: "",
//     metaTitle: "",
//     metaDescription: "",
//   });

//   const [preview, setPreview] = useState<string | null>(null);
//   const [uploading, setUploading] = useState(false);

//   const handleChange = (field: string, value: string) => {
//     setForm({ ...form, [field]: value });
//   };

//   // ☁️ SAME AS PRODUCT IMAGE UPLOAD
//   const handleImageUpload = async (e: any) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setUploading(true);

//     const data = new FormData();
//     data.append("file", file);
//     data.append("upload_preset", "CRAFT ECOM"); // same preset

//     try {
//       const res = await fetch(
//         "https://api.cloudinary.com/v1_1/dq9oubuhu/image/upload",
//         {
//           method: "POST",
//           body: data,
//         },
//       );

//       const uploaded = await res.json();

//       if (uploaded.secure_url) {
//         setForm({ ...form, coverImage: uploaded.secure_url });
//         setPreview(uploaded.secure_url);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Image upload failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       await API.post("/blogs", {
//         ...form,
//         tags: form.tags.split(",").map((t) => t.trim()),
//       });

//       alert("✅ Blog added!");
//     } catch (err) {
//       console.error(err);
//       alert("❌ Error adding blog");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-xl space-y-4">
//       <h1 className="text-2xl font-bold">✍️ Add Blog</h1>

//       {/* 🖼️ IMAGE UPLOAD */}
//       <div className="flex flex-col items-center">
//         {preview ? (
//           <img src={preview} className="w-40 h-40 object-cover rounded-lg" />
//         ) : (
//           <div className="w-40 h-40 border flex items-center justify-center">
//             No Image
//           </div>
//         )}

//         <input type="file" onChange={handleImageUpload} />
//         {uploading && <p>Uploading...</p>}
//       </div>

//       {/* TITLE */}
//       <input
//         placeholder="Title"
//         onChange={(e) => handleChange("title", e.target.value)}
//         className="w-full border p-2 rounded"
//       />

//       {/* EXCERPT */}
//       <input
//         placeholder="Excerpt"
//         onChange={(e) => handleChange("excerpt", e.target.value)}
//         className="w-full border p-2 rounded"
//       />

//       {/* CONTENT */}
//       <textarea
//         placeholder="Content (HTML allowed)"
//         onChange={(e) => handleChange("content", e.target.value)}
//         className="w-full border p-2 rounded"
//         rows={6}
//       />

//       {/* TAGS */}
//       <input
//         placeholder="Tags (comma separated)"
//         onChange={(e) => handleChange("tags", e.target.value)}
//         className="w-full border p-2 rounded"
//       />

//       {/* SEO */}
//       <input
//         placeholder="Meta Title"
//         onChange={(e) => handleChange("metaTitle", e.target.value)}
//         className="w-full border p-2 rounded"
//       />

//       <textarea
//         placeholder="Meta Description"
//         onChange={(e) => handleChange("metaDescription", e.target.value)}
//         className="w-full border p-2 rounded"
//       />

//       {/* BUTTON */}
//       <button
//         onClick={handleSubmit}
//         className="bg-black text-white px-4 py-2 rounded"
//       >
//         Publish Blog
//       </button>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import API from "@/utils/api";

export default function AddBlog() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    excerpt: "",
    coverImage: "",
    tags: "",
    metaTitle: "",
    metaDescription: "",
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleImageUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "CRAFT ECOM");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dq9oubuhu/image/upload",
        {
          method: "POST",
          body: data,
        },
      );

      const uploaded = await res.json();

      if (uploaded.secure_url) {
        setForm({ ...form, coverImage: uploaded.secure_url });
        setPreview(uploaded.secure_url);
      }
    } catch (err) {
      console.error(err);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      await API.post("/blogs", {
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()),
      });

      alert("✅ Blog added!");
    } catch (err) {
      console.error(err);
      alert("❌ Error adding blog");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#FFF8F2] py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-5 md:p-8 space-y-6">
        {/* HEADER */}
        <h1 className="text-xl md:text-2xl font-semibold text-center">
          ✍️ Add New Blog
        </h1>

        {/* IMAGE UPLOAD */}
        <div className="flex flex-col items-center space-y-3">
          <div className="w-full h-[200px] md:h-[240px] rounded-xl overflow-hidden border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center relative">
            {preview ? (
              <img src={preview} className="w-full h-full object-cover" />
            ) : (
              <div className="text-center text-gray-400 text-sm">
                <p>📷 Upload Cover Image</p>
                <p className="text-xs mt-1">Recommended: 1200 × 630</p>
              </div>
            )}

            {/* Overlay on hover */}
            <label className="absolute inset-0 cursor-pointer bg-black/0 hover:bg-black/30 transition flex items-center justify-center">
              <span className="text-white text-sm opacity-0 hover:opacity-100 transition">
                Change Image
              </span>
              <input
                type="file"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {uploading && (
            <p className="text-xs text-gray-500">Uploading image...</p>
          )}
        </div>

        {/* TITLE */}
        <div>
          <label className="text-sm font-medium text-black">Title</label>
          <input
            placeholder="Enter blog title"
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full mt-1 border border-gray-400 p-2.5 rounded-md text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-[#C97B63]"
          />
        </div>

        {/* EXCERPT */}
        <div>
          <label className="text-sm font-medium text-black">Excerpt</label>
          <input
            placeholder="Short description"
            onChange={(e) => handleChange("excerpt", e.target.value)}
            className="w-full mt-1 border border-gray-400 p-2.5 rounded-md text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-[#C97B63]"
          />
        </div>

        {/* CONTENT */}
        <div>
          <label className="text-sm font-medium text-black">Content</label>
          <textarea
            placeholder="Write blog content (HTML allowed)"
            onChange={(e) => handleChange("content", e.target.value)}
            rows={8}
            className="w-full mt-1 border border-gray-400 p-2.5 rounded-md text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-[#C97B63]"
          />
        </div>

        {/* TAGS */}
        <div>
          <label className="text-sm font-medium text-black">Tags</label>
          <input
            placeholder="e.g. DIY, decor, handmade"
            onChange={(e) => handleChange("tags", e.target.value)}
            className="w-full mt-1 border border-gray-400 p-2.5 rounded-md text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-[#C97B63]"
          />
        </div>

        {/* SEO SECTION */}
        <div className="border-t pt-4 space-y-4">
          <h2 className="text-sm font-semibold text-gray-600">
            🔍 SEO Settings
          </h2>

          <div>
            <label className="text-sm font-medium text-black">Meta Title</label>
            <input
              placeholder="SEO title"
              onChange={(e) => handleChange("metaTitle", e.target.value)}
              className="w-full mt-1 border border-gray-400 p-2.5 rounded-md text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-[#C97B63]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-black">
              Meta Description
            </label>
            <textarea
              placeholder="SEO description"
              onChange={(e) => handleChange("metaDescription", e.target.value)}
              rows={3}
              className="w-full mt-1 border border-gray-400 p-2.5 rounded-md text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-[#C97B63]"
            />
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full bg-black text-white py-2.5 rounded-md text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              {/* Spinner */}
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Publishing...
            </>
          ) : (
            "Publish Blog"
          )}
        </button>
      </div>
    </div>
  );
}
