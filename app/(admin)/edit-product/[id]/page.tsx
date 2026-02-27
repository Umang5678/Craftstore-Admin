"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import API from "../../../../utils/api";
import ProductForm from "../../../../components/ProductForm";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (data: any) => {
    try {
      setLoading(true);
      await API.put(`/products/${id}`, data);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Error updating product");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Edit Product</h2>
      {product && (
        <ProductForm
          initialData={product}
          onSubmit={handleUpdate}
          loading={loading}
        />
      )}
    </div>
  );
}
