"use client";

import AdminNavbar from "./AdminNavbar";

export default function AdminLayout({ children }) {
  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-[#F9F9F9]">
        <div className="flex">
          <main className="flex-1 p-6 lg:p-10">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}

