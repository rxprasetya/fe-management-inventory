import DataTableActionButton from "@/components/layout/datatable/data-table-action-button"
import { DataTableColumnHeader } from "@/components/layout/datatable/data-table-column-header"
import DataTableSelectAll from "@/components/layout/datatable/data-table-select-all"
import DataTableSelectRow from "@/components/layout/datatable/data-table-select-row"
import type { Category } from "@/features/category/category.schema"
import { deleteCategory } from "@/features/category/category.service"
import type { ColumnDef } from "@tanstack/react-table"

export const CategoryColumns: ColumnDef<Category>[] = [
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
        accessorFn: (_row, index) => index + 1,
        cell: ({ getValue }) => getValue(),
    },
    {
        id: "name",
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Name" />
            )
        }
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const category = row.original
            return (
                <DataTableActionButton
                    id={category.id!}
                    mutationFn={deleteCategory}
                    queryKey={["categories"]}
                    redirectTo={`/categories/form/${category.id}`}
                />
            )
        }
    }
]