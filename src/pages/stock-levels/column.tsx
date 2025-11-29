import DataTableActionButton from "@/components/layout/datatable/data-table-action-button"
import { DataTableColumnHeader } from "@/components/layout/datatable/data-table-column-header"
import DataTableSelectAll from "@/components/layout/datatable/data-table-select-all"
import DataTableSelectRow from "@/components/layout/datatable/data-table-select-row"
import type { StockLevel } from "@/features/stock-level/stock-level.schema"
import { deleteStockLevel } from "@/features/stock-level/stock-level.service"
import type { ColumnDef } from "@tanstack/react-table"

export const StockLevelColumns: ColumnDef<StockLevel>[] = [
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
        id: "No",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="No" />
            )
        },
        accessorFn: (row, index) => index + 1,
        cell: ({ getValue }) => getValue(),
    },
    {
        id: "productName",
        accessorKey: "productName",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Product" />
            )
        }
    },
    {
        id: "warehouse",
        accessorKey: "warehouseName",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Warehouse" />
            )
        }
    },
    {
        id: "quantity",
        accessorKey: "quantity",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Qty" />
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const stockLevel = row.original
            return (
                <DataTableActionButton
                    id={stockLevel.id!}
                    mutationFn={deleteStockLevel}
                    queryKey={["stock-levels"]}
                />
            )
        }
    }
]