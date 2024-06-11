import { Product } from "@/schemas/product-schema";
import { api } from "@/services/api";

export const fetchProducts = async ({ page = 1, pageSize = 10 }: FetchProductsParams) => {
  const { data } = await api.get<FetchProductsResponse>(`/products?page=${page}&pageSize=${pageSize}`);
  return data;
}

interface FetchProductsParams {
  page?: number;
  pageSize?: number;
}

interface FetchProductsResponse {
  products: Product[];
  totalProducts: number;
  totalPages: number;
}