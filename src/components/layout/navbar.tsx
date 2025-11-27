import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Activity, CircleArrowDown, CircleArrowUp, House, LayoutDashboard, Menu, Package, Warehouse } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const links = [
    {
        name: "home",
        path: "/",
        icon: <House size={16} />
    },
    {
        name: "categories",
        path: "/categories",
        icon: <LayoutDashboard size={16} />
    },
    {
        name: "products",
        path: "/products",
        icon: <Package size={16} />
    },
    {
        name: "warehouses",
        path: "/warehouses",
        icon: <Warehouse size={16} />
    },
    {
        name: "stock",
        path: "/stock-levels",
        icon: <Activity size={16} />
    },
    {
        name: "stock in",
        path: "/stock-in",
        icon: <CircleArrowDown size={16} />
    },
    {
        name: "stock out",
        path: "/stock-out",
        icon: <CircleArrowUp size={16} />
    },
]

export const DesktopNavbar = () => {
    const pathname = useLocation().pathname
    return (
        <section className="flex items-center gap-2">
            {
                links.map((link) => {
                    const isActive = link.path === "/" ? pathname === "/" : pathname.startsWith(link.path)
                    return (
                        <Link to={link.path} key={link.path} className={`border-b-2 ${isActive ? "border-primary" : "border-transparent"} py-1 transition-all duration-300`}>
                            <Button variant={`link`} className={`capitalize ${isActive && "text-black dark:text-white"} transition-all duration-300`}>
                                {link.icon}
                                <span>{link.name}</span>
                            </Button>
                        </Link>
                    )
                })
            }
        </section>
    )
}

export const MobileNavbar = () => {
    const pathname = useLocation().pathname
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={`link`} size={`icon-lg`} className="py-0">
                    <Menu className="size-4.5" />
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-8 justify-center items-center">
                <SheetHeader className="hidden">
                    <SheetTitle></SheetTitle>
                    <SheetDescription>
                    </SheetDescription>
                </SheetHeader>
                {/* <Logo /> */}
                <h1>Simpan.in</h1>
                <nav className="flex flex-col gap-4 text-center">
                    {links.map((link) => {
                        const isActive = link.path === "/" ? pathname === "/" : pathname.startsWith(link.path)
                        return (
                            <Link to={link.path} key={link.path} className={`border-b-2 ${isActive ? "border-primary" : "border-transparent"} py-1 transition-all duration-300`}>
                                <Button variant={`link`} className={`capitalize ${isActive && "text-black dark:text-white"} transition-all duration-300`}>
                                    {link.icon}
                                    <span>{link.name}</span>
                                </Button>
                            </Link>
                        )
                    })}
                </nav>
            </SheetContent>
        </Sheet>
    )
}