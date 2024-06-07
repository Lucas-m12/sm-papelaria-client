'use client';

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BellIcon, FilePenIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const pathname = usePathname();

  const products = [
    {
      id: '1',
      image: "/next.svg",
      name: "Acme Lamp",
      description: "A stylish and energy-efficient lamp for your home.",
      price: 49.99,
      quantity: 100,
    },
    {
      id: '2',
      image: "/next.svg",
      name: "Acme Backpack",
      description: "A durable and comfortable backpack for everyday use.",
      price: 79.99,
      quantity: 50,
    },
    {
      id: '3',
      image: "/next.svg",
      name: "Acme Water Bottle",
      description: "A reusable and eco-friendly water bottle for on-the-go.",
      price: 24.99,
      quantity: 75,
    },
    {
      id: '4',
      image: "/next.svg",
      name: "Acme Mug",
      description: "A sturdy and stylish mug for your daily coffee.",
      price: 12.99,
      quantity: 120,
    },
    {
      id: '5',
      image: "/next.svg",
      name: "Acme Notebook",
      description: "A high-quality notebook for all your writing needs.",
      price: 9.99,
      quantity: 80,
    },
    {
      id: '6',
      image: "/next.svg",
      name: "Acme Pen",
      description: "A smooth-writing pen that's perfect for everyday use.",
      price: 3.99,
      quantity: 200,
    },
    {
      id: '7',
      image: "/next.svg",
      name: "Acme Umbrella",
      description: "A durable and stylish umbrella to keep you dry.",
      price: 19.99,
      quantity: 60,
    },
    {
      id: '8',
      image: "/next.svg",
      name: "Acme Keychain",
      description: "A fun and practical keychain to accessorize your keys.",
      price: 4.99,
      quantity: 150,
    },
    {
      id: '9',
      image: "/next.svg",
      name: "Acme Candle",
      description: "A soy-based candle with a relaxing scent.",
      price: 14.99,
      quantity: 90,
    },
    {
      id: '10',
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

  const handleDeleteProduct = (productId: string) => {
    console.log(`Deleting product with id: ${productId}`)
  }

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
            <h1 className="font-semibold text-lg md:text-2xl">Produtos</h1>
            <Button className="ml-auto" size="sm" asChild>
              <Link href="/produtos/novo">
                Adicionar produto
              </Link>
            </Button>
          </div>

          <div className="border shadow-sm rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Imagem</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Image
                          src={product.image}
                          width="64"
                          height="64"
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.description}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="icon">
                            <FilePenIcon className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="icon" className="text-red-500">
                                <TrashIcon className="h-4 w-4" />
                                <span className="sr-only">Deletar</span>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Tem certeza que deseja deletar esse produto ?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Essa ação não pode ser desfeita e todos os dados relacionados a esse produto serão perdidos.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteProduct(product.id)}
                                >
                                  Deletar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
            <div className="flex items-center justify-between border-t p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Mostrando {indexOfFirstItem + 1} a {indexOfLastItem} de {products.length} produtos
              </div>
              <div className="flex items-center gap-2">
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={handleItemsPerPageChange}
                // className="w-20"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="10" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="30">30</SelectItem>
                    <SelectItem value="40">40</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}
