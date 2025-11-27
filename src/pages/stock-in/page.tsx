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
            desc="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur, libero quod nam iure tempora architecto tempore quae blanditiis error velit harum ut? Eligendi consequuntur facilis fugiat beatae rem unde facere."
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
                                filter="productName"
                                nav="/stock-in/form"
                            />
                    }
                </>
            } />
    )
}

export default StockInPage