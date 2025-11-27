import { CheckAuth } from "@/features/auth/auth.service"
import type { User } from "@/features/auth/auth.type"
import { useAppQuery } from "@/lib/react-query"
import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"

const PublicRoute = ({ children }: { children: ReactNode }) => {

    const { data: user, isLoading } = useAppQuery<User>({
        queryKey: ["users"],
        queryFn: CheckAuth,
        retry: false,
        refetchOnWindowFocus: false,
    })

    if (isLoading) return <>Loading...</>

    if (user?.username && user?.role) return <Navigate to="/" replace />

    return children
}

export default PublicRoute