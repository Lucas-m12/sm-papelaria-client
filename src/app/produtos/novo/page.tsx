import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { BellIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { NewProductForm } from "../components/new-product-form";

export default function NewProductsPage() {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
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
        </div>
      </div>

      <section className="flex flex-col">
        <Header />

        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex items-center">
            <h1 className="font-semibold text-lg md:text-2xl">Novo Produto</h1>
          </div>
          <div className="border shadow-sm rounded-lg p-6">
            <NewProductForm />
          </div>
        </main>
      </section>
    </div>
  );
}
