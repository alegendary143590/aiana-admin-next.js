import Account from "../../Account"
import Layout from "../../Layout"
import Users from "./Users"
import Chatbot from "./Chatbot"

const DashboardPage = () => (
  <Layout type="admin">
    <div className="px-[20px] py-[20px] w-full h-full flex flex-col">
       <Account />
       <Users />
       <div className="absolute bottom-0 right-0"> {/* Position the Chatbot component */}
         <Chatbot />
       </div>
    </div>
  </Layout>
)

export default DashboardPage
