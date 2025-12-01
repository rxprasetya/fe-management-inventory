import { Input } from "@/components/ui/input"
import type { Table } from "@tanstack/react-table"
import debounce from "lodash/debounce"
import { useRef } from "react"

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

    const debouncedSetSearch = useRef(
        debounce((value: string) => {
            table.setGlobalFilter(value)
        }, 300)
    ).current

    return (
        <Input
            id="search"
            placeholder={`Search...`}
            // value={value ?? ""}
            // onChange={(event) => onChange(event.target.value)}
            // value={(column?.getFilterValue() as string) ?? ""}
            // onChange={(event) => column?.setFilterValue(event.target.value)}
            defaultValue={table.getState().globalFilter ?? ""}
            onChange={(e) => debouncedSetSearch(e.target.value)}
            className="max-w-[256px] sm:max-w-sm"
        />
    )
}
