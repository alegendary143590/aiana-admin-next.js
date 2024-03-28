import Layout from "../../Layout"
import Users from "./Users"

const DashboardPage = () => (
  <Layout type="admin">
    <div className="px-[20px] py-[20px] w-full h-full flex flex-col">
      <Users />
    </div>
  </Layout>
)

export default DashboardPage
