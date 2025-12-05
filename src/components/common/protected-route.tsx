import { CheckAuth } from "@/features/auth/auth.service"
import type { User } from "@/features/auth/auth.type"
import { useAppQuery } from "@/lib/react-query"
import { useAuthStore } from "@/store/use-store"
import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }: { children: ReactNode }) => {

    const { setUser } = useAuthStore()

    const { data: users, isLoading } = useAppQuery<User>({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await CheckAuth()
            setUser(res.data as User)
            return res
        },
        retry: false,
    })

    if (isLoading) return <>Loading...</>

    if (!users?.username && !users?.role) return <Navigate to={`/sign-in`} replace />

    return children
}

export default ProtectedRoute