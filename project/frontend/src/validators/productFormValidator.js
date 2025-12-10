import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  image: z.string().url("Invalid image URL"),
  category_id: z.number().min(1, "Category is required"),
  subcategory_id: z.number().optional(),
  price: z.number().positive("Price must be greater than 0"),
  old_price: z.number().nullable().optional(),
  available: z.number().int().min(0),
  in_sale: z.number().int().min(0).max(1),
  sizes: z
    .array(
      z.object({
        size: z.string().min(1, "Size is required"),
        quantity: z
          .number()
          .int("Quantity must be an integer")
          .min(0, "Quantity must be ≥ 0"),
      })
    )
    .min(1, "At least one size is required"),
});
