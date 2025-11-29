import MainHeader from "@/components/layout/main-header"
import { WarehouseSchema, type Warehouse } from "@/features/warehouse/warehouse.schema"
import { createWarehouse, getWarehouseId, updateWarehouse } from "@/features/warehouse/warehouse.service"
import { useAppMutation, useAppQuery } from "@/lib/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import WarehouseFormSkeleton from "./skeleton/form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import type { ApiError, ApiResponse } from "@/types/api"
import PageAlert from "@/components/common/page-alert"
import { useResponseMessageStore } from "@/store/use-store"

const WarehouseForm = () => {
    const { id } = useParams<{ id: string }>()

    const { setResponseMessage } = useResponseMessageStore()

    const form = useForm<Warehouse>({
        resolver: zodResolver(WarehouseSchema),
        defaultValues: {
            name: "",
            location: ""
        }
    })

    const { data: warehouses = [], isLoading } = useAppQuery<Warehouse[]>({
        queryKey: ["warehouses", id!],
        queryFn: () => getWarehouseId(id!),
        enabled: !!id
    })

    const warehouse = warehouses[0]

    useEffect(() => {
        if (id && warehouse)
            form.reset({
                name: warehouse.name,
                location: warehouse.location ?? ""
            })
    }, [id, warehouse])

    const { mutate, isPending, isError, error } = useAppMutation<ApiResponse<Warehouse>, ApiError, Warehouse>({
        mutationFn: (values) => id ? updateWarehouse(values, id) : createWarehouse(values),
        redirectTo: "/warehouses",
        queryKey: ["warehouses"],
        onSuccess: (data) => {
            setResponseMessage({
                success: data.success,
                message: data.message
            })
        }
    })

    const onSubmit = (values: Warehouse) => {
        mutate(values)
    }
    return (
        <MainHeader
            title="Warehouse Form"
            desc="This form is used to add or update warehouse information. Make sure the location and warehouse details are filled in completely and accurately."
            children={
                isLoading ?
                    <WarehouseFormSkeleton />
                    :
                    <>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mx-auto box-border pt-8 pb-4 px-4 bg-background rounded-2xl">

                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor={field.name}>Name <span className="text-destructive">*</span></FormLabel>
                                            <FormControl>
                                                <Input
                                                    id={field.name}
                                                    placeholder="Add name"
                                                    type="text"
                                                    autoComplete="off"
                                                    {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor={field.name}>Location <span className="text-destructive">*</span></FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    id={field.name}
                                                    placeholder="Add location"
                                                    className="resize-none"
                                                    {...field}
                                                    value={field.value ?? ""}
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
                    label: "Warehouses",
                    path: "/warehouses"
                },
                {
                    label: "Form"
                }
            ]}
        />
    )
}

export default WarehouseForm