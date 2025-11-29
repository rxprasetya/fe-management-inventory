import MainHeader from "@/components/layout/main-header"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useAppMutation, useAppQuery } from "@/lib/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import CategoryFormSkeleton from "./skeleton/form"
import type { ApiError, ApiResponse } from "@/types/api"
import PageAlert from "@/components/common/page-alert"
import { useResponseMessageStore } from "@/store/use-store"
import { createCategory, getCategoryId, updateCategory } from "@/features/category/category.service"
import { CategorySchema, type Category } from "@/features/category/category.schema"

const CategoryForm = () => {

    const { id } = useParams<{ id: string }>()

    const { setResponseMessage } = useResponseMessageStore()

    const { data: categories = [], isLoading } = useAppQuery<Category[]>({
        queryKey: ["categories", id!],
        queryFn: () => getCategoryId(id!),
        enabled: !!id
    })

    const form = useForm<Category>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            name: "",
            description: ""
        }
    })

    const category = categories[0]

    useEffect(() => {
        if (id && category)
            form.reset({
                name: category.name,
                description: category.description ?? ""
            })
    }, [id, category])

    const { mutate, isPending, isError, error } = useAppMutation<ApiResponse<Category>, ApiError, Category>({
        mutationFn: (values: Category) => id ? updateCategory(values, id) : createCategory(values),
        redirectTo: "/categories",
        queryKey: ["categories"],
        onSuccess: (data) => {
            setResponseMessage({
                message: data.message,
                success: data.success
            })
        }
    })

    const onSubmit = (values: Category) => {
        mutate(values)
    }

    return (
        <MainHeader
            title="Category Form"
            desc="This form is used to add or update product categories. Make sure the category name is clear to help organize products effectively."
            children={
                isLoading ?
                    <CategoryFormSkeleton />
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
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor={field.name}>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    id={field.name}
                                                    placeholder="Add description"
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
                    label: "Categories",
                    path: "/categories"
                },
                {
                    label: "Form"
                }
            ]}
        />
    )
}

export default CategoryForm