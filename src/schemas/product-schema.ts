import { z } from 'zod';

export const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Nome é obrigatório"),
  code: z.string().min(1, "Código é obrigatório"),
  description: z.string().optional(),
  category: z.string().optional(),
  imageUrl: z.string().optional(),
});

const productCreateSchema = productSchema.extend({
  image: z.instanceof(File).optional(),
});

const noId = productCreateSchema.omit({ id: true });

export type ProductCreate = z.infer<typeof productCreateSchema>;

export type ProductCreateWithoutId = z.infer<typeof noId>;

export type Product = z.infer<typeof productSchema>;