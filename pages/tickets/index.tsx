import TicketsPage from "@/components/Pages/TicketsPage"
import withAuth from "@/providers/AuthContext"

const Dashboard = () => (
    <TicketsPage />
)

export default withAuth(Dashboard)
