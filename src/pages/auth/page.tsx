import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
import { signIn } from "@/features/auth/auth.service"
import { useMutation } from "@tanstack/react-query"
import { Eye, EyeClosed } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { AuthSchema, type Auth } from "../../features/auth/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import signInImg from "../../assets/images/container.webp"
import logo from "../../assets/images/logo.webp"
import { useNavigate } from "react-router-dom"
import { ThemeProvider } from "@/components/common/theme-provider"
import PageAlert from "@/components/common/page-alert"
import type { ApiError, ApiResponse } from "@/types/api"

const Authorization = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const form = useForm<Auth>({
        resolver: zodResolver(AuthSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    })

    const { mutate, isPending, isError, error } = useMutation<ApiResponse<never>, ApiError, Auth>({
        mutationFn: signIn,
        onSuccess: () => {
            navigate("/", { replace: true })
        },
    })

    const onSubmit = async (values: Auth) => {
        mutate(values)
    }

    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <section className="w-screen h-screen box-border p-4 bg-accent">
                <div className="container mx-auto bg-background rounded-xl h-full flex items-center shadow-2xl gap-4">
                    <div className="flex-1 flex flex-col box-border px-8 gap-4">
                        <div className="flex self-center md:hidden w-32 h-16 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${logo})` }} />
                        <h1 className="text-6xl">Sign In</h1>
                        <p className="text-muted-foreground text-xl">Log in using the demo credentials below to explore website.</p>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full flex flex-col justify-center gap-8 select-none">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="username">Username</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    id="username"
                                                    type="text"
                                                    placeholder="guest"
                                                    autoComplete="username" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="password">Password</FormLabel>
                                            <FormControl>
                                                <InputGroup>
                                                    <InputGroupInput
                                                        {...field}
                                                        id="password"
                                                        type={`${showPassword ? "text" : "password"}`}
                                                        placeholder="123123123"
                                                        autoComplete="current-password" />
                                                    <InputGroupAddon align={`inline-end`}>
                                                        <InputGroupButton type="button" onClick={() => setShowPassword(prev => !prev)}>
                                                            {
                                                                showPassword ?
                                                                    <EyeClosed className="size-4 transition-all duration-300" />
                                                                    :
                                                                    <Eye className="size-4 transition-all duration-300" />
                                                            }
                                                        </InputGroupButton>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" disabled={isPending} className="w-full">{isPending ? "Loading..." : "Sign In"}</Button>
                            </form>
                        </Form>
                    </div>
                    <div className="hidden md:inline-flex flex-2 w-full h-full relative overflow-hidden">
                        <div className=" w-full h-full bg-cover bg-center rounded-tr-xl rounded-br-xl" style={{ backgroundImage: `url(${signInImg})` }} />
                        <div className="absolute inset-0 bg-linear-to-t from-white dark:from-black dark:via-black dark:via-0% to-transparent rounded-br-xl"></div>
                        <div className="absolute left-6 bottom-30 xl:bottom-24 w-32 h-16 bg-contain bg-no-repeat z-50" style={{ backgroundImage: `url(${logo})` }} />
                        <div className="absolute left-0 bottom-0 mb-16 mx-8 w-1/2 select-none">
                            {/* <h1 className="text-xl font-semibold">Simpan.in</h1> */}
                            <p>Manage your stock, products, and inventory faster, easier, and more efficiently.</p>
                        </div>
                    </div>
                </div>
                {!isPending &&
                    <PageAlert status={isError} error={error?.error} message={error?.message} />
                }
            </section>
        </ThemeProvider>
    )
}

export default Authorization