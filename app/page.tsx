"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "../utils/auth";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      router.push("/dashboard"); // If logged in, go to dashboard
    } else {
      router.push("/login"); // Otherwise, go to login
    }
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h2 className="text-xl text-black dark:text-zinc-50">Redirecting...</h2>
    </div>
  );
}
