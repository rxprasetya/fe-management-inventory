import z from "zod";

export const WarehouseSchema = z.object({
    id: z
        .string()
        .optional(),
    name: z
        .string()
        .nonempty("Name is required")
        .max(255, "Name must be at most 255 characters"),
    location: z
        .string()
        .max(255, "Location must be at most 255 characters")
        .nonempty("Location is required"),
})

export type Warehouse = z.infer<typeof WarehouseSchema>