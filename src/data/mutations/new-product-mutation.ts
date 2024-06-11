import { Product, ProductCreate } from "@/schemas/product-schema";
import { api } from "@/services/api";
import axios from "axios";

export const newProductMutation = async (
  product: ProductCreate,
  onProgress?: (progress: number) => void
) => {
  const { data } = await api.post<CreateProductResponse>('/products', {
    code: product.code,
    name: product.name,
    description: product.description,
    category: product.category,
    filename: product.image?.name,
  });
  
  if (data.presignedUrl) {
    await axios.put(
      data.presignedUrl,
      product.image,
      {
        headers: {
          'Content-Type': product.image?.type
        },
        onUploadProgress({ total, loaded }) {
          const percentage = Math.round((loaded * 100) / (total ?? 0));
          onProgress?.(percentage);
        },
      }
    );
  }
  return data;
}

interface CreateProductResponse {
  product: Product;
  presignedUrl?: string;
}