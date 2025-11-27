import DataTableActionButton from "@/components/layout/datatable/data-table-action-button"
import DataTableSelectAll from "@/components/layout/datatable/data-table-select-all"
import DataTableSelectRow from "@/components/layout/datatable/data-table-select-row"
import type { Warehouse } from "@/features/warehouse/warehouse.schema"
import { deleteWarehouse } from "@/features/warehouse/warehouse.service"
import type { ColumnDef } from "@tanstack/react-table"

export const WarehouseColumns: ColumnDef<Warehouse>[] = [
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
        header: "No",
        cell: (row) => row.row.index + 1
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const warehouse = row.original
            return (
                <DataTableActionButton
                    id={warehouse.id!}
                    mutationFn={deleteWarehouse}
                    queryKey={["warehouses"]}
                    redirectTo={`/warehouses/form/${warehouse.id}`}
                />
            )
        }
    }
]