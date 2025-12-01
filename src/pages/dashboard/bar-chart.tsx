import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { getBarData } from "@/features/dashboard/dashboard.service"
import type { BarDataType } from "@/features/dashboard/dashboard.type"
import { useAppQuery } from "@/lib/react-query"
import { Bar, BarChart, Cell, LabelList, XAxis } from "recharts"

const BarChartComponent = () => {
    const { data = [], isLoading } = useAppQuery<BarDataType[]>({
        queryKey: ["bar"],
        queryFn: getBarData
    })

    const chartConfig = {
        total: {
            label: "Total Products",
        },
        Sandang: {
            label: "Sandang",
            color: "var(--chart-2)",
        },
        Pangan: {
            label: "Pangan",
            color: "var(--chart-3)",
        },
        Papan: {
            label: "Papan",
            color: "var(--chart-4)",
        }
    } satisfies ChartConfig

    const barData = data.map((item) => ({
        ...item,
        fill: chartConfig[item.name].color
    }))

    return (
        <div className="lg:grid-cols-1 lg:col-span-1">
            <div className="flex flex-col gap-2 bg-background rounded-2xl border shadow-lg p-4">
                <h1>Product per Category</h1>
                {isLoading ?
                    <>Loading...</>
                    :
                    <ChartContainer config={chartConfig} className="h-65 select-none">
                        <BarChart
                            accessibilityLayer
                            data={barData}
                            margin={{
                                left: 0,
                            }}
                        >
                            {/* <CartesianGrid vertical={false} /> */}
                            <XAxis
                                dataKey="name"
                                type="category"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                interval="preserveStartEnd"
                            />

                            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" hideLabel />} />

                            <Bar dataKey="total" radius={5}>
                                {barData.map((item) =>
                                    <Cell fill={chartConfig[item.name].color} />
                                )}
                                <LabelList
                                    dataKey="total"
                                    position="top"
                                    offset={12}
                                    className="fill-foreground"
                                    fontSize={12}
                                />
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                }
            </div>
        </div>
    )
}

export default BarChartComponent