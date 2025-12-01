import MainHeader from "@/components/layout/main-header"
import Summary from "./summary"
import RecentActivities from "./recent-activities"
import BarChartComponent from "./bar-chart"
import LineChartComponent from "./line-chart"

const Dashboard = () => {

    return (
        <MainHeader
            title="Dashboard"
            desc="You're in. Let's make this data work smarter, not harder."
            children={
                <div className="grid gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                        <Summary />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 space-y-4 md:space-y-0 md:gap-2">
                        <RecentActivities />
                        <BarChartComponent />
                    </div>

                    <div className="grid grid-cols-1">
                        <LineChartComponent />
                    </div>
                </div>
            }
        />
    )
}

export default Dashboard