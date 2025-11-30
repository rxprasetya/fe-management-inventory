import { DataTable } from "@/components/layout/datatable/data-table"
import MainHeader from "@/components/layout/main-header"
import { useAppQuery } from "@/lib/react-query"
import type { ApiError } from "@/types/api"
import { useEffect } from "react"
import { useResponseMessageStore } from "@/store/use-store"
import PageAlert from "@/components/common/page-alert"
import type { StockIn } from "@/features/stock-in/stock-in.schema"
import { getStockIn } from "@/features/stock-in/stock-in.service"
import { StockInColumns } from "./column"

const StockInPage = () => {

    const { data: stockIn = [], isLoading, isError } = useAppQuery<StockIn[], ApiError>({
        queryKey: ["stock-in"],
        queryFn: getStockIn,
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
            title="Stock In"
            desc="Manage and review all incoming stock entries with accurate and organized tracking. This page allows you to record product arrivals, verify quantities, and keep inventory data consistently up to date."
            breadcrumbs={[
                { label: "Stock In" }
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
                                data={stockIn}
                                columns={StockInColumns}
                                nav="/stock-in/form"
                            />
                    }
                </>
            } />
    )
}

export default StockInPage