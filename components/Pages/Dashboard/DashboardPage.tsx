import Layout from "../../Layout"
import ChatLogs from "./ChatLogs"

const DashboardPage = () => (
  <Layout type="admin">
    <div className="px-[20px] py-[20px] w-full h-full flex flex-col">
      <ChatLogs />
    </div>
  </Layout>
)

export default DashboardPage
