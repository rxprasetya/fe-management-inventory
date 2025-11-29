import z from "zod";

export const StockOutSchema = z.object({
    id: z
        .string()
        .optional(),
    date: z
        .date({
            error: issue => issue.input === undefined ? "Date is required" : "Invalid date"
        }),
    productID: z
        .string()
        .nonempty("Product is required"),
    warehouseID: z
        .string()
        .nonempty("Warehouse is required"),
    quantity: z
        .number()
        .min(1, "Minimum stock must be 1 or greater"),
    destinationType: z
        .enum(["supplier", "warehouse", "return", "adjustment"])
        .nullable()
        .optional(),
    destinationDetail: z
        .string()
        .nullable()
        .optional(),
    refrenceCode: z
        .string()
        .max(255, "Refrence code must be at most 255 characters")
        .nonempty("Refrence Code is required"),
    notes: z
        .string()
        .nullable()
        .optional()
})

export type StockOut = z.infer<typeof StockOutSchema>