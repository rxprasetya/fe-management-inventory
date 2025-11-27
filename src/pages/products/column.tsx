import DataTableActionButton from "@/components/layout/datatable/data-table-action-button";
import { DataTableColumnHeader } from "@/components/layout/datatable/data-table-column-header";
import DataTableSelectAll from "@/components/layout/datatable/data-table-select-all";
import DataTableSelectRow from "@/components/layout/datatable/data-table-select-row";
import type { Product } from "@/features/product/product.schema";
import { deleteProduct } from "@/features/product/product.service";
import type { ColumnDef } from "@tanstack/react-table";

export const ProductColumns: ColumnDef<Product>[] = [
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
        accessorKey: "categoryName",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Category" />
            )
        }
    },
    {
        accessorKey: "unit",
        header: "Unit",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const product = row.original
            return (
                <DataTableActionButton
                    id={product?.id!}
                    mutationFn={deleteProduct}
                    queryKey={["products"]}
                    redirectTo={`/products/form/${product.id}`}
                />
            )
        }
    }
]