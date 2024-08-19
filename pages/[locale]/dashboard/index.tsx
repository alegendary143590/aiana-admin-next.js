import DashboardPage from "@/components/Pages/Dashboard"
import { makeStaticProps , getStaticPaths } from "@/lib/getStatic"

const Dashboard = () => (
    <DashboardPage />
)

export default Dashboard

const getStaticProps = makeStaticProps(['dashboard', 'common'  ])
export { getStaticPaths, getStaticProps }
