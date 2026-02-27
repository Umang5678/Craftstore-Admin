"use client";
import { useRouter } from "next/navigation";
import API from "../../../utils/api";
import ProductForm from "../../../components/ProductForm";

export default function AddProductPage() {
  const router = useRouter();

  const handleAdd = async (data: any) => {
    try {
      await API.post("/products", data);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  };

  return (
    <div>
      <ProductForm onSubmit={handleAdd} />
    </div>
  );
}
