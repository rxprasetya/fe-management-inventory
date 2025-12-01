import type { ApiResponse } from "@/types/api";
import type { BarDataType, LineDataType, RecentActivityType, SummaryType } from "./dashboard.type";
import { msgError } from "@/lib/helper";
import { api } from "@/lib/axios";

const endpoint = "/dashboard"

export const getSummary = async (): Promise<ApiResponse<SummaryType>> => {
    try {
        const res = await api.get(`${endpoint}/summary`)
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}

export const getRecentActivities = async (): Promise<ApiResponse<RecentActivityType[]>> => {
    try {
        const res = await api.get(`${endpoint}/recent-activities`)
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}

export const getLineData = async (): Promise<ApiResponse<LineDataType[]>> => {
    try {
        const res = await api.get(`${endpoint}/line`)
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}

export const getBarData = async (): Promise<ApiResponse<BarDataType[]>> => {
    try {
        const res = await api.get(`${endpoint}/bar`)
        return res.data
    } catch (error) {
        throw msgError(error)
    }
}