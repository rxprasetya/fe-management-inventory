import { DataTable } from "@/components/layout/datatable/data-table"
import { StockLevelColumns } from "./column"
import MainHeader from "@/components/layout/main-header"
import { useAppQuery } from "@/lib/react-query"
import type { ApiError } from "@/types/api"
import { useEffect } from "react"
import { useResponseMessageStore } from "@/store/use-store"
import PageAlert from "@/components/common/page-alert"
import type { StockLevel } from "@/features/stock-level/stock-level.schema"
import { getStockLevels } from "@/features/stock-level/stock-level.service"

const StockLevels = () => {

    const { data: stockLevels = [], isLoading, isError } = useAppQuery<StockLevel[], ApiError>({
        queryKey: ["stock-levels"],
        queryFn: getStockLevels,
    })

    const { responseMessage, clearResponseMessage } = useResponseMessageStore()

    useEffect(() => {
        if (responseMessage.message) {
            const timer = setTimeout(() => {
                clearResponseMessage()
            }, 3000)

            return () => clearTimeout(timer)
        }
    }, [responseMessage])

    if (isError) return <>500 Internal Server Error</>

    return (
        <MainHeader
            title="Stock"
            desc="Monitor current inventory levels with a clear and detailed overview of each product’s availability. This page helps you ensure stock is sufficient, detect low-stock items early, and maintain smooth operations."
            breadcrumbs={[
                { label: "Stock" }
            ]}
            children={
                <>
                    {
                        responseMessage.message &&
                        <PageAlert status={responseMessage.success} error={responseMessage.error} message={responseMessage.message} />
                    }
                    {
                        isLoading ?
                            <>Loading...</>
                            :
                            <DataTable
                                data={stockLevels}
                                columns={StockLevelColumns}
                                nav="/stock-levels/form"
                            />
                    }
                </>
            } />
    )
}

export default StockLevels