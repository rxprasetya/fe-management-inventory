import FadeAnimate from '@/components/common/fade-animate'
import { Button } from '@/components/ui/button'
import { useBulkStore } from '@/store/use-store'
import type { Table } from '@tanstack/react-table'
import { AnimatePresence } from 'motion/react'
import { useEffect } from 'react'

const DataTableBulkButton = ({
    table
}: {
    table: Table<any>
}) => {
    const { selectedIds, setSelectedIds, clearSelected } = useBulkStore()

    const selectedRows = table.getSelectedRowModel().rows

    useEffect(() => {
        if (selectedRows.length === 0) {
            clearSelected()
            return
        }

        const ids = selectedRows.map((row) => row.original.id)
        setSelectedIds(ids)

    }, [selectedRows])


    const onBulkDelete = () => {
        clearSelected()
        table.resetRowSelection()
    }

    return (
        <AnimatePresence>
            {selectedRows.length > 0 && (
                <FadeAnimate>
                    <Button
                        variant="outline"
                        onClick={onBulkDelete}
                    >
                        Delete Selected ({table.getSelectedRowModel().rows.length})
                    </Button>
                </FadeAnimate>
            )}
        </AnimatePresence>
    )
}

export default DataTableBulkButton