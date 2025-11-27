import { Checkbox } from "@/components/ui/checkbox"
import type { Table } from "@tanstack/react-table"

const DataTableSelectAll = <TData,>({
    table
}: {
    table: Table<TData>
}) => {
    return (
        <Checkbox
            checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
        />
    )
}

export default DataTableSelectAll