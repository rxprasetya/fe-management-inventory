import MainHeader from "@/components/layout/main-header"
import {
    useForm
} from "react-hook-form"
import {
    zodResolver
} from "@hookform/resolvers/zod"
import {
    Button
} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Input
} from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import {
    Textarea
} from "@/components/ui/textarea"
import { useParams } from "react-router-dom"
import { useAppMutation, useAppQuery } from "@/lib/react-query"
import { createProduct, getProductById, updateProduct } from "@/features/product/product.service"
import { type Product, ProductSchema } from "@/features/product/product.schema"
import { useEffect } from "react"
import ProductFormSkeleton from "./skeleton/form"
import type { ApiError, ApiResponse } from "@/types/api"
import PageAlert from "@/components/common/page-alert"
import { useResponseMessageStore } from "@/store/use-store"
import type { Category } from "@/features/category/category.schema"
import { getCategories } from "@/features/category/category.service"

const ProductForm = () => {

    const { id } = useParams<{ id: string }>()

    const { setResponseMessage } = useResponseMessageStore()

    const { data: categories = [], isLoading: loadCategories } = useAppQuery<Category[]>({
        queryKey: ["categories"],
        queryFn: getCategories,
    })

    const { data: products = [], isLoading: loadProduct } = useAppQuery<Product[]>({
        queryKey: ["products", id!],
        queryFn: () => getProductById(id!),
        enabled: !!id
    })

    const form = useForm<Product>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            name: "",
            categoryID: "",
            unit: "",
            description: "",
            minStock: 0
        }
    })

    const product = products[0]

    useEffect(() => {
        if (id && product) {
            form.reset({
                name: product.name,
                categoryID: product.categoryID,
                unit: product.unit,
                description: product.description,
                minStock: product.minStock,
            })
        }
    }, [id, product, form])

    const { mutate, isPending, isError, error } = useAppMutation<ApiResponse<Product>, ApiError, Product>({
        mutationFn: (values) => id ? updateProduct(values, id) : createProduct(values),
        redirectTo: "/products",
        queryKey: ["products"],
        onSuccess: (data) => {
            setResponseMessage({
                message: data.message,
                success: true,
            })
        }
    })

    const onSubmit = (values: Product) => {
        mutate(values)
    }

    return (
        <MainHeader
            title="Product Form"
            desc="This form is used to add or update product information such as name, category, price, and other details. Please ensure all data entered is correct before saving."
            children={
                loadProduct || loadCategories ?
                    <ProductFormSkeleton />
                    :
                    <>
                        <Form {...form} key={`${id}-${Math.random()}`}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mx-auto box-border pt-8 pb-4 px-4 bg-background rounded-2xl">

                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="name">Name <span className="text-destructive">*</span></FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="name"
                                                    placeholder="Add name"
                                                    type="text"
                                                    {...field}
                                                    autoComplete="off" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="categoryID"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="categoryID">Category <span className="text-destructive">*</span></FormLabel>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <FormControl>
                                                    <SelectTrigger id="categoryID">
                                                        <SelectValue placeholder="Select a category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {categories.map((category) => (
                                                        <SelectItem key={category.id!} value={category.id!}>{category.name}</SelectItem>
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
                                    name="unit"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="unit">Unit <span className="text-destructive">*</span></FormLabel>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <FormControl>
                                                    <SelectTrigger id="unit">
                                                        <SelectValue placeholder="Select a unit" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent >
                                                    <SelectItem value="pcs">Pcs</SelectItem>
                                                    <SelectItem value="kg">Kg</SelectItem>
                                                    <SelectItem value="l">L</SelectItem>
                                                    <SelectItem value="box">Box</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem >
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="description">Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    id="description"
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

                                <FormField
                                    control={form.control}
                                    name="minStock"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Min. Stock <span className="text-destructive">*</span></FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Add min. stock"
                                                    type="number"
                                                    min={0}
                                                    {...field}
                                                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                < Button type="submit" disabled={isPending} > {isPending ? "Loading..." : "Submit"}</Button >
                            </form >
                        </Form >
                        {!isPending &&
                            <PageAlert status={isError} error={error?.error} message={error?.message} />
                        }
                    </>
            }
            breadcrumbs={
                [
                    {
                        label: "Products",
                        path: "/products"
                    },
                    {
                        label: "Form"
                    }
                ]}
        />

    )
}

export default ProductForm