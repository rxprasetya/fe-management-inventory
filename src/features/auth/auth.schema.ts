import { z } from "zod";

export const AuthSchema = z.object({
    id: z
        .string()
        .optional(),
    username: z
        .string()
        .nonempty("Username is required"),
    password: z
        .string()
        .nonempty("Password is required"),
    role: z
        .string()
        .optional(),
    lastLoginAt: z
        .iso
        .datetime()
        .optional(),
})

export type Auth = z.infer<typeof AuthSchema>