import { getSummary } from "@/features/dashboard/dashboard.service"
import type { SummaryType } from "@/features/dashboard/dashboard.type"
import { useAppQuery } from "@/lib/react-query"
import { Activity, CircleArrowDown, CircleArrowUp, Package } from "lucide-react"

const Summary = () => {
    const { data: summary, isLoading } = useAppQuery<SummaryType>({
        queryKey: ["summary"],
        queryFn: getSummary
    })

    return (
        <>
            <div className="grid-cols-1">
                <div className="flex gap-4 bg-background rounded-2xl border shadow-lg p-4">
                    <div className="p-4 bg-indigo-600 text-white rounded-full">
                        <Package className="size-8" />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-sm text-muted-foreground">Total Products</h3>
                        <p className="text-2xl font-semibold">{isLoading ? "Loading..." : summary?.totalProducts}</p>
                    </div>
                </div>
            </div>

            <div className="grid-cols-1">
                <div className="flex gap-4 bg-background rounded-2xl border shadow-lg p-4">
                    <div className="p-4 bg-yellow-500 text-white rounded-full">
                        <Activity className="size-8" />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-sm text-muted-foreground">Total Stocks</h3>
                        <p className="text-2xl font-semibold">{isLoading ? "Loading..." : summary?.totalStocks}</p>
                    </div>
                </div>
            </div>

            <div className="grid-cols-1">
                <div className="flex gap-4 bg-background rounded-2xl border shadow-lg p-4">
                    <div className="p-4 bg-green-600 text-white rounded-full">
                        <CircleArrowDown className="size-8" />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-sm text-muted-foreground">Stock In/month</h3>
                        <p className="text-2xl font-semibold">{isLoading ? "Loading..." : summary?.totalStockInMonth}</p>
                    </div>
                </div>
            </div>

            <div className="grid-cols-1">
                <div className="flex gap-4 bg-background rounded-2xl border shadow-lg p-4">
                    <div className="p-4 bg-red-600 text-white rounded-full">
                        <CircleArrowUp className="size-8" />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-sm text-muted-foreground">Stock Out/month</h3>
                        <p className="text-2xl font-semibold">{isLoading ? "Loading..." : summary?.totalStockOutMonth}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Summary