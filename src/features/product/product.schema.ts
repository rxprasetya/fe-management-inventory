import { z } from "zod";

export const ProductSchema = z.object({
    id: z
        .string()
        .optional(),
    sku: z
        .string()
        .max(255, "Sku must be at most 255 characters")
        .nullable()
        .optional(),
    name: z
        .string()
        .nonempty("Name is required")
        .max(255, "Name must be at most 255 characters"),
    categoryID: z
        .string()
        .nonempty("Category is required"),
    unit: z
        .string()
        .nonempty("Unit is required"),
    description: z
        .string()
        .nullable()
        .optional(),
    minStock: z
        .number()
        .min(0, "Minimum stock must be 0 or greater"),
})

export type Product = z.infer<typeof ProductSchema>