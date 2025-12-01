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
import { useAuthStore, useResponseMessageStore } from "@/store/use-store"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StockInSchema, type StockIn } from "@/features/stock-in/stock-in.schema"
import { createStockIn, getStockInById, updateStockIn } from "@/features/stock-in/stock-in.service"
import StockInFormSkeleton from "./skeleton/form"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import dayjs from "dayjs"
import type { InventoryProduct, InventoryWarehouse } from "@/features/inventory/inventories.type"
import { getProductInStocks, getWarehouseInStocksByProductId } from "@/features/inventory/inventories.service"
import { Skeleton } from "@/components/common/skeleton"

const StockInForm = () => {

    const { id } = useParams<{ id: string }>()

    const { user } = useAuthStore()

    const { setResponseMessage } = useResponseMessageStore()

    const form = useForm<StockIn>({
        resolver: zodResolver(StockInSchema),
        defaultValues: {
            date: new Date(),
            productID: "",
            warehouseID: "",
            quantity: 0,
            refrenceCode: "",
            notes: "",
        }
    })

    const { data: products = [], isLoading: loadProducts } = useAppQuery<InventoryProduct[]>({
        queryKey: ["inventories", "products"],
        queryFn: getProductInStocks
    })

    const productID = form.watch("productID")

    const { data: warehouses = [], isLoading: loadWarehouses } = useAppQuery<InventoryWarehouse[]>({
        queryKey: ["inventories", "warehouses", productID],
        queryFn: () => getWarehouseInStocksByProductId(productID!),
        enabled: !!productID
    })

    const { data: stockInData = [], isLoading: loadStockIn } = useAppQuery<StockIn[]>({
        queryKey: ["stock-in", id!],
        queryFn: () => getStockInById(id!),
        enabled: !!id
    })

    const stockIn = stockInData[0]

    useEffect(() => {
        if (id && stockIn)
            form.reset({
                date: new Date(stockIn.date),
                productID: stockIn.productID,
                warehouseID: stockIn.warehouseID,
                quantity: stockIn.quantity,
                refrenceCode: stockIn.refrenceCode,
                notes: stockIn.notes
            })
    }, [id, stockIn])

    const { mutate, isPending, isError, error } = useAppMutation<ApiResponse<StockIn>, ApiError, StockIn>({
        mutationFn: (values) => id ? updateStockIn(values, id) : createStockIn(values),
        redirectTo: "/stock-in",
        queryKey: ["stock-in"],
        onSuccess: (data) => {
            setResponseMessage({
                success: data.success,
                message: data.message
            })
        }
    })

    const onSubmit = (values: StockIn) => {
        mutate(values)
    }

    return (
        <MainHeader
            title="Stock In Form"
            desc="This form is used to record new incoming stock. Enter product details, quantities, and other relevant information to ensure every stock arrival is properly documented and reflected in your inventory."
            children={
                loadProducts || loadStockIn ?
                    <StockInFormSkeleton />
                    :
                    <>
                        <Form {...form} key={`${id}-${Math.random()}`}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mx-auto box-border pt-8 pb-4 px-4 bg-background rounded-2xl">

                                <FormField
                                    control={form.control}
                                    name="refrenceCode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor={field.name}>Reference Code <span className="text-destructive">*</span></FormLabel>
                                            <FormControl>
                                                <Input
                                                    id={field.name}
                                                    placeholder="Add refrence code"
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
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel id={field.name}>Date <span className="text-destructive">*</span></FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={`pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                                                        >
                                                            {field.value ? (
                                                                dayjs(field.value).format("DD MMMM YYYY")
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        id={field.name}
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={
                                                            user.role === "admin" ?
                                                                false
                                                                :
                                                                (date) => date < new Date(new Date().setHours(0, 0, 0, 0))
                                                        }
                                                        autoFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

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
                                                    {
                                                        products.length > 0 ?
                                                            products.map((product) => (
                                                                <SelectItem key={product.productID} value={product.productID}>{product.productName}</SelectItem>
                                                            ))
                                                            :
                                                            <div className="p-1 text-sm text-muted-foreground">
                                                                Oops! No products yet. Add stock data first
                                                            </div>
                                                    }
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
                                            {loadWarehouses ?
                                                <div className="space-y-2">
                                                    <Skeleton className="h-4 w-24" />
                                                    <Skeleton className="h-8 w-full rounded-lg" />
                                                </div>
                                                :
                                                <>
                                                    <FormLabel htmlFor={field.name}>Warehouse <span className="text-destructive">*</span></FormLabel>
                                                    <Select value={field.value} onValueChange={field.onChange} disabled={!productID}>
                                                        <FormControl>
                                                            <SelectTrigger id={field.name}>
                                                                <SelectValue placeholder="Select a warehouse" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {
                                                                warehouses.length > 0 ?
                                                                    warehouses.map((warehouse) => (
                                                                        <SelectItem key={warehouse.warehouseID} value={warehouse.warehouseID}>{warehouse.warehouseName}</SelectItem>
                                                                    ))
                                                                    :
                                                                    <div className="p-1 text-sm text-muted-foreground">
                                                                        Oops! No warehouses yet. Add stock data first
                                                                    </div>
                                                            }
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </>
                                            }
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

                                <FormField
                                    control={form.control}
                                    name="notes"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor={field.name}>Notes</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    id={field.name}
                                                    placeholder="Add notes"
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
                    label: "Stock In",
                    path: "/stock-in"
                },
                {
                    label: "Form"
                }
            ]}
        />
    )
}

export default StockInForm