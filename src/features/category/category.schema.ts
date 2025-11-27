import z from "zod";

export const CategorySchema = z.object({
    id: z
        .string()
        .optional(),
    name: z
        .string()
        .nonempty("Name is required")
        .max(255, "Name must be at most 255 characters"),
    description: z
        .string()
        .nullable()
        .optional(),
})

export type Category = z.infer<typeof CategorySchema>