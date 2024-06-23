import withAuth from "@/providers/AuthContext"
import Layout from "../../Layout"
import UserList from "./UserList"

const DashboardPage = () => (
  <Layout type="admin">
    <div className="px-[20px] py-[20px] w-full h-full flex flex-col">
      <UserList />
    </div>
  </Layout>
)

export default withAuth(DashboardPage)