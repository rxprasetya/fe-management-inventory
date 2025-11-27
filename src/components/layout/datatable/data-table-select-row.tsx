import { Checkbox } from '@/components/ui/checkbox'
import type { Row } from '@tanstack/react-table'

const DataTableSelectRow = <Tdata,>({
    row
}: {
    row: Row<Tdata>
}) => {
    return (
        <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
        />
    )
}

export default DataTableSelectRow