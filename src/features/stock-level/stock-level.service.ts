import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types/api";
import { msgError } from "@/lib/helper";
import type { StockLevel } from "./stock-level.schema";

const endpoint = "/stock-levels"

export const getStockLevels = async (): Promise<ApiResponse<StockLevel[]>> => {
    try {
        const res = await api.get(endpoint)
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}

export const getStockLevelById = async (id: string): Promise<ApiResponse<StockLevel[]>> => {
    try {
        const res = await api.get(`${endpoint}/${id}`)
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}

export const createStockLevel = async (payload: StockLevel): Promise<ApiResponse<StockLevel>> => {
    try {
        const res = await api.post(`${endpoint}`, payload)
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}

export const updateStockLevel = async (payload: StockLevel, id: string): Promise<ApiResponse<StockLevel>> => {
    try {
        const res = await api.patch(`${endpoint}/${id}`, payload)
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}

export const deleteStockLevel = async (id: string): Promise<ApiResponse<StockLevel>> => {
    try {
        const res = await api.delete(`${endpoint}/${id}`)
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}