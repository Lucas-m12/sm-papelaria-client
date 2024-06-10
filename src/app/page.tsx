'use client';

import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { BellIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const pathname = usePathname();

  const products = [
    {
      id: 1,
      image: "/next.svg",
      name: "Acme Lamp",
      description: "A stylish and energy-efficient lamp for your home.",
      price: 49.99,
      quantity: 100,
    },
    {
      id: 2,
      image: "/next.svg",
      name: "Acme Backpack",
      description: "A durable and comfortable backpack for everyday use.",
      price: 79.99,
      quantity: 50,
    },
    {
      id: 3,
      image: "/next.svg",
      name: "Acme Water Bottle",
      description: "A reusable and eco-friendly water bottle for on-the-go.",
      price: 24.99,
      quantity: 75,
    },
    {
      id: 4,
      image: "/next.svg",
      name: "Acme Mug",
      description: "A sturdy and stylish mug for your daily coffee.",
      price: 12.99,
      quantity: 120,
    },
    {
      id: 5,
      image: "/next.svg",
      name: "Acme Notebook",
      description: "A high-quality notebook for all your writing needs.",
      price: 9.99,
      quantity: 80,
    },
    {
      id: 6,
      image: "/next.svg",
      name: "Acme Pen",
      description: "A smooth-writing pen that's perfect for everyday use.",
      price: 3.99,
      quantity: 200,
    },
    {
      id: 7,
      image: "/next.svg",
      name: "Acme Umbrella",
      description: "A durable and stylish umbrella to keep you dry.",
      price: 19.99,
      quantity: 60,
    },
    {
      id: 8,
      image: "/next.svg",
      name: "Acme Keychain",
      description: "A fun and practical keychain to accessorize your keys.",
      price: 4.99,
      quantity: 150,
    },
    {
      id: 9,
      image: "/next.svg",
      name: "Acme Candle",
      description: "A soy-based candle with a relaxing scent.",
      price: 14.99,
      quantity: 90,
    },
    {
      id: 10,
      image: "/next.svg",
      name: "Acme Coaster",
      description: "A set of stylish coasters to protect your furniture.",
      price: 7.99,
      quantity: 110,
    },
  ]
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(products.length / itemsPerPage)
  

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(+value)
    setCurrentPage(1)
  };

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <aside className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
              <Image src='/logo.svg' width={42} height={42} alt="logo sm papelaria" />
              <span className="">SM Papelaria</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <BellIcon className="h-4 w-4" />
              <span className="sr-only">Notificações</span>
            </Button>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <Sidebar />
          </div>
        </aside>
      </div>

      <section className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <h1>Em desenvolvimento</h1>
        </main>
      </section>
    </div>
  );
}
