import { Input } from "@/components/ui/input"
import type { Table } from "@tanstack/react-table"
import { useMemo } from "react"
import debounce from "lodash/debounce"

interface DataTableColumnFilterProps<TData> {
    table: Table<TData>
    // filter: string
    // value: string
    // onChange: (value: string) => void
}

export function DataTableColumnFilter<TData>({
    table,
    // filter,
    // value,
    // onChange,
}: DataTableColumnFilterProps<TData>) {
    // const column = table.getColumn(filter)

    const debouncedSetSearch = useMemo(
        () =>
            debounce((value: string) => {
                table.setGlobalFilter(value)
            }, 0),
        [table]
    )

    return (
        <Input
            id="search"
            placeholder={`Search...`}
            // value={value ?? ""}
            // onChange={(event) => onChange(event.target.value)}
            // value={(column?.getFilterValue() as string) ?? ""}
            // onChange={(event) => column?.setFilterValue(event.target.value)}
            value={(table.getState().globalFilter as string) ?? ""}
            onChange={(event) => debouncedSetSearch(event.target.value)}
            className="max-w-[256px] sm:max-w-sm"
        />
    )
}
