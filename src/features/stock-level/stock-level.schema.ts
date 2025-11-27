import z from "zod";

export const StockLevelSchema = z.object({
    id: z
        .string()
        .optional(),
    productID: z
        .string()
        .nonempty("Product is required"),
    warehouseID: z
        .string()
        .nonempty("Warehouse is required"),
    quantity: z
        .number()
        .min(0, "Minimum stock must be 0 or greater"),
})

export type StockLevel = z.infer<typeof StockLevelSchema>