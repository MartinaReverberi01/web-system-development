const { z } = require("zod");

exports.productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  image: z.string().optional(),
  category_id: z.number().int().positive("Invalid category"),
  subcategory_id: z.number().int().optional(),
  price: z.number().positive("Price must be positive"),
  old_price: z.number().positive().optional(),
  available: z.number().int().min(0).max(1),
  in_sale: z.number().int().min(0).max(1),

  sizes: z.array(
    z.object({
      size: z.string().min(1),
      quantity: z.number().int().nonnegative(),
    })
  ).optional(),
});
