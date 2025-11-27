import type { ApiError } from "@/types/api"
import axios from "axios"

export const msgError = (error: unknown): ApiError => {
    if (axios.isAxiosError(error)) {

        const data = error.response?.data

        if (data && typeof data === "object" && "message" in data) return data as ApiError
    }

    // if (error instanceof Error) return error.message
    
    return {
        message: "500 Internal Server Error",
        success: false,
        error: "UNKNOWN_ERROR",
    }
}