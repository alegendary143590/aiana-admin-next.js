import Layout from "../../Layout"
import Assistants from "./Assistants"

const DashboardPage = () => (
  <Layout type="admin">
    <div className="px-[20px] py-[20px] w-full h-full flex flex-col gap-y-[20px]">
       <Assistants />
    </div>
  </Layout>
)

export default DashboardPage
