import withAuth from "@/providers/AuthContext"
import Layout from "../../Layout"
import Profile from "./Profile"

const UserPage = () => (
  <Layout type="admin">
    <div className="px-[20px] py-[20px] w-full h-full flex flex-col">
      <Profile />
    </div>
  </Layout>
)

export default withAuth(UserPage)