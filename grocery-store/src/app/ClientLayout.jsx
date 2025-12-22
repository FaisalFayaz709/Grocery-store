"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/ui/Navbar";


export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/Admin");

  const hideNavbarRoutes = ["/cart", "/checkout","/auth/login", "/auth/register",];

    const shouldHideNavbar =
    hideNavbarRoutes.includes(pathname) || pathname.startsWith("/orders/");

//   const shouldHideNavbar = hideNavbarRoutes.includes(pathname);

  return (
    <>
      {!shouldHideNavbar && !shouldHideNavbar && !isAdmin && <Navbar />}
      {children}
    </>
  );
}
