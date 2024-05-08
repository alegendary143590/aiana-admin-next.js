import Layout from "../../Layout"
import Logs from "./Logs"

const Chatlog = () => (
  <Layout type="admin">
    <div className="px-[20px] py-[20px] w-full h-full flex flex-col">
      <Logs />
    </div>
  </Layout>
)

export default Chatlog
