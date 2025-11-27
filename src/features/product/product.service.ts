import { api } from "@/lib/axios";
import { msgError } from "@/lib/helper";
import type { Product } from "./product.schema";
import type { ApiResponse } from "@/types/api";

const endpoint = "/products"

export const getProducts = async (): Promise<ApiResponse<Product[]>> => {
    try {
        const res = await api.get(endpoint)
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}

export const getProductById = async (id: string): Promise<ApiResponse<Product[]>> => {
    try {
        const res = await api.get(`${endpoint}/${id}`)
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}

export const createProduct = async (payload: Product): Promise<ApiResponse<Product>> => {
    try {
        const res = await api.post(`${endpoint}`, payload)
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}

export const updateProduct = async (payload: Product, id: string): Promise<ApiResponse<Product>> => {
    try {
        const res = await api.patch(`${endpoint}/${id}`, payload)
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}

export const deleteProduct = async (id: string): Promise<ApiResponse<Product>> => {
    try {
        const res = await api.delete(`${endpoint}/${id}`)
        return res.data.data
    } catch (error) {
        throw msgError(error)
    }
}