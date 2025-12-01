import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { useAppQuery } from "@/lib/react-query"
import { getLineData } from "@/features/dashboard/dashboard.service"
import type { LineDataType } from "@/features/dashboard/dashboard.type"
import dayjs from "dayjs"

const LineChartComponent = () => {
    const { data: lineData = [], isLoading } = useAppQuery<LineDataType[]>({
        queryKey: ["line"],
        queryFn: getLineData
    })

    const chartConfig = {
        in: {
            label: "Stock In",
            color: "var(--chart-in)",
        },
        out: {
            label: "Stock Out",
            color: "var(--chart-out)",
        }
    } satisfies ChartConfig

    return (
        <div className="grid-cols-1">
            <div className="flex flex-col bg-background rounded-2xl border shadow-lg">
                <h1 className="p-4">Stock Activities Line</h1>
                {isLoading ?
                    <>Loading...</>
                    :
                    <ChartContainer config={chartConfig} className="h-72 select-none">
                        <AreaChart
                            accessibilityLayer
                            data={lineData}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                className="px-2"
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                tickMargin={8}
                                tickFormatter={(value) =>
                                    dayjs(value).format("DD/MM")
                                }
                                scale="point"
                                interval="preserveStartEnd"
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="line" />}
                            />
                            <defs>
                                <linearGradient id="fillIn" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor={chartConfig.in.color}
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor={chartConfig.in.color}
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                                <linearGradient id="fillOut" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor={chartConfig.out.color}
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor={chartConfig.out.color}
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                            </defs>
                            <Area
                                dataKey="in"
                                type="monotone"
                                stroke={chartConfig.in.color}
                                fill="url(#fillIn)"
                            />
                            <Area
                                dataKey="out"
                                type="monotone"
                                stroke={chartConfig.out.color}
                                fill="url(#fillOut)"
                            />
                        </AreaChart>
                    </ChartContainer>
                }
            </div>
        </div>
    )
}

export default LineChartComponent