import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types/api";
import { msgError } from "@/lib/helper";
import type { StockIn } from "./stock-in.schema";

const endpoint = "/stock-in"

export const getStockIn = async (): Promise<ApiResponse<StockIn[]>> => {
    try {
        const res = await api.get(endpoint)
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}

export const getStockInById = async (id: string): Promise<ApiResponse<StockIn[]>> => {
    try {
        const res = await api.get(`${endpoint}/${id}`)
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}

export const createStockIn = async (payload: StockIn): Promise<ApiResponse<StockIn>> => {
    try {
        const res = await api.post(`${endpoint}`, payload)
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}

export const updateStockIn = async (payload: StockIn, id: string): Promise<ApiResponse<StockIn>> => {
    try {
        const res = await api.patch(`${endpoint}/${id}`, payload)
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}

export const deleteStockIn = async (id: string): Promise<ApiResponse<StockIn>> => {
    try {
        const res = await api.delete(`${endpoint}/${id}`)
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}