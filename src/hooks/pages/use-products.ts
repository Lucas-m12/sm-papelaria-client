import { toast } from "@/components/ui/use-toast";
import { fetchProducts } from "@/data/fetchers/fetch-products";
import { deleteProduct } from "@/data/mutations/delete-product";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useState } from "react";


export const useProducts = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const {
    data: products,
    ...productsRest
  } = useQuery({
    queryKey: ["products", { page: currentPage, pageSize: itemsPerPage }],
    queryFn: () => fetchProducts({ page: currentPage, pageSize: itemsPerPage }),
    retry: 3,
    retryDelay: 1000,
    placeholderData: keepPreviousData,
  });

  const deleteProductMutation = useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast({
        title: "Produto removido com sucesso",
      });
      queryClient.invalidateQueries({
        queryKey: ["products", { page: currentPage, pageSize: itemsPerPage }],
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Erro ao deletar produto",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const pathname = usePathname();

  // const products = [
  //   {
  //     id: "1",
  //     image: "/next.svg",
  //     name: "Acme Lamp",
  //     description: "A stylish and energy-efficient lamp for your home.",
  //     price: 49.99,
  //     quantity: 100,
  //   },
  //   {
  //     id: "2",
  //     image: "/next.svg",
  //     name: "Acme Backpack",
  //     description: "A durable and comfortable backpack for everyday use.",
  //     price: 79.99,
  //     quantity: 50,
  //   },
  //   {
  //     id: "3",
  //     image: "/next.svg",
  //     name: "Acme Water Bottle",
  //     description: "A reusable and eco-friendly water bottle for on-the-go.",
  //     price: 24.99,
  //     quantity: 75,
  //   },
  //   {
  //     id: "4",
  //     image: "/next.svg",
  //     name: "Acme Mug",
  //     description: "A sturdy and stylish mug for your daily coffee.",
  //     price: 12.99,
  //     quantity: 120,
  //   },
  //   {
  //     id: "5",
  //     image: "/next.svg",
  //     name: "Acme Notebook",
  //     description: "A high-quality notebook for all your writing needs.",
  //     price: 9.99,
  //     quantity: 80,
  //   },
  //   {
  //     id: "6",
  //     image: "/next.svg",
  //     name: "Acme Pen",
  //     description: "A smooth-writing pen that's perfect for everyday use.",
  //     price: 3.99,
  //     quantity: 200,
  //   },
  //   {
  //     id: "7",
  //     image: "/next.svg",
  //     name: "Acme Umbrella",
  //     description: "A durable and stylish umbrella to keep you dry.",
  //     price: 19.99,
  //     quantity: 60,
  //   },
  //   {
  //     id: "8",
  //     image: "/next.svg",
  //     name: "Acme Keychain",
  //     description: "A fun and practical keychain to accessorize your keys.",
  //     price: 4.99,
  //     quantity: 150,
  //   },
  //   {
  //     id: "9",
  //     image: "/next.svg",
  //     name: "Acme Candle",
  //     description: "A soy-based candle with a relaxing scent.",
  //     price: 14.99,
  //     quantity: 90,
  //   },
  //   {
  //     id: "10",
  //     image: "/next.svg",
  //     name: "Acme Coaster",
  //     description: "A set of stylish coasters to protect your furniture.",
  //     price: 7.99,
  //     quantity: 110,
  //   },
  // ];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products?.products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = products?.totalPages || 1;
  const totalItems = products?.totalProducts || 0;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (value: string) => {
    if (!value) return;
    const parsedValue = Number.parseInt(value);
    if (parsedValue > totalPages) return;
    setItemsPerPage(parsedValue);
    setCurrentPage(1);
  };

  const handleDeleteProduct = (productId: string) => {
    deleteProductMutation.mutate(productId);
  };

  return {
    itemsPerPage,
    currentPage,
    pathname,
    products: { data: products, ...productsRest },
    totalItems,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
    handleDeleteProduct,
    handleItemsPerPageChange,
  };
};
