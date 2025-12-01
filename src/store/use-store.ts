import type { User } from "@/features/auth/auth.type"
import type { InventoryNotification } from "@/features/inventory/inventories.type"
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

export const useNotificationStore = create<{
    notification: InventoryNotification[],
    setNotification: (id: InventoryNotification[]) => void,
    clearNotification: () => void
}>((set) => ({
    notification: [],
    setNotification: (res) => set({ notification: res }),
    clearNotification: () => set({ notification: [] })
}))

export const useAuthStore = create<{
    user: User,
    setUser: (res: User) => void,
    clearUser: () => void
}>((set) => ({
    user: {
        username: "",
        role: ""
    },
    setUser: (res) => set({
        user: {
            username: res.username,
            role: res.role
        }
    }),
    clearUser: () => set({
        user: {
            username: "",
            role: ""
        },
    })
}))