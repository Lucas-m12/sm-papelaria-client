'use client';

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useProducts } from "@/hooks/pages/use-products";
import { BellIcon, FilePenIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductsPage() {
  const {
    currentPage,
    itemsPerPage,
    pathname,
    totalItems,
    products,
    indexOfFirstItem,
    indexOfLastItem,
    totalPages,
    handleDeleteProduct,
    handleItemsPerPageChange
  } = useProducts();
  
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
                  <TableHead>Código</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  products?.data ? (
                    products.data.products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <Image
                            src={product?.imageUrl || '/fallback.jpeg'}
                            width="64"
                            height="64"
                            alt="Product image"
                            className="aspect-square rounded-md object-cover"
                          />
                        </TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.code}</TableCell>
                        <TableCell>{product?.description}</TableCell>
                        <TableCell>{product?.category}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={
                                () => {}
                              }
                            >
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
                  ) : null
                }
              </TableBody>
            </Table>
            <div className="flex items-center justify-between border-t p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Mostrando {indexOfFirstItem + 1} a {indexOfLastItem} de {totalItems} produtos
              </div>
              <div className="flex items-center gap-2">
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={handleItemsPerPageChange}
                  disabled={(products?.data?.totalProducts ?? 0) <= itemsPerPage}
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
                      <PaginationPrevious
                        href="#"
                        className={
                          currentPage === 1 ? "pointer-events-none opacity-5" : ""
                        }
                      />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" className="pointer-events-none">{currentPage}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        className={
                          currentPage === totalPages ? "pointer-events-none opacity-5" : ""
                        }
                      />
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
