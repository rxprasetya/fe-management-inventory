import { msgError } from "@/lib/helper";
import { api } from "@/lib/axios";
import type { Warehouse } from "./warehouse.schema";
import type { ApiResponse } from "@/types/api";

const endpoint = "/warehouses"

export const getWarehouses = async (): Promise<ApiResponse<Warehouse[]>> => {
    try {
        const res = await api.get(endpoint)
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}

export const getWarehouseId = async (id: string): Promise<ApiResponse<Warehouse[]>> => {
    try {
        const res = await api.get(`${endpoint}/${id}`)
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}

export const createWarehouse = async (payload: Warehouse): Promise<ApiResponse<Warehouse>> => {
    try {
        const res = await api.post(`${endpoint}`, payload)
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}

export const updateWarehouse = async (payload: Warehouse, id: string): Promise<ApiResponse<Warehouse>> => {
    try {
        const res = await api.patch(`${endpoint}/${id}`, payload)
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}

export const deleteWarehouse = async (id: string): Promise<ApiResponse<Warehouse>> => {
    try {
        const res = await api.delete(`${endpoint}/${id}`)
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}