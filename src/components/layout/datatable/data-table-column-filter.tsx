import { Input } from "@/components/ui/input"
import type { Table } from "@tanstack/react-table"

interface DataTableColumnFilterProps<TData> {
    table: Table<TData>
    filter: string
    placeholder: string
}

export function DataTableColumnFilter<TData>({
    table,
    filter,
    placeholder,
}: DataTableColumnFilterProps<TData>) {
    const column = table.getColumn(filter)
    return (
        <Input
            placeholder={placeholder}
            value={(column?.getFilterValue() as string) ?? ""}
            onChange={(event) => column?.setFilterValue(event.target.value)}
            className="max-w-[256px] sm:max-w-sm"
        />
    )
}
