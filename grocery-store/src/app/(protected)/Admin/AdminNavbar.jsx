"use client";

import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";



export default function AdminNavbar() {
    const { user, logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);



return (
    <>
        {/* Top Navigation Bar */}
        <nav className="bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-50">
            <div className="flex items-center gap-4">
                {/* Menu Toggle */}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-2xl text-[#333333] hover:text-[#4CAF50] transition lg:hidden"
                >
                    ☰
                </button>

                {/* Logo */}
                <Link
                    href=""
                    className="flex items-center gap-2 text-2xl font-bold text-[#333333]"
                >
                    <span className="text-3xl">🥬</span>
                    <span className="hidden sm:inline">GROCERY ADMIN</span>
                </Link>
            </div>

            <div className="hidden md:flex items-center gap-8 text-[#333333] font-medium">
                <Link href="/Admin" className="hover:text-[#4CAF50] transition">Home</Link>
                <Link href="/Admin/products" className="hover:text-[#4CAF50] transition">
                    Products
                </Link>
                <Link href="/Admin/orders" className="hover:text-[#4CAF50] transition">
                    Orders
                </Link>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
               

                {/* Logout */}
                
                    <button className="hidden md:block px-4 py-2 border-2 border-[#4CAF50] text-[#4CAF50] rounded-lg hover:bg-[#4CAF50] hover:text-white transition font-semibold"
                          onClick={logout}>Logout
                    </button>
                

                {/* Admin Profile */}
                <div className="flex items-center gap-3">
                    <div className="hidden md:block text-right">
                        <p className="text-sm font-semibold text-[#333333]">{user?.fullName}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <div 
                     
                    className="w-10 h-10 rounded-full bg-[#4CAF50] text-white flex items-center justify-center font-bold">
                        {user?.fullName?.charAt(0)}
            

                    </div>
                </div>
            </div>
        </nav>
    </>
);
}
