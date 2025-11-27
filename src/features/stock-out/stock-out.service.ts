import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types/api";
import { msgError } from "@/lib/helper";
import type { StockOut } from "./stock-out.schema";

const endpoint = "/stock-out"

export const getStockOut = async (): Promise<ApiResponse<StockOut[]>> => {
    try {
        const res = await api.get(endpoint)
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}

export const getStockOutById = async (id: string): Promise<ApiResponse<StockOut[]>> => {
    try {
        const res = await api.get(`${endpoint}/${id}`)
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}

export const createStockOut = async (payload: StockOut): Promise<ApiResponse<StockOut>> => {
    try {
        const res = await api.post(`${endpoint}`, payload)
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}

export const updateStockOut = async (payload: StockOut, id: string): Promise<ApiResponse<StockOut>> => {
    try {
        const res = await api.patch(`${endpoint}/${id}`, payload)
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}

export const deleteStockOut = async (id: string): Promise<ApiResponse<StockOut>> => {
    try {
        const res = await api.delete(`${endpoint}/${id}`)
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}