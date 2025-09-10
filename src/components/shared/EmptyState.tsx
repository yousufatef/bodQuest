import { TableCell, TableRow } from "../ui/table"

const EmptyState = ({ emptyMessage }: { emptyMessage: string }) => {
    return (
        <TableRow>
            <TableCell colSpan={6} className="text-center py-8">
                <p className="text-muted-foreground">{emptyMessage}</p>
            </TableCell>
        </TableRow>
    )
}

export default EmptyState