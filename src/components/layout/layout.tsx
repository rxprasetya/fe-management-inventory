import { type ReactNode } from 'react'
import Header from './header'
import { ThemeProvider } from '@/components/common/theme-provider'

interface LayoutProps {
    children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <section className="bg-accent w-full min-h-screen">
                <Header />
                <main className="container w-full mx-auto pt-16 pb-8 lg:pt-32 box-border px-2 lg:px-0">
                    {children}
                </main>
            </section>
        </ThemeProvider>
    )
}

export default Layout