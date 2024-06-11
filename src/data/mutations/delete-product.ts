import { api } from "@/services/api";

export const deleteProduct = async (id: string) => {
  await api.delete(`/products/${id}`);
};