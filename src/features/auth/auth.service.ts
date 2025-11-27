import { api } from "@/lib/axios";
import type { Auth } from "./auth.schema";
import type { ApiResponse } from "@/types/api";
import type { User } from "./auth.type";
import { msgError } from "@/lib/helper";

export const signIn = async (payload: Auth): Promise<ApiResponse<never>> => {
    try {
        const res = await api.post("/auth/sign-in", payload)
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}

export const CheckAuth = async (): Promise<ApiResponse<User>> => {
    try {
        const res = await api.get("/auth/me")
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}

export const signOut = async (): Promise<ApiResponse<never>> => {
    try {
        const res = await api.post("/auth/sign-out")
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}