import { Loader2 } from "lucide-react"
import { TableCell, TableRow } from "../ui/table"

const LoadingState = ({ loadingMessage }: { loadingMessage: string }) => {
    return (
        <TableRow>
            <TableCell colSpan={6} className="text-center py-8">
                <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                <p className="mt-2 text-sm text-muted-foreground">{loadingMessage}</p>
            </TableCell>
        </TableRow>
    )
}

export default LoadingState