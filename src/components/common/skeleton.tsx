export const Skeleton = ({ className = "" }: { className?: string }) => {
    return (
        <div
            className={`animate-pulse rounded-lg bg-muted/70 ${className}`}
        />
    )
}