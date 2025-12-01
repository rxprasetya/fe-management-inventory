export type SummaryType = {
    totalProducts: number
    totalStocks: number
    totalStockInMonth: number
    totalStockOutMonth: number
}

export type RecentActivityType = {
    type: string
    productName: string
    warehouseName: string
    quantity: number
    date: string
}

export type LineDataType = {
    date: string
    in: number
    out: number
}

export type BarDataType = {
    name: "Sandang" | "Pangan" | "Papan"
    total: number
}