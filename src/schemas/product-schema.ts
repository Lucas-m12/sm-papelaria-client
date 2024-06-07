import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  code: z.string().min(1, "Código é obrigatório"),
  description: z.string().optional(),
  category: z.string().optional(),
  image: z.instanceof(File).optional(),
});

export type Product = z.infer<typeof productSchema>;