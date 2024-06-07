"use client";

import { HomeIcon, LineChartIcon, PackageIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const stylesToActiveRoute = `
    bg-gray-100 dark:bg-gray-800 dark:text-gray-50 text-gray-900
  `;
  const pathname = usePathname();

  return (
    <nav className="grid items-start px-4 text-sm font-medium">
      <Link
        href="/"
        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${pathname === "/" ? stylesToActiveRoute : ""}`}
        prefetch={false}
      >
        <HomeIcon className="h-4 w-4" />
        Home
      </Link>
      <Link
        href="/produtos"
        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${pathname === "/produtos" ? stylesToActiveRoute : ""}`}
        prefetch={false}
      >
        <PackageIcon className="h-4 w-4" />
        Produtos
      </Link>
      <Link
        href="#"
        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${pathname === "/clientes" ? stylesToActiveRoute : ""}`}
        prefetch={false}
      >
        <UsersIcon className="h-4 w-4" />
        Clientes
      </Link>
      <Link
        href="#"
        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${pathname === "/dados" ? stylesToActiveRoute : ""}`}
        prefetch={false}
      >
        <LineChartIcon className="h-4 w-4" />
        Analytics
      </Link>
    </nav>
  )
}