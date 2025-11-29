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
            desc="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur, libero quod nam iure tempora architecto tempore quae blanditiis error velit harum ut? Eligendi consequuntur facilis fugiat beatae rem unde facere."
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