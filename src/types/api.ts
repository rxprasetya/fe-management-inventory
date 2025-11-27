export type ApiResponse<T> = {
    success: boolean
    message: string
    data?: T
}

export type ApiError = {
    error?: string
    message: string
    success: boolean
}