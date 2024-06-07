import { Product } from "@/schemas/product-schema";

export const newProductMutation = async (product: Product) => {
  const baseUrl = process.env.NEXT_API_BASE_URL;
  const response = await fetch(`${baseUrl}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error(`Status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}