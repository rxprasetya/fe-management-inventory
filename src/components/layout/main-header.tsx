import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import type { ReactNode } from "react"
import { Link } from "react-router-dom"

type BreadcrumbItemType = {
    label: string
    path?: string
}

interface MainHeaderProps {
    title: string
    desc: string
    children: ReactNode
    breadcrumbs?: BreadcrumbItemType[]
}

const MainHeader = ({ title, desc, children, breadcrumbs }: MainHeaderProps) => {
    return (
        <section>
            <div className="flex flex-col md:flex-row gap-4 py-4">
                <div className="flex-1 flex flex-col order-2 md:order-0">
                    <h2 className="text-sm uppercase">Overview</h2>
                    <h1 className="text-lg font-semibold">{title}</h1>
                    <p className="text-justify text-muted-foreground pt-2">{desc}</p>
                </div>
                <div className="flex-1 flex justify-start md:justify-end order-1 md:order-0">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                {
                                    breadcrumbs &&
                                    <BreadcrumbLink asChild>
                                        <Link to="/">Home</Link>
                                    </BreadcrumbLink>
                                }
                            </BreadcrumbItem>
                            {breadcrumbs?.map((breadcrumb) => (
                                <div key={breadcrumb.label} className="flex items-center gap-2">
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        {breadcrumb.path ?
                                            <BreadcrumbLink asChild>
                                                <Link to={breadcrumb.path}>{breadcrumb.label}</Link>
                                            </BreadcrumbLink>
                                            :
                                            <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                                        }
                                    </BreadcrumbItem>
                                </div>
                            ))}
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
            {children}
        </section>
    )
}

export default MainHeader