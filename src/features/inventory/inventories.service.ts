import { api } from "@/lib/axios";
import { msgError } from "@/lib/helper";
import type { ApiResponse } from "@/types/api";
import type { InventoryProduct, InventoryWarehouse } from "./inventories.type";

const endpoint = "/inventories"

export const getProductInStocks = async (): Promise<ApiResponse<InventoryProduct[]>> => {
    try {
        const res = await api.get(`${endpoint}/products`)
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}

export const getWarehouseInStocks = async (): Promise<ApiResponse<InventoryWarehouse[]>> => {
    try {
        const res = await api.get(`${endpoint}/warehouses`)
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}