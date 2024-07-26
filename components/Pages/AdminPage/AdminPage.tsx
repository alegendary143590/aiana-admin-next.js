import withAuth from "@/providers/AuthContext"
import Layout from "../../Layout"
import Profile from "./Profile"


const AdminPage = () => (
  <Layout type="admin">
    <div className="px-[20px] py-[20px] w-full flex flex-col overflow-y-auto">
      <Profile />
    </div>
  </Layout>
)

export default withAuth(AdminPage)
