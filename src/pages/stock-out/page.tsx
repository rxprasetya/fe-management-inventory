import { DataTable } from "@/components/layout/datatable/data-table"
import MainHeader from "@/components/layout/main-header"
import { useAppQuery } from "@/lib/react-query"
import type { ApiError } from "@/types/api"
import { useEffect } from "react"
import { useResponseMessageStore } from "@/store/use-store"
import PageAlert from "@/components/common/page-alert"
import { StockOutColumns } from "./column"
import type { StockOut } from "@/features/stock-out/stock-out.schema"
import { getStockOut } from "@/features/stock-out/stock-out.service"

const StockOutPage = () => {

    const { data: stockOut = [], isLoading, isError } = useAppQuery<StockOut[], ApiError>({
        queryKey: ["stock-out"],
        queryFn: getStockOut,
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
            title="Stock Out"
            desc="Track all outgoing stock movements with precise documentation. Use this page to monitor product usage, sales-related deductions, and prevent discrepancies in inventory records."
            breadcrumbs={[
                { label: "Stock Out" }
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
                                data={stockOut}
                                columns={StockOutColumns}
                                nav="/stock-out/form"
                            />
                    }
                </>
            } />
    )
}

export default StockOutPage