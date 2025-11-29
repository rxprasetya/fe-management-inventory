import FadeAnimate from "@/components/common/fade-animate"
import PageAlert from "@/components/common/page-alert"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAppMutation } from "@/lib/react-query"
import { useResponseMessageStore } from "@/store/use-store"
import type { ApiError, ApiResponse } from "@/types/api"
import { MoreHorizontal, Trash2 } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const DataTableActionButton = <TData,>({
    id,
    mutationFn,
    redirectTo,
    queryKey
}: {
    id: string
    mutationFn: (id: string) => Promise<ApiResponse<TData>>
    redirectTo?: string
    queryKey?: string[]
}) => {

    const [open, setOpen] = useState<boolean>(false)

    const { setResponseMessage } = useResponseMessageStore()

    const navigate = useNavigate()

    const { mutate, isPending, isError, error } = useAppMutation<ApiResponse<TData>, ApiError, string>({
        mutationFn,
        queryKey,
        onSuccess: (data) => {
            setResponseMessage({
                message: data.message,
                success: data.success
            })
        }
    })

    return (
        <>
            {!isPending &&
                <PageAlert status={isError} error={error?.error} message={error?.message} />
            }

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0" disabled={isPending}>
                        {isPending ? "Deleting..." :
                            <>
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </>
                        }
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {redirectTo &&
                        <DropdownMenuItem onClick={() => navigate(redirectTo)}>
                            Update
                        </DropdownMenuItem>
                    }
                    <DropdownMenuItem variant='destructive' onClick={() => setOpen(prev => !prev)}>
                        Delete
                        <DropdownMenuShortcut>
                            <Trash2 className="text-destructive size-3.5" />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <FadeAnimate className="flex flex-col gap-4">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => mutate(id)}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </FadeAnimate>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default DataTableActionButton