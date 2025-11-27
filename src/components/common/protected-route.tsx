import { CheckAuth } from "@/features/auth/auth.service"
import type { User } from "@/features/auth/auth.type"
import { useAppQuery } from "@/lib/react-query"
import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }: { children: ReactNode }) => {

    const { data: user, isLoading } = useAppQuery<User>({
        queryKey: ["users"],
        queryFn: CheckAuth,
        retry: false,
    })

    if (isLoading) return

    if (!user?.username && !user?.role) return <Navigate to={`/sign-in`} replace />

    return children
}

export default ProtectedRoute