import DataTableActionButton from "@/components/layout/datatable/data-table-action-button"
import { DataTableColumnHeader } from "@/components/layout/datatable/data-table-column-header"
import DataTableSelectAll from "@/components/layout/datatable/data-table-select-all"
import DataTableSelectRow from "@/components/layout/datatable/data-table-select-row"
import type { StockOut } from "@/features/stock-out/stock-out.schema"
import { deleteStockOut } from "@/features/stock-out/stock-out.service"
import type { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"

export const StockOutColumns: ColumnDef<StockOut>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <DataTableSelectAll table={table} />
        ),
        cell: ({ row }) => (
            <DataTableSelectRow row={row} />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "refrenceCode",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Ref. Code" />
            )
        }
    },
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => dayjs(row.original.date).format("DD MMMM YYYY")
    },
    {
        accessorKey: "productName",
        header: "Product",
    },
    {
        accessorKey: "warehouseName",
        header: "Warehouse",
    },
    {
        accessorKey: "quantity",
        header: "Qty",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const stockOut = row.original
            return (
                <DataTableActionButton
                    id={stockOut.id!}
                    mutationFn={deleteStockOut}
                    queryKey={["stock-out"]}
                    redirectTo={`/stock-out/form/${stockOut.id}`}
                />
            )
        }
    }
]