import { api } from "@/lib/axios";
import type { Category } from "./category.schema";
import type { ApiResponse } from "@/types/api";
import { msgError } from "@/lib/helper";

const endpoint = "/categories"

export const getCategories = async (): Promise<ApiResponse<Category[]>> => {
    try {
        const res = await api.get(endpoint)
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}

export const getCategoryId = async (id: string): Promise<ApiResponse<Category[]>> => {
    try {
        const res = await api.get(`${endpoint}/${id}`)
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}

export const createCategory = async (payload: Category): Promise<ApiResponse<Category>> => {
    try {
        const res = await api.post(`${endpoint}`, payload)
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}

export const updateCategory = async (payload: Category, id: string): Promise<ApiResponse<Category>> => {
    try {
        const res = await api.patch(`${endpoint}/${id}`, payload)
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}

export const deleteCategory = async (id: string): Promise<ApiResponse<Category>> => {
    try {
        const res = await api.delete(`${endpoint}/${id}`)
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}