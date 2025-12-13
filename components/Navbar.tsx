// "use client";
// import { useRouter } from "next/navigation";
// import { removeToken } from "../utils/auth";

// export default function Navbar() {
//   const router = useRouter();

//   const handleLogout = () => {
//     removeToken();
//     router.push("/login");
//   };

//   return (
//     <nav className="w-full bg-white dark:bg-gray-800 shadow-md px-6 py-4 flex items-center justify-between">
//       <span className="text-xl font-bold text-gray-800 dark:text-gray-100">
//         Admin Panel
//       </span>

//       <button
//         onClick={handleLogout}
//         className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition"
//       >
//         Logout
//       </button>
//     </nav>
//   );
// }

// "use client";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { removeToken } from "../utils/auth";

// export default function Navbar() {
//   const router = useRouter();

//   const handleLogout = () => {
//     removeToken();
//     router.push("/login");
//   };

//   return (
//     <nav className="w-full bg-white dark:bg-gray-800 shadow-md px-6 py-4 flex items-center justify-between">
//       {/* Left: Logo / Title */}
//       <span
//         onClick={() => router.push("/dashboard")}
//         className="text-xl font-bold text-gray-800 dark:text-gray-100 cursor-pointer"
//       >
//         Admin Panel
//       </span>

//       {/* Center: Links */}
//       <div className="flex items-center gap-6">
//         <Link
//           href="/dashboard"
//           className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition"
//         >
//           Dashboard
//         </Link>

//         <Link
//           href="/add-product"
//           className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition"
//         >
//           Add Product
//         </Link>

//         <Link
//           href="/orders"
//           className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition"
//         >
//           Orders
//         </Link>
//       </div>

//       {/* Right: Logout Button */}
//       <button
//         onClick={handleLogout}
//         className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition"
//       >
//         Logout
//       </button>
//     </nav>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, X, LogOut } from "lucide-react";
import { removeToken } from "../utils/auth";

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* Left: Logo / Title */}
        <div className="flex items-center gap-3">
          {/* Hamburger (mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-gray-700 dark:text-gray-200" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
            )}
          </button>

          <span
            onClick={() => router.push("/dashboard")}
            className="text-xl font-bold text-indigo-600 dark:text-indigo-400 cursor-pointer"
          >
            Admin Panel
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center gap-8">
          <Link
            href="/dashboard"
            className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition"
          >
            Dashboard
          </Link>

          <Link
            href="/add-product"
            className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition"
          >
            Add Product
          </Link>

          <Link
            href="/orders"
            className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition"
          >
            Orders
          </Link>
        </div>

        {/* Logout Button (always visible) */}
        <button
          onClick={handleLogout}
          className="hidden sm:flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>

        {/* Logout Icon (mobile) */}
        <button
          onClick={handleLogout}
          className="sm:hidden p-2 bg-red-500 rounded-md text-white hover:bg-red-600 transition"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="sm:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 py-4 animate-slide-down">
          <div className="flex flex-col gap-4">
            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 dark:text-gray-200 hover:text-indigo-600"
            >
              Dashboard
            </Link>
            <Link
              href="/add-product"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 dark:text-gray-200 hover:text-indigo-600"
            >
              Add Product
            </Link>
            <Link
              href="/orders"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 dark:text-gray-200 hover:text-indigo-600"
            >
              Orders
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
