import * as React from "react"

import {
    type ColumnDef,
    // type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { DataTablePagination } from "./data-table-pagination"
import { DataTableViewOptions } from "./data-table-view-options"
import { DataTableColumnFilter } from "./data-table-column-filter"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import DataTableBulkButton from "./data-table-bulk-button"
import { AnimatePresence } from "motion/react"
import FadeAnimate from "@/components/common/fade-animate"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    nav: string
}

export function DataTable<TData, TValue>({
    columns,
    data,
    nav,
}: DataTableProps<TData, TValue>) {
    const navigate = useNavigate()
    const [sorting, setSorting] = React.useState<SortingState>([])
    // const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    // const [globalFilter, setGlobalFilter] = React.useState<string>("")
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        // onColumnFiltersChange: setColumnFilters,
        // onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            // columnFilters,
            // globalFilter,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <AnimatePresence>
            <FadeAnimate>
                <section className="bg-background rounded-xl box-border pb-4 px-2 select-none">
                    <div className="flex items-center justify-between py-4">
                        <DataTableColumnFilter table={table} />
                        {/* <DataTableColumnFilter table={table} placeholder="Search..." /> */}
                        {/* <DataTableColumnFilter value={globalFilter} onChange={setGlobalFilter} /> */}
                        <div className="flex items-center gap-2">
                            <DataTableViewOptions table={table} />
                            <Button variant={'default'} onClick={() => navigate(nav)}>Create</Button>
                        </div>
                    </div>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </TableHead>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex py-2">
                        <DataTableBulkButton table={table} />
                    </div>
                    <DataTablePagination table={table} />
                </section>
            </FadeAnimate>
        </AnimatePresence >
    )
}