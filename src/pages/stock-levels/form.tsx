import MainHeader from "@/components/layout/main-header"
import { useAppMutation, useAppQuery } from "@/lib/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { ApiError, ApiResponse } from "@/types/api"
import PageAlert from "@/components/common/page-alert"
import { useResponseMessageStore } from "@/store/use-store"
import StockLevelFormSkeleton from "./skeleton/form"
import { StockLevelSchema, type StockLevel } from "@/features/stock-level/stock-level.schema"
import { createStockLevel, getStockLevelById, updateStockLevel } from "@/features/stock-level/stock-level.service"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getProducts } from "@/features/product/product.service"
import type { Product } from "@/features/product/product.schema"
import type { Warehouse } from "@/features/warehouse/warehouse.schema"
import { getWarehouses } from "@/features/warehouse/warehouse.service"

const StockLevelForm = () => {
    const { id } = useParams<{ id: string }>()

    const { setResponseMessage } = useResponseMessageStore()

    const form = useForm<StockLevel>({
        resolver: zodResolver(StockLevelSchema),
        defaultValues: {
            productID: "",
            warehouseID: "",
            quantity: 0
        }
    })

    const { data: products = [], isLoading: loadProducts } = useAppQuery<Product[]>({
        queryKey: ["products"],
        queryFn: getProducts
    })

    const { data: warehouses = [], isLoading: loadWarehouses } = useAppQuery<Warehouse[]>({
        queryKey: ["warehouses"],
        queryFn: getWarehouses
    })

    const { data: stockLevels = [], isLoading: loadStockLevels } = useAppQuery<StockLevel[]>({
        queryKey: ["stock-levels", id!],
        queryFn: () => getStockLevelById(id!),
        enabled: !!id
    })

    const stockLevel = stockLevels[0]

    useEffect(() => {
        if (id && stockLevel)
            form.reset({
                productID: stockLevel.productID,
                warehouseID: stockLevel.warehouseID,
                quantity: stockLevel.quantity
            })
    }, [id, stockLevel])

    const { mutate, isPending, isError, error } = useAppMutation<ApiResponse<StockLevel>, ApiError, StockLevel>({
        mutationFn: (values) => id ? updateStockLevel(values, id) : createStockLevel(values),
        redirectTo: "/stock-levels",
        queryKey: ["stock-levels"],
        onSuccess: (data) => {
            setResponseMessage({
                success: data.success,
                message: data.message
            })
        }
    })

    const onSubmit = (values: StockLevel) => {
        mutate(values)
    }
    return (
        <MainHeader
            title="Stock Form"
            desc="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas laudantium voluptatibus neque consectetur, animi quis!"
            children={
                loadProducts || loadWarehouses || loadStockLevels ?
                    <StockLevelFormSkeleton />
                    :
                    <>
                        <Form {...form} key={`${id}-${Math.random()}`}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mx-auto box-border pt-8 pb-4 px-4 bg-background rounded-2xl">

                                <FormField
                                    control={form.control}
                                    name="productID"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor={field.name}>Product <span className="text-destructive">*</span></FormLabel>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <FormControl>
                                                    <SelectTrigger id={field.name}>
                                                        <SelectValue placeholder="Select a product" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {products.map((product) => (
                                                        <SelectItem key={product.id!} value={product.id!}>{product.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                    }
                                />

                                <FormField
                                    control={form.control}
                                    name="warehouseID"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor={field.name}>Warehouse <span className="text-destructive">*</span></FormLabel>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <FormControl>
                                                    <SelectTrigger id={field.name}>
                                                        <SelectValue placeholder="Select a warehouse" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {warehouses.map((warehouse) => (
                                                        <SelectItem key={warehouse.id!} value={warehouse.id!}>{warehouse.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                    }
                                />

                                <FormField
                                    control={form.control}
                                    name="quantity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor={field.name}>Quantity <span className="text-destructive">*</span></FormLabel>
                                            <FormControl>
                                                <Input
                                                    id={field.name}
                                                    placeholder="Add quantity"
                                                    type="number"
                                                    min={0}
                                                    autoComplete="off"
                                                    {...field}
                                                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" disabled={isPending}>{isPending ? "Loading..." : "Submit"}</Button>
                            </form>
                        </Form>
                        {!isPending &&
                            <PageAlert status={isError} error={error?.error} message={error?.message} />
                        }
                    </>
            }
            breadcrumbs={[
                {
                    label: "Stock",
                    path: "/stock-levels"
                },
                {
                    label: "Form"
                }
            ]}
        />
    )
}

export default StockLevelForm