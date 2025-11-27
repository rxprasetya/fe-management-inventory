import { DataTable } from "@/components/layout/datatable/data-table"
import { CategoryColumns } from "./column"
import MainHeader from "@/components/layout/main-header"
import { useAppQuery } from "@/lib/react-query"
import type { ApiError } from "@/types/api"
import { useResponseMessageStore } from "@/store/use-store"
import { useEffect } from "react"
import PageAlert from "@/components/common/page-alert"
import type { Category } from "@/features/category/category.schema"
import { getCategories } from "@/features/category/category.service"

const Categories = () => {

    const { data: categories = [], isLoading, isError } = useAppQuery<Category[], ApiError>({
        queryKey: ["categories"],
        queryFn: getCategories
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

    if (isError) return <>500 Internal Sever Error</>

    return (
        <MainHeader
            title="Categories"
            desc="Manage and organize product categories used in the inventory system. You can add, update, and remove categories to keep your data structured and easy to navigate."
            breadcrumbs={[
                { label: "Categories" }
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
                                data={categories}
                                columns={CategoryColumns}
                                filter="name"
                                nav="/categories/form"
                            />
                    }
                </>
            } />
    )
}

export default Categories