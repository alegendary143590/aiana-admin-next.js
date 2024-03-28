import Layout from "../../Layout"
import Profile from "./Profile"
const AdminPage = () => (
  <Layout type="admin">
    <div className="px-[20px] py-[20px] w-full h-full flex flex-col">
      <Profile />
    </div>
  </Layout>
)

export default AdminPage
