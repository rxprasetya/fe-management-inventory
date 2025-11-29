import { DataTable } from "@/components/layout/datatable/data-table"
import { getWarehouses } from "@/features/warehouse/warehouse.service"
import { WarehouseColumns } from "./column"
import MainHeader from "@/components/layout/main-header"
import { useAppQuery } from "@/lib/react-query"
import type { Warehouse } from "@/features/warehouse/warehouse.schema"
import type { ApiError } from "@/types/api"
import { useEffect } from "react"
import { useResponseMessageStore } from "@/store/use-store"
import PageAlert from "@/components/common/page-alert"

const Warehouses = () => {

    const { data: warehouses = [], isLoading, isError } = useAppQuery<Warehouse[], ApiError>({
        queryKey: ["warehouses"],
        queryFn: getWarehouses,
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
            title="Warehouses"
            desc="Manage and maintain master warehouse data that will be used as storage locations in stock movement, receiving, and distribution processes."
            breadcrumbs={[
                { label: "Warehouses" }
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
                                data={warehouses}
                                columns={WarehouseColumns}
                                nav="/warehouses/form"
                            />
                    }
                </>
            } />
    )
}

export default Warehouses