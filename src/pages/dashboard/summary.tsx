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
                    <Package className="size-16 bg-foreground text-background rounded-md" />
                    <div className="">
                        <h3 className="text-sm text-muted-foreground">Total Products</h3>
                        <p className="text-2xl font-semibold">{isLoading ? "Loading..." : summary?.totalProducts}</p>
                    </div>
                </div>
            </div>

            <div className="grid-cols-1">
                <div className="flex gap-4 bg-background rounded-2xl border shadow-lg p-4">
                    <Activity className="size-16 bg-foreground text-background rounded-md" />
                    <div className="">
                        <h3 className="text-sm text-muted-foreground">Total Stocks</h3>
                        <p className="text-2xl font-semibold">{isLoading ? "Loading..." : summary?.totalStocks}</p>
                    </div>
                </div>
            </div>

            <div className="grid-cols-1">
                <div className="flex gap-4 bg-background rounded-2xl border shadow-lg p-4">
                    <CircleArrowDown className="size-16 bg-foreground text-background rounded-md" />
                    <div className="">
                        <h3 className="text-sm text-muted-foreground">Stock In/month</h3>
                        <p className="text-2xl font-semibold">{isLoading ? "Loading..." : summary?.totalStockInMonth}</p>
                    </div>
                </div>
            </div>

            <div className="grid-cols-1">
                <div className="flex gap-4 bg-background rounded-2xl border shadow-lg p-4">
                    <CircleArrowUp className="size-16 bg-foreground text-background rounded-md" />
                    <div className="">
                        <h3 className="text-sm text-muted-foreground">Stock Out/month</h3>
                        <p className="text-2xl font-semibold">{isLoading ? "Loading..." : summary?.totalStockOutMonth}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Summary