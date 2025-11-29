import { DataTable } from "@/components/layout/datatable/data-table";
import { getProducts } from "@/features/product/product.service";
import { ProductColumns } from "./column";
import MainHeader from "@/components/layout/main-header";
import type { Product } from "@/features/product/product.schema";
import { useAppQuery } from "@/lib/react-query";
import { useResponseMessageStore } from "@/store/use-store";
import PageAlert from "@/components/common/page-alert";
import { useEffect } from "react";

const Products = () => {
    const { data: products = [], isLoading, isError } = useAppQuery<Product[]>({
        queryKey: ["products"],
        queryFn: getProducts
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
            title="Products"
            desc="Manage and maintain master product data that will be used in stock, transaction, and inventory processes, including basic information and classifications."
            breadcrumbs={[
                { label: "Products" }
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
                                data={products}
                                columns={ProductColumns}
                                nav="/products/form"
                            />
                    }
                </>
            } />
    )
}

export default Products