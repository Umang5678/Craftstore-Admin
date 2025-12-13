"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import API from "../../../utils/api";
import ProductForm from "../../../components/ProductForm";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const [product, setProduct] = useState<any>(null);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products`);
      const prod = res.data.find((p: any) => p._id === id);
      setProduct(prod);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (data: any) => {
    try {
      await API.put(`/products/${id}`, data);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Error updating product");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Edit Product</h2>
      {product && <ProductForm initialData={product} onSubmit={handleUpdate} />}
    </div>
  );
}
