import TicketsPage from "@/components/Pages/TicketsPage"
import { makeStaticProps , getStaticPaths } from "@/lib/getStatic"

const Dashboard = () => (
    <TicketsPage />
)

export default Dashboard
const getStaticProps = makeStaticProps(['ticket' , 'common'  ])
export { getStaticPaths, getStaticProps }