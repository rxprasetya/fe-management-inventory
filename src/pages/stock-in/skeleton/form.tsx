import { Skeleton } from "@/components/common/skeleton"

const StockInFormSkeleton = () => {
    return (
        <div className="space-y-8 mx-auto box-border pt-8 pb-4 px-4 bg-card rounded-2xl">

            {/* Refrence Code */}
            <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-full rounded-lg" />
            </div>

            {/* Date */}
            <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-full rounded-lg" />
            </div>

            {/* ProductID */}
            <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-full rounded-lg" />
            </div>

            {/* WarehouseID */}
            <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-full rounded-lg" />
            </div>

            {/* Quantity */}
            <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-full rounded-lg" />
            </div>

            {/* Notes */}
            <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-16 w-full rounded-lg" />
            </div>

            {/* Button */}
            <Skeleton className="h-10 w-20 rounded-lg" />

        </div>
    )
}

export default StockInFormSkeleton