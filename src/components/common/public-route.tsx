import { CheckAuth } from "@/features/auth/auth.service"
import type { User } from "@/features/auth/auth.type"
import { useAppQuery } from "@/lib/react-query"
import { useAuthStore } from "@/store/use-store"
import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"

const PublicRoute = ({ children }: { children: ReactNode }) => {

    const { user } = useAuthStore()

    const { data: users, isLoading } = useAppQuery<User>({
        queryKey: ["users"],
        queryFn: CheckAuth,
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        enabled: !!user.username && !!user.role
    })

    if (isLoading) return <>Loading...</>

    if (users?.username && users?.role) return <Navigate to="/" replace />

    return children
}

export default PublicRoute