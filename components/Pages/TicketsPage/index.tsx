import withAuth from "@/providers/AuthContext"
import Layout from "../../Layout"
import Tickets from "./Tickets"

const DashboardPage = () => (
  <Layout type="admin">
    <div className="px-[20px] py-[20px] w-full h-full flex flex-col">
      <Tickets />
    </div>
  </Layout>
)

export default withAuth(DashboardPage)
