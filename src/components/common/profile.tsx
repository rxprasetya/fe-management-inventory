import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from 'react-router-dom'
import { CheckAuth, signOut } from '@/features/auth/auth.service'
import type { ApiResponse } from '@/types/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAppQuery } from '@/lib/react-query'
import type { User } from '@/features/auth/auth.type'

const Profile = () => {
    const navigate = useNavigate()

    const queryClient = useQueryClient()

    const { data: user } = useAppQuery<User>({
        queryKey: ["users"],
        queryFn: CheckAuth
    })

    const { mutate, isPending } = useMutation<ApiResponse<never>, Error>({
        mutationFn: signOut,
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ["users"] })
            queryClient.clear()
            navigate("/sign-in")
        }
    })

    const onSignOut = () => {
        mutate()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={`link`} size={`custom`} className="group my-2">
                    <div className="flex items-center gap-2">
                        <div className="size-8 rounded-full bg-primary flex items-center justify-center select-none pointer-events-none text-lg font-semibold text-white uppercase">
                            {user?.username.charAt(0)}
                        </div>
                        <div className="hidden lg:flex flex-col items-start capitalize text-muted-foreground text-sm">
                            <span className="transition-all duration-300 group-hover:text-black dark:group-hover:text-white">{user?.username}</span>
                            <span className="font-normal text-xs">{user?.role}</span>
                        </div>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Profile
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant='destructive' onClick={onSignOut} disabled={isPending}>
                    {isPending ? "Signing out..." : "Sign out"}
                    <DropdownMenuShortcut>
                        <LogOut className="text-destructive size-4" />
                    </DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Profile