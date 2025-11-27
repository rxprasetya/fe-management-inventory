import type { ApiError } from "@/types/api"
import { create } from "zustand"

type BulkStore = {
    selectedIds: string[]
    setSelectedIds: (ids: string[]) => void
    clearSelected: () => void
}

export const useBulkStore = create<BulkStore>((set) => ({
    selectedIds: [],
    setSelectedIds: (ids) => set({ selectedIds: ids }),
    clearSelected: () => set({ selectedIds: [] }),
}))

type ResponseMessageType = {
    responseMessage: ApiError,
    setResponseMessage: (res: ApiError) => void
    clearResponseMessage: () => void
}

export const useResponseMessageStore = create<ResponseMessageType>((set) => ({
    responseMessage: {
        error: "",
        message: "",
        success: false,
    },
    setResponseMessage: (res: ApiError) => set({ responseMessage: res }),
    clearResponseMessage: () => set({
        responseMessage: {
            error: "",
            message: "",
            success: false
        }
    })
}))