import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getRecentActivities } from "@/features/dashboard/dashboard.service"
import type { RecentActivityType } from "@/features/dashboard/dashboard.type"
import { useAppQuery } from "@/lib/react-query"
import dayjs from "dayjs"

const RecentActivities = () => {
    const { data: recentActivities = [], isLoading } = useAppQuery<RecentActivityType[]>({
        queryKey: ["recent-activities"],
        queryFn: getRecentActivities
    })


    return (
        <div className="lg:grid-cols-4 lg:col-span-4">
            <div className="flex flex-col gap-2 bg-background rounded-2xl border shadow-lg p-4">
                <h1>Recent Activities</h1>
                {isLoading ?
                    <>Loading...</>
                    :
                    <Table className="select-none w-full">
                        <TableCaption>A list of your highest recent activities in a month.</TableCaption>
                        <TableHeader>
                            <TableRow className="capitalize">
                                {recentActivities.length > 0 &&
                                    Object.keys(recentActivities[0]).map((key, index) => {
                                        const label = key.split(/(?=[A-Z])/)[0]

                                        if (index === 0)
                                            return <TableHead key={key} className="rounded-tl-lg">{label}</TableHead>

                                        if (index === Object.keys(recentActivities[0]).length - 1)
                                            return <TableHead key={key} className="rounded-tr-lg max-sm:hidden">{label}</TableHead>

                                        if (index === Object.keys(recentActivities[0]).length - 2)
                                            return <TableHead key={key} className="max-sm:rounded-tr-lg">{label}</TableHead>

                                        return <TableHead key={key} className={`${index === 2 && "max-sm:hidden"}`}>{label}</TableHead>
                                    })
                                }
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                recentActivities.length > 0 &&
                                recentActivities.map((activities) =>
                                    <TableRow className="capitalize" key={activities.date}>
                                        <TableCell>{activities.type}</TableCell>
                                        <TableCell>{activities.productName}</TableCell>
                                        <TableCell className={`max-sm:hidden`}>{activities.warehouseName}</TableCell>
                                        <TableCell>{activities.quantity}</TableCell>
                                        <TableCell className={`max-sm:hidden`}>{dayjs(activities.date).format("DD MM YYYY")}</TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                }
            </div>
        </div>
    )
}

export default RecentActivities