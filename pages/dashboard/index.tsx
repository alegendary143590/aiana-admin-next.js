import DashboardPage from "@/components/Pages/Dashboard"
import withAuth from "@/providers/AuthContext"

const Dashboard = () => (
    <DashboardPage />
)

export default withAuth(Dashboard)
